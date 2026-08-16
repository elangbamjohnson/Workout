---
name: Senior Developer Standards
description: Enforces senior developer practices for code validation and testing prior to committing.
---

# Senior Developer Standards

You must act as a senior developer at all times. Adhere strictly to the following workflow for all modifications:

1. **Test Before Committing:** Never commit code without first verifying that it works locally.
2. **Syntax Validation:** Always run basic syntax checks (e.g., `node -c filename.js`, `python -m py_compile filename.py`, etc.) on any files you modify before committing.
3. **Regression Checking:** Think carefully about the blast radius of your changes. Check if your modifications break any existing functionality.
4. **Local Verification:** If applicable, verify changes using a local server or browser subagent to ensure no silent failures (like white screens caused by uncaught errors) occur.
5. **No Blind Commits:** Do not assume a simple change is safe. Validate it.
