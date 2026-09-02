const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('@playwright/test');

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.ico': 'image/x-icon'
};

function createStaticServer(root, port) {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            let reqPath = req.url.split('?')[0];
            if (reqPath === '/') reqPath = '/index.html';
            const filePath = path.join(root, reqPath);

            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found');
                    return;
                }
                const ext = path.extname(filePath).toLowerCase();
                res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
                res.end(data);
            });
        });

        server.listen(port, () => {
            resolve(server);
        });
    });
}

(async () => {
    const PORT = 8088;
    const server = await createStaticServer(__dirname + '/..', PORT);
    const baseUrl = `http://127.0.0.1:${PORT}`;

    const results = {
        check1: { pass: true, details: [] },
        check2: { pass: true, details: [] },
        check3: { pass: true, details: [] },
        check4: { pass: true, details: [] },
        check5: { pass: true, details: [] },
        check6: { pass: true, details: [] },
        check7: { pass: true, details: [] },
        check8: { pass: true, details: [] }
    };

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push({ url: page.url(), text: msg.text() });
        }
    });
    page.on('pageerror', err => {
        consoleErrors.push({ url: page.url(), text: err.toString() });
    });

    const quickSessions = [
        { id: 'quick-hybrid', name: 'Hybrid Boxing' },
        { id: 'quick-upper-power', name: 'Upper Body Power' },
        { id: 'quick-lower-power', name: 'Lower Body Power' },
        { id: 'quick-shadow-boxing', name: 'Shadow Boxing' },
        { id: 'quick-hiit-boxing', name: 'HIIT Boxing' },
        { id: 'quick-full-body-explosive', name: 'Full-Body Workout' }
    ];

    const days = [1, 2, 3, 4, 5];

    await page.goto(baseUrl);
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('#splash-screen', { state: 'detached', timeout: 5000 }).catch(() => {});

    console.log('--- STARTING CHECKS ---');

    // =========================================================================
    // CHECK 1: Quick Session Header Uses Shared Structure
    // =========================================================================
    await page.evaluate(() => window.renderDay(1));
    await page.waitForSelector('.nav-day');

    const dayHeaderStyles = await page.evaluate(() => {
        const header = document.querySelector('#global-header');
        const appHeader = document.querySelector('.app-header');
        const csHeader = window.getComputedStyle(header);
        const csAppHeader = window.getComputedStyle(appHeader);
        return {
            headerHeight: csHeader.height,
            headerBg: csHeader.backgroundColor,
            headerBackdrop: csHeader.backdropFilter || csHeader.webkitBackdropFilter,
            appHeaderHeight: csAppHeader.height,
            parentClass: header.className
        };
    });

    for (const qs of quickSessions) {
        await page.evaluate((id) => window.renderQuickSession(id), qs.id);
        await page.waitForSelector('.nav-day');

        const qsCheck = await page.evaluate((expectedTitle) => {
            const globalHeader = document.querySelector('#global-header');
            const parentHasWrapper = globalHeader && globalHeader.classList.contains('global-header-wrapper');
            const navBackBtn = globalHeader ? globalHeader.querySelector('.nav-back-btn') : null;
            const backBtnText = navBackBtn ? navBackBtn.textContent.trim() : null;
            const navTitle = globalHeader ? globalHeader.querySelector('.nav-day-title') : null;
            const titleText = navTitle ? navTitle.textContent.trim() : null;
            
            // Spacer element check
            const navDay = globalHeader ? globalHeader.querySelector('.nav-day') : null;
            const spacer = navDay ? navDay.querySelector('div[style*="visibility: hidden"]') : null;
            const spacerWidth = spacer ? window.getComputedStyle(spacer).width : null;
            const spacerVis = spacer ? window.getComputedStyle(spacer).visibility : null;

            // Check no inline header inside #app-container
            const appContainer = document.querySelector('#app-container');
            const inlineHeaderInApp = appContainer ? appContainer.querySelector('header') : null;

            const csHeader = window.getComputedStyle(globalHeader);
            const appHeader = globalHeader.querySelector('.app-header');
            const csAppHeader = appHeader ? window.getComputedStyle(appHeader) : null;

            return {
                parentHasWrapper,
                hasNavBackBtn: !!navBackBtn,
                backBtnText,
                hasNavTitle: !!navTitle,
                titleText,
                hasSpacer: !!spacer,
                spacerWidth,
                spacerVis,
                hasInlineHeaderInApp: !!inlineHeaderInApp,
                headerHeight: csHeader.height,
                headerBg: csHeader.backgroundColor,
                headerBackdrop: csHeader.backdropFilter || csHeader.webkitBackdropFilter,
                appHeaderHeight: csAppHeader ? csAppHeader.height : null
            };
        }, qs.name);

        let issues = [];
        if (!qsCheck.parentHasWrapper) issues.push('Missing .global-header-wrapper');
        if (!qsCheck.hasNavBackBtn) issues.push('Missing .nav-back-btn');
        if (qsCheck.backBtnText !== 'Week') issues.push(`Back button text is "${qsCheck.backBtnText}", expected "Week"`);
        if (!qsCheck.hasNavTitle) issues.push('Missing .nav-day-title');
        if (!qsCheck.hasSpacer) issues.push('Missing right spacer element');
        if (qsCheck.spacerVis !== 'hidden') issues.push(`Spacer visibility is "${qsCheck.spacerVis}", expected "hidden"`);
        if (qsCheck.spacerWidth !== '64px') issues.push(`Spacer width is "${qsCheck.spacerWidth}", expected "64px"`);
        if (qsCheck.hasInlineHeaderInApp) issues.push('Inline header found in #app-container');
        if (qsCheck.headerHeight !== dayHeaderStyles.headerHeight) issues.push(`Header height mismatch (${qsCheck.headerHeight} vs ${dayHeaderStyles.headerHeight})`);
        if (qsCheck.headerBg !== dayHeaderStyles.headerBg) issues.push(`Header bg mismatch (${qsCheck.headerBg} vs ${dayHeaderStyles.headerBg})`);

        if (issues.length > 0) {
            results.check1.pass = false;
            results.check1.details.push(`${qs.name}: FAIL (${issues.join(', ')})`);
        } else {
            results.check1.details.push(`${qs.name}: OK (shared header matches Day view, spacer=64px hidden, back="Week")`);
        }
    }

    // =========================================================================
    // CHECK 2: Back Button Label Consistency across all 5 Days + 6 Quick Sessions
    // =========================================================================
    for (const d of days) {
        await page.evaluate((id) => window.renderDay(id), d);
        await page.waitForSelector('.nav-day');
        const text = await page.$eval('.nav-back-btn', el => el.textContent.trim());
        if (text !== 'Week') {
            results.check2.pass = false;
            results.check2.details.push(`Day ${d}: FAIL (text="${text}")`);
        } else {
            results.check2.details.push(`Day ${d}: OK ("${text}")`);
        }
    }

    for (const qs of quickSessions) {
        await page.evaluate((id) => window.renderQuickSession(id), qs.id);
        await page.waitForSelector('.nav-day');
        const text = await page.$eval('.nav-back-btn', el => el.textContent.trim());
        if (text !== 'Week') {
            results.check2.pass = false;
            results.check2.details.push(`${qs.name}: FAIL (text="${text}")`);
        } else {
            results.check2.details.push(`${qs.name}: OK ("${text}")`);
        }
    }

    // =========================================================================
    // CHECK 3: Quick Session Title Optical Centering
    // =========================================================================
    for (const qs of quickSessions) {
        await page.evaluate((id) => window.renderQuickSession(id), qs.id);
        await page.waitForSelector('.nav-day');

        const metrics = await page.evaluate(() => {
            const navDay = document.querySelector('.nav-day');
            const navRect = navDay.getBoundingClientRect();
            const backBtn = navDay.querySelector('.nav-back-btn');
            const backRect = backBtn.getBoundingClientRect();
            const title = navDay.querySelector('.nav-day-title');
            const titleRect = title.getBoundingClientRect();
            const spacer = navDay.querySelector('div[style*="visibility: hidden"]');
            const spacerRect = spacer ? spacer.getBoundingClientRect() : { width: 0, right: 0 };

            const headerCenter = navRect.left + navRect.width / 2;
            const titleCenter = titleRect.left + titleRect.width / 2;
            const delta = Math.abs(titleCenter - headerCenter);

            return {
                headerCenter,
                titleCenter,
                delta,
                backWidth: backRect.width,
                spacerWidth: spacerRect.width,
                titleWidth: titleRect.width
            };
        });

        if (metrics.delta > 4) {
            results.check3.pass = false;
            results.check3.details.push(`${qs.name}: FAIL (delta=${metrics.delta.toFixed(2)}px > 4px tolerance, backWidth=${metrics.backWidth}px, spacerWidth=${metrics.spacerWidth}px)`);
        } else {
            results.check3.details.push(`${qs.name}: OK (delta=${metrics.delta.toFixed(2)}px <= 4px tolerance, centered at ${metrics.titleCenter.toFixed(1)}px vs ${metrics.headerCenter.toFixed(1)}px)`);
        }
    }

    // =========================================================================
    // CHECK 4: Desktop Horizontal Padding Consistency (1280x800)
    // =========================================================================
    await page.setViewportSize({ width: 1280, height: 800 });

    await page.evaluate(() => window.renderHome());
    await page.waitForSelector('.today-banner');
    const homePadding = await page.evaluate(() => {
        const c = document.querySelector('#app-container');
        return {
            padLeft: window.getComputedStyle(c).paddingLeft,
            padRight: window.getComputedStyle(c).paddingRight,
            clientLeft: c.getBoundingClientRect().left
        };
    });

    await page.evaluate(() => window.renderDay(1));
    await page.waitForSelector('.day-header-card');
    const dayPadding = await page.evaluate(() => {
        const c = document.querySelector('#app-container');
        return {
            padLeft: window.getComputedStyle(c).paddingLeft,
            padRight: window.getComputedStyle(c).paddingRight,
            clientLeft: c.getBoundingClientRect().left
        };
    });

    await page.evaluate(() => window.renderQuickSession('quick-hybrid'));
    await page.waitForSelector('.day-header-card');
    const qsPadding = await page.evaluate(() => {
        const c = document.querySelector('#app-container');
        return {
            padLeft: window.getComputedStyle(c).paddingLeft,
            padRight: window.getComputedStyle(c).paddingRight,
            clientLeft: c.getBoundingClientRect().left
        };
    });

    results.check4.details.push(`Home: padding-left=${homePadding.padLeft}, padding-right=${homePadding.padRight}`);
    results.check4.details.push(`Day 1: padding-left=${dayPadding.padLeft}, padding-right=${dayPadding.padRight}`);
    results.check4.details.push(`Hybrid Boxing: padding-left=${qsPadding.padLeft}, padding-right=${qsPadding.padRight}`);

    if (homePadding.padLeft !== '32px' || dayPadding.padLeft !== '32px' || qsPadding.padLeft !== '32px') {
        results.check4.pass = false;
        results.check4.details.push('FAIL: Not all views have 32px horizontal padding.');
    } else {
        results.check4.details.push('PASS: All three views have identical 32px horizontal padding.');
    }

    if (dayPadding.clientLeft !== qsPadding.clientLeft) {
        results.check4.pass = false;
        results.check4.details.push(`FAIL: Layout shift between Day view and Quick Session view (Day x=${dayPadding.clientLeft}, QS x=${qsPadding.clientLeft})`);
    } else {
        results.check4.details.push(`Alignment: Day 1 and Quick Session content left edges match identically at x=${dayPadding.clientLeft}px.`);
    }

    // =========================================================================
    // CHECK 5: Section Spacing on Home Screen (375x812 and 1280x800)
    // =========================================================================
    for (const vp of [{ name: 'mobile', w: 375, h: 812 }, { name: 'desktop', w: 1280, h: 800 }]) {
        await page.setViewportSize({ width: vp.w, height: vp.h });
        await page.evaluate(() => window.renderHome());
        await page.waitForSelector('.today-banner');
        await page.waitForSelector('.qs-section');
        await page.waitForSelector('.section-header');
        await page.waitForTimeout(400);

        const gaps = await page.evaluate(() => {
            const todayBanner = document.querySelector('.today-banner');
            const qsSection = document.querySelector('.qs-section');
            const qsScroll = document.querySelector('.qs-scroll-container');
            const thisWeekHeader = Array.from(document.querySelectorAll('.section-header')).find(el => el.textContent.includes('This Week'));
            const firstDayCard = document.querySelector('.days-grid .day-card');

            const tbRect = todayBanner.getBoundingClientRect();
            const qsRect = qsSection.getBoundingClientRect();
            const qsScrollRect = qsScroll.getBoundingClientRect();
            const twhRect = thisWeekHeader.getBoundingClientRect();
            const fdcRect = firstDayCard.getBoundingClientRect();

            const gapA = qsRect.top - tbRect.bottom;
            const gapB = twhRect.top - qsScrollRect.bottom;
            const gapC = fdcRect.top - twhRect.bottom;

            return { gapA, gapB, gapC };
        });

        const checkA = gaps.gapA >= 28 && gaps.gapA <= 36;
        const checkB = gaps.gapB >= 28 && gaps.gapB <= 36;
        const checkC = gaps.gapC >= 12 && gaps.gapC <= 20;

        results.check5.details.push(`${vp.name} (${vp.w}x${vp.h}):`);
        results.check5.details.push(`  Gap A (Today -> Quick Sessions): ${gaps.gapA.toFixed(1)}px (Expected ~32px, range 28-36px) -> ${checkA ? 'PASS' : 'FAIL'}`);
        results.check5.details.push(`  Gap B (Quick Sessions -> This Week): ${gaps.gapB.toFixed(1)}px (Expected ~32px, range 28-36px) -> ${checkB ? 'PASS' : 'FAIL'}`);
        results.check5.details.push(`  Gap C (This Week -> First Day Card): ${gaps.gapC.toFixed(1)}px (Expected ~16px, range 12-20px) -> ${checkC ? 'PASS' : 'FAIL'}`);

        if (!checkA || !checkB || !checkC) {
            results.check5.pass = false;
        }
    }

    // =========================================================================
    // CHECK 6: No Horizontal Overflow on 375x812
    // =========================================================================
    await page.setViewportSize({ width: 375, height: 812 });

    const allPages = [
        { name: 'Home', action: () => page.evaluate(() => window.renderHome()) },
        ...days.map(d => ({ name: `Day ${d}`, action: () => page.evaluate((id) => window.renderDay(id), d) })),
        ...quickSessions.map(qs => ({ name: qs.name, action: () => page.evaluate((id) => window.renderQuickSession(id), qs.id) }))
    ];

    for (const p of allPages) {
        await p.action();
        await page.waitForTimeout(50);

        const overflowInfo = await page.evaluate(() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth
            };
        });

        const overflow = overflowInfo.scrollWidth - overflowInfo.innerWidth;
        if (overflow > 2) {
            results.check6.pass = false;
            results.check6.details.push(`${p.name}: FAIL (scrollWidth=${overflowInfo.scrollWidth}, innerWidth=${overflowInfo.innerWidth}, overflow=${overflow}px)`);
        } else {
            results.check6.details.push(`${p.name}: OK (scrollWidth=${overflowInfo.scrollWidth}, innerWidth=${overflowInfo.innerWidth})`);
        }
    }

    // =========================================================================
    // CHECK 7: Console Errors
    // =========================================================================
    if (consoleErrors.length > 0) {
        results.check7.pass = false;
        results.check7.details = consoleErrors.map(e => `[${e.url}] ${e.text}`);
    } else {
        results.check7.details.push('Zero console errors encountered across all page navigations.');
    }

    // =========================================================================
    // CHECK 8: Regression — Navigation Still Works
    // =========================================================================
    const navTests = [
        {
            name: 'Home -> tap Day 1 card -> Day 1 loads',
            action: async () => {
                await page.evaluate(() => window.renderHome());
                await page.locator('.day-card').first().click();
                await page.waitForSelector('.day-header-card');
                const title = await page.$eval('.title-page', el => el.textContent);
                return title.includes('Lower Body Power');
            }
        },
        {
            name: 'Day 1 -> tap < Week -> Home loads',
            action: async () => {
                await page.locator('.nav-back-btn').click();
                await page.waitForSelector('.today-banner');
                return await page.locator('.today-banner').isVisible();
            }
        },
        {
            name: 'Day 1 -> tap > -> Day 2 loads',
            action: async () => {
                await page.evaluate(() => window.renderDay(1));
                await page.waitForSelector('.nav-arrow-btn:not([disabled])');
                await page.locator('.nav-arrow-btn').nth(1).click();
                await page.waitForSelector('.day-header-card');
                const title = await page.$eval('.title-page', el => el.textContent);
                return title.includes('Bag Power');
            }
        },
        {
            name: 'Day 2 -> tap < -> Day 1 loads',
            action: async () => {
                await page.locator('.nav-arrow-btn').first().click();
                await page.waitForSelector('.day-header-card');
                const title = await page.$eval('.title-page', el => el.textContent);
                return title.includes('Lower Body Power');
            }
        },
        {
            name: 'Home -> tap Hybrid Boxing card -> session loads',
            action: async () => {
                await page.evaluate(() => window.renderHome());
                await page.locator('.qs-card').filter({ hasText: 'Hybrid Boxing' }).click();
                await page.waitForSelector('#btn-confirm-swap');
                await page.locator('#btn-confirm-swap').click();
                await page.waitForSelector('.day-header-card');
                const title = await page.$eval('.title-page', el => el.textContent);
                return title.includes('Hybrid Boxing');
            }
        },
        {
            name: 'Hybrid Boxing -> tap < Week -> Home loads',
            action: async () => {
                await page.locator('.nav-back-btn').click();
                await page.waitForSelector('.today-banner');
                return await page.locator('.today-banner').isVisible();
            }
        },
        {
            name: 'Home -> tap Upper Body Power -> session loads',
            action: async () => {
                await page.evaluate(() => window.renderHome());
                await page.locator('.qs-card').filter({ hasText: 'Upper Body Power' }).click();
                await page.waitForSelector('#btn-confirm-swap');
                await page.locator('#btn-confirm-swap').click();
                await page.waitForSelector('.day-header-card');
                const title = await page.$eval('.title-page', el => el.textContent);
                return title.includes('Upper Body Power');
            }
        },
        {
            name: 'Upper Body Power -> tap < Week -> Home loads',
            action: async () => {
                await page.locator('.nav-back-btn').click();
                await page.waitForSelector('.today-banner');
                return await page.locator('.today-banner').isVisible();
            }
        }
    ];

    for (const nt of navTests) {
        try {
            const ok = await nt.action();
            if (ok) {
                results.check8.details.push(`${nt.name}: PASS`);
            } else {
                results.check8.pass = false;
                results.check8.details.push(`${nt.name}: FAIL (Unexpected page content)`);
            }
        } catch (err) {
            results.check8.pass = false;
            results.check8.details.push(`${nt.name}: FAIL (${err.message})`);
        }
    }

    await browser.close();
    server.close();

    console.log('\n========================================');
    console.log('FINAL VERIFICATION RESULTS (JSON):');
    console.log(JSON.stringify(results, null, 2));
})();
