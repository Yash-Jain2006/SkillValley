document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.etiquette-card');
    const achievementBanner = document.getElementById('achievementBanner');
    let achievementShown = {}; // Track shown achievements

    cards.forEach(card => {
        const checkboxes = card.querySelectorAll('input[type="checkbox"]');
        const progressCircle = card.querySelector('.progress-circle');
        const progressText = card.querySelector('.progress-text');

        // Update progress when checkbox is clicked
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                updateProgress(card, checkboxes, progressCircle, progressText);
            });
        });
    });

    function updateProgress(card, checkboxes, progressCircle, progressText) {
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(checkbox => checkbox.checked).length;
        const progress = Math.round((checked / total) * 100);
        const category = card.dataset.category;

        // Update progress circle
        progressCircle.setAttribute('data-progress', progress);
        progressCircle.style.setProperty('--progress', progress);
        progressText.textContent = `${progress}%`;

        // Rotate progress circle border
        progressCircle.style.transform = `rotate(${progress * 3.6}deg)`;

        // Show achievement banner only when category is completed for the first time
        if (progress === 100 && !achievementShown[category]) {
            showAchievement(category);
            achievementShown[category] = true; // Mark this achievement as shown
        }
    }

    function showAchievement(category) {
        // Hide any existing achievement banner first
        achievementBanner.classList.remove('show');
        
        // Wait a brief moment before showing new achievement
        setTimeout(() => {
            const achievementText = achievementBanner.querySelector('.achievement-text');
            achievementText.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Master Achievement Unlocked!`;
            
            achievementBanner.classList.add('show');
            
            // Hide banner after 3 seconds
            setTimeout(() => {
                achievementBanner.classList.remove('show');
            }, 3000);
        }, 100);
    }

    // Add hover animation to cards
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});

const learningContent = {
    email: {
        title: "Email & Communication Skills",
        modules: [
            {
                title: "Professional Email Writing",
                content: `
                    <div class="lesson-content">
                        <h3>Key Elements of Professional Emails</h3>
                        <ul>
                            <li>Clear and concise subject lines</li>
                            <li>Professional greetings and closings</li>
                            <li>Proper formatting and structure</li>
                        </ul>
                        <div class="example-box">
                            <h4>Example:</h4>
                            <pre>
Subject: Project Update: Q3 Marketing Campaign
                                
Dear Mr. Johnson,

I hope this email finds you well. I'm writing to provide an update on the Q3 marketing campaign progress.

[Content]

Best regards,
Jane Smith
                            </pre>
                        </div>
                        <div class="practice-exercise">
                            <h4>Quick Exercise:</h4>
                            <p>Identify the issues in this email:</p>
                            <pre class="incorrect-example">
hey there!
just wanted 2 check if ur free 2morrow 4 the meeting???
thx
                            </pre>
                            <button class="show-answer-btn">Show Answer</button>
                            <div class="answer" style="display: none;">
                                Issues:
                                - Informal greeting
                                - Text message style writing
                                - Missing proper structure
                                - No signature
                            </div>
                        </div>
                    </div>
                `
            },
            {
                title: "Meeting Communication",
                content: `
                    <div class="lesson-content">
                        <h3>Effective Meeting Communication</h3>
                        <div class="tips-section">
                            <h4>Before the Meeting:</h4>
                            <ul>
                                <li>Review the agenda</li>
                                <li>Prepare relevant materials</li>
                                <li>Test technical equipment</li>
                            </ul>
                            <h4>During the Meeting:</h4>
                            <ul>
                                <li>Active listening</li>
                                <li>Clear and concise speaking</li>
                                <li>Professional body language</li>
                            </ul>
                        </div>
                        <div class="interactive-scenario">
                            <h4>Scenario Practice:</h4>
                            <p>You need to present a project update. Choose the best approach:</p>
                            <div class="scenario-options">
                                <button class="option" data-correct="false">
                                    Wing it and speak off the cuff
                                </button>
                                <button class="option" data-correct="true">
                                    Prepare key points and supporting data
                                </button>
                                <button class="option" data-correct="false">
                                    Read directly from detailed notes
                                </button>
                            </div>
                        </div>
                    </div>
                `
            }
            // Add more modules as needed
        ]
    },
    workplace: {
        title: "Workplace Behavior",
        modules: [
            {
                title: "Office Etiquette",
                content: `
                    <div class="lesson-content">
                        <h3>Professional Workplace Conduct</h3>
                        <div class="do-dont-section">
                            <div class="dos">
                                <h4>Do's:</h4>
                                <ul>
                                    <li>Respect others' space and time</li>
                                    <li>Maintain a clean workspace</li>
                                    <li>Be punctual</li>
                                </ul>
                            </div>
                            <div class="donts">
                                <h4>Don'ts:</h4>
                                <ul>
                                    <li>Have loud personal conversations</li>
                                    <li>Eat strong-smelling foods at desk</li>
                                    <li>Interrupt meetings unnecessarily</li>
                                </ul>
                            </div>
                        </div>
                        <div class="case-study">
                            <h4>Case Study:</h4>
                            <p>How would you handle this situation?</p>
                            <div class="scenario">
                                A colleague consistently plays music without headphones...
                            </div>
                            <div class="solution-options">
                                <!-- Add interactive options -->
                            </div>
                        </div>
                    </div>
                `
            }
        ]
    }
    // Add more categories as needed
};

function openLearningModule(category) {
    const modal = document.getElementById('learningModal');
    const content = learningContent[category];
    let currentModule = 0;

    // Set up modal content
    document.getElementById('modalTitle').textContent = content.title;
    updateContent();
    updateProgress();

    // Show modal
    modal.classList.add('show');

    // Event listeners
    document.querySelector('.close-modal').onclick = () => {
        modal.classList.remove('show');
    };

    document.getElementById('nextBtn').onclick = () => {
        if (currentModule < content.modules.length - 1) {
            currentModule++;
            updateContent();
            updateProgress();
        }
    };

    document.getElementById('prevBtn').onclick = () => {
        if (currentModule > 0) {
            currentModule--;
            updateContent();
            updateProgress();
        }
    };

    function updateContent() {
        const learningContent = document.getElementById('learningContent');
        learningContent.innerHTML = content.modules[currentModule].content;
        
        // Set up interactive elements
        setupInteractiveElements();
    }

    function updateProgress() {
        const progress = ((currentModule + 1) / content.modules.length) * 100;
        document.getElementById('moduleProgress').style.width = `${progress}%`;
    }

    function setupInteractiveElements() {
        // Set up show/hide answers
        document.querySelectorAll('.show-answer-btn').forEach(btn => {
            btn.onclick = function() {
                const answer = this.nextElementSibling;
                answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
            };
        });

        // Set up scenario options
        document.querySelectorAll('.scenario-options .option').forEach(option => {
            option.onclick = function() {
                const isCorrect = this.dataset.correct === 'true';
                this.classList.add(isCorrect ? 'correct' : 'incorrect');
                // Add feedback animation/message
            };
        });
    }
}