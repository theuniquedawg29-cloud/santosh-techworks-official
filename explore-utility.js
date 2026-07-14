/**
 * Quant-Elite Web Explorer Utility
 * Handles exploration tracking, limits, and the conversion popups.
 */

const EXPLORATION_STORAGE_KEY = 'quant_elite_explorations';
const AI_PROMPT_STORAGE_KEY = 'ganitacharya_prompts';
const LIMIT_DIALOG_ID = 'unlimited-learning-dialog';

const ExploreUtility = {
    // Increment exploration count and check limits
    trackExploration: function() {
        let count = parseInt(localStorage.getItem(EXPLORATION_STORAGE_KEY) || '0');
        count++;
        localStorage.setItem(EXPLORATION_STORAGE_KEY, count.toString());

        if (count >= 3) {
            this.showDownloadDialog();
        }
        return count;
    },

    // Specific limit for Ganitacharya AI
    checkAIPromptLimit: function() {
        let count = parseInt(localStorage.getItem(AI_PROMPT_STORAGE_KEY) || '0');
        if (count >= 5) {
            this.showDownloadDialog("AI Mentor Limit Reached!", "Ganitacharya AI is available 24/7 in the app for unlimited doubt solving. Download now to continue your journey!");
            return false;
        }
        return true;
    },

    incrementAIPrompt: function() {
        let count = parseInt(localStorage.getItem(AI_PROMPT_STORAGE_KEY) || '0');
        count++;
        localStorage.setItem(AI_PROMPT_STORAGE_KEY, count.toString());
        return count;
    },

    showDownloadDialog: function(title = "Experience Unlimited Learning!", message = "You've reached the web preview limit. Download the Quant-Elite app for 34,000+ questions, unlimited AI mentoring, and offline access.") {
        // Create dialog if it doesn't exist
        let dialog = document.getElementById(LIMIT_DIALOG_ID);
        if (!dialog) {
            dialog = document.createElement('div');
            dialog.id = LIMIT_DIALOG_ID;
            dialog.className = 'modal';
            dialog.style.display = 'flex';
            dialog.style.position = 'fixed';
            dialog.style.inset = '0';
            dialog.style.backgroundColor = 'rgba(0,0,0,0.85)';
            dialog.style.zIndex = '10000';
            dialog.style.alignItems = 'center';
            dialog.style.justifyContent = 'center';
            dialog.style.backdropFilter = 'blur(10px)';

            dialog.innerHTML = `
                <div class="modal-box" style="background: var(--bg-card, white); padding: 40px; border-radius: 30px; text-align: center; max-width: 500px; width: 90%; border: 1px solid var(--border, #eee); box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
                    <div style="font-size: 4rem; margin-bottom: 20px;">🚀</div>
                    <h2 id="limit-dialog-title" style="margin-bottom: 15px; color: var(--text-main, #000); font-weight: 800;">${title}</h2>
                    <p id="limit-dialog-msg" style="margin-bottom: 30px; color: var(--text-muted, #666); line-height: 1.6;">${message}</p>
                    <a href="https://play.google.com/store/apps/details?id=com.santoshtechworks.quantelite" class="btn btn-primary" style="display: block; width: 100%; padding: 15px; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">Download Quant-Elite Now</a>
                    <button onclick="document.getElementById('${LIMIT_DIALOG_ID}').style.display='none'" style="margin-top: 15px; background: none; border: none; color: var(--primary); cursor: pointer; font-weight: 600;">Maybe Later</button>
                </div>
            `;
            document.body.appendChild(dialog);
        } else {
            document.getElementById('limit-dialog-title').innerText = title;
            document.getElementById('limit-dialog-msg').innerText = message;
            dialog.style.display = 'flex';
        }
    }
};

// Auto-inject styles if missing
if (!document.getElementById('explore-styles')) {
    const style = document.createElement('style');
    style.id = 'explore-styles';
    style.innerHTML = `
        .modal-box { transform: scale(0.9); animation: modalIn 0.3s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes modalIn { to { transform: scale(1); } }
        .btn-primary { background: var(--primary, #4f46e5); color: white; text-decoration: none; border-radius: 12px; font-weight: 700; transition: all 0.3s; }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3); }
    `;
    document.head.appendChild(style);
}
