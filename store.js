/**
 * Phase 2 - Persistence Store
 * Wraps localStorage and provides a schema-versioned data store.
 */

const STORE_KEY = 'punchpower_state';
const SCHEMA_VERSION = 1;

const DEFAULT_STATE = {
    schemaVersion: SCHEMA_VERSION,
    startDate: null, // Set when the user finishes their first workout
    currentDayId: null, // Tracks where they are in the 7-day cycle
    history: [] // Array of { date: 'YYYY-MM-DD', dayId: Number, logs: { 'itemId': { completed: true, ... } } }
};

const Store = {
    state: null,

    init() {
        const raw = localStorage.getItem(STORE_KEY);
        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                if (parsed.schemaVersion === SCHEMA_VERSION) {
                    this.state = parsed;
                } else {
                    // Future migration logic goes here
                    this.state = { ...DEFAULT_STATE, ...parsed, schemaVersion: SCHEMA_VERSION };
                }
            } catch (e) {
                console.error("Failed to parse store", e);
                this.state = { ...DEFAULT_STATE };
            }
        } else {
            this.state = { ...DEFAULT_STATE };
        }
        
        // Ensure today highlights correctly for first-time users
        if (this.state.currentDayId === null) {
            const jsDay = new Date().getDay();
            // Monday = 1, Sunday = 7
            this.state.currentDayId = jsDay === 0 ? 7 : jsDay; 
        }
    },

    save() {
        localStorage.setItem(STORE_KEY, JSON.stringify(this.state));
    },

    getTodayStr() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },

    getTodaysSession(dayId) {
        const todayStr = this.getTodayStr();
        return this.state.history.find(h => h.date === todayStr && h.dayId === dayId);
    },

    logItem(dayId, itemId, data) {
        const todayStr = this.getTodayStr();
        let session = this.getTodaysSession(dayId);
        
        if (!session) {
            session = { date: todayStr, dayId: dayId, logs: {} };
            this.state.history.push(session);
        }
        
        session.logs[itemId] = { ...session.logs[itemId], ...data };
        this.save();
    },
    
    getItemLog(dayId, itemId) {
        const session = this.getTodaysSession(dayId);
        if (!session || !session.logs[itemId]) return null;
        return session.logs[itemId];
    },

    logQuickSession(quickId, title) {
        const todayStr = this.getTodayStr();
        if (!this.state.startDate) {
            this.state.startDate = new Date().toISOString();
        }
        
        let session = this.getTodaysSession(quickId);
        if (!session) {
            session = { date: todayStr, dayId: quickId, sessionType: 'quick', title: title, logs: {} };
            this.state.history.push(session);
        }
        this.save();
    },


    finishWorkout(dayId) {
        if (!this.state.startDate) {
            this.state.startDate = new Date().toISOString();
        }
        // Advance current day
        let nextDay = dayId + 1;
        if (nextDay > 7) nextDay = 1;
        this.state.currentDayId = nextDay;
        this.save();
    },

    getWeeksElapsed() {
        if (!this.state.startDate) return 0;
        const start = new Date(this.state.startDate);
        const now = new Date();
        const diffMs = now - start;
        return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
    },

    getTotalSessions() {
        return this.state.history.length;
    },

    getStreak() {
        if (this.state.history.length === 0) return 0;
        let streak = 0;
        let d = new Date();
        
        // Sort history by date descending
        const sortedDates = this.state.history.map(h => h.date).sort().reverse();
        
        // Remove duplicates if they worked out twice in a day
        const uniqueDates = [...new Set(sortedDates)];
        
        // Simple streak logic: check consecutive days backwards from today or yesterday
        let checkDate = new Date();
        let todayStr = this.getTodayStr();
        
        if (!uniqueDates.includes(todayStr)) {
            // Check yesterday
            checkDate.setDate(checkDate.getDate() - 1);
            let yesterdayStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
            if (!uniqueDates.includes(yesterdayStr)) {
                return 0; // No workout today or yesterday = 0 streak
            }
        }
        
        // Count backwards
        for (let i = 0; i < uniqueDates.length; i++) {
            const histDateStr = uniqueDates[i];
            const checkStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, '0')}-${String(checkDate.getDate()).padStart(2, '0')}`;
            if (histDateStr === checkStr) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break; // Break streak
            }
        }
        return streak;
    }
};

// Initialize immediately
Store.init();
if (typeof window !== 'undefined') window.Store = Store;
