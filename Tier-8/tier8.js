document.addEventListener('DOMContentLoaded', () => {
    // Tool content templates
    const toolContent = {
        resume: {
            title: 'Resume Builder',
            sections: [
                {
                    name: 'Personal Info',
                    fields: ['Full Name', 'Email', 'Phone', 'Location']
                },
                {
                    name: 'Professional Summary',
                    fields: ['Career Objective', 'Key Skills']
                },
                {
                    name: 'Work Experience',
                    fields: ['Company', 'Position', 'Duration', 'Achievements']
                },
                {
                    name: 'Education',
                    fields: ['Degree', 'Institution', 'Year', 'GPA']
                }
            ]
        },
        interview: {
            title: 'Interview Preparation',
            categories: [
                {
                    name: 'Technical Questions',
                    questions: [
                        'Explain Object-Oriented Programming concepts',
                        'What is the difference between Python and Java?',
                        'Explain time complexity and space complexity',
                        'How does a hash table work?'
                    ]
                },
                {
                    name: 'Behavioral Questions',
                    questions: [
                        'Tell me about a challenging project you worked on',
                        'How do you handle conflicts in a team?',
                        'Describe a situation where you showed leadership',
                        'What are your greatest strengths and weaknesses?'
                    ]
                }
            ]
        },
        strategy: {
            title: 'Job Search Strategy',
            topics: [
                {
                    name: 'Company Research',
                    content: 'Learn how to research potential employers effectively'
                },
                {
                    name: 'Application Tracking',
                    content: 'Organize and track your job applications systematically'
                },
                {
                    name: 'Networking',
                    content: 'Build and leverage your professional network'
                },
                {
                    name: 'Salary Negotiation',
                    content: 'Master the art of negotiating your compensation package'
                }
            ]
        }
    };

    // Modal functionality
    const modal = document.getElementById('toolModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close-modal');

    function openTool(tool) {
        const content = toolContent[tool];
        let html = `<h2>${content.title}</h2>`;

        // Generate different content based on tool type
        if (tool === 'resume') {
            html += generateResumeBuilder(content.sections);
        } else if (tool === 'interview') {
            html += generateInterviewPrep(content.categories);
        } else if (tool === 'strategy') {
            html += generateStrategy(content.topics);
        }

        modalContent.innerHTML = html;
        modal.style.display = 'block';
        updateProgress(tool);
    }

    function generateResumeBuilder(sections) {
        return `
            <div class="resume-builder">
                ${sections.map(section => `
                    <div class="resume-section">
                        <h3>${section.name}</h3>
                        <div class="form-fields">
                            ${section.fields.map(field => `
                                <div class="form-group">
                                    <label for="${field.toLowerCase().replace(/\s+/g, '-')}">${field}</label>
                                    <input type="text" id="${field.toLowerCase().replace(/\s+/g, '-')}" 
                                           placeholder="Enter ${field.toLowerCase()}">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                <button class="save-resume-btn" onclick="saveResume()">Save Resume</button>
            </div>
        `;
    }

    function generateInterviewPrep(categories) {
        return `
            <div class="interview-prep">
                ${categories.map(category => `
                    <div class="question-category">
                        <h3>${category.name}</h3>
                        <div class="questions-list">
                            ${category.questions.map(question => `
                                <div class="question-item">
                                    <p>${question}</p>
                                    <button class="practice-btn" onclick="startPractice('${question}')">
                                        Practice Answer
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function generateStrategy(topics) {
        return `
            <div class="strategy-guide">
                ${topics.map(topic => `
                    <div class="strategy-topic">
                        <h3>${topic.name}</h3>
                        <p>${topic.content}</p>
                        <div class="resource-links">
                            <button class="resource-btn" onclick="showResources('${topic.name}')">
                                View Resources
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Progress tracking
    function updateProgress(tool) {
        const progressElement = document.getElementById(`${tool}Progress`);
        let currentProgress = parseInt(progressElement.style.width) || 0;
        let newProgress = Math.min(currentProgress + 20, 100);
        progressElement.style.width = `${newProgress}%`;
        
        if (newProgress === 100) {
            showAchievement(tool);
        }
    }

    function showAchievement(tool) {
        const achievementNames = {
            resume: 'Resume Master',
            interview: 'Interview Pro',
            strategy: 'Strategy Expert'
        };

        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <span class="achievement-icon">🏆</span>
            <p>Achievement Unlocked: ${achievementNames[tool]}!</p>
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Event listeners
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Make functions available globally
    window.openTool = openTool;
    window.saveResume = function() {
        // Implement resume saving logic
        updateProgress('resume');
    };

    window.startPractice = function(question) {
        // Implement practice functionality
        updateProgress('interview');
    };

    window.showResources = function(topic) {
        // Implement resource display logic
        updateProgress('strategy');
    };
});