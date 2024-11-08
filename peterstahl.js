fetch('peterstahl.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const questionsContainer = document.getElementById('questions');
        data.questions.forEach(question => {
            const questionMandatoryIndicator = question.mandatory ? '*' : '';
            const questionMandatoryCodeRadioButton = question.mandatory ? 'required' : '';
            const questionMandatoryCodeCheckBox = question.mandatory ? 'data-mandatory="true"' : ''; 
            const questionElement = document.createElement('div');
            questionElement.className = 'question';
            questionElement.innerHTML = `
                <label>${question.question + questionMandatoryIndicator}</label><br/>
            `;

            if (question.type==='multiple') {
                question.answers.forEach(answer => {
                    questionElement.innerHTML = questionElement.innerHTML + `
                    <input type="checkbox" name="${question.id}" id="${answer.id}" data-group="${question.id}" data-answer="${answer.correct}" ${questionMandatoryCodeCheckBox} />${answer.text}<br/>`;
                });
            } else {
                question.answers.forEach(answer => {
                    questionElement.innerHTML = questionElement.innerHTML + `
                    <input type="radio" name="${question.id}" id="${answer.id}" data-group="${question.id}" data-answer="${answer.correct}" ${questionMandatoryCodeRadioButton} />${answer.text}<br/>`;
                });
            }      
            questionElement.innerHTML = questionElement.innerHTML + '<br/>';      

            questionsContainer.appendChild(questionElement);
        });
    })
    .catch(error => console.error('Error loading questionnaire:', error));
    
    let totalScore = 0;        
    
    document.addEventListener('change', (event) => {
        const scoreLabel = document.getElementById('score');
        if (event.target.matches('input[type="checkbox"], input[type="radio"]')) {
            const questionElements = document.querySelectorAll('.question');
            totalScore = 0; // Reset total score

            questionElements.forEach(questionElement => {
            const inputs = questionElement.querySelectorAll('input[type="checkbox"], input[type="radio"]');
            let questionScore = 0;
            let correctAnswers = 0;
            let selectedCorrectAnswers = 0;
            let selectedIncorrectAnswers = 0;

            inputs.forEach(input => {
                const isCorrect = input.getAttribute('data-answer') === 'true';
                const isChecked = input.checked;

                if (isCorrect) {
                correctAnswers++;
                if (isChecked) {
                    selectedCorrectAnswers++;
                }
                } else {
                if (isChecked) {
                    selectedIncorrectAnswers++;
                }
                }
            });

            if (selectedCorrectAnswers === correctAnswers && selectedIncorrectAnswers === 0) {
                questionScore = 1; // Full score for the question
            }

            totalScore += questionScore;
            });
            const totalQuestions = questionElements.length;
            scoreLabel.innerText = 'Total Score: ' + totalScore + ' out of ' + totalQuestions;
        }
    });

    function validateCheckboxGroups() {
        const groups = {};
        let allValid = true;

        // Collect all checkboxes by group
        document.querySelectorAll('input[type="checkbox"][data-group]').forEach(checkbox => {
            const group = checkbox.dataset.group;
            if (!groups[group]) {
                groups[group] = {
                    checkboxes: [],
                    mandatory: checkbox.dataset.mandatory === "true"
                };
            }
            groups[group].checkboxes.push(checkbox);
        });

        // Validate each mandatory group
        for (const group in groups) {
            if (groups[group].mandatory) {
                const isGroupValid = groups[group].checkboxes.some(checkbox => checkbox.checked);

                if (!isGroupValid) {
                    allValid = false;
                    // Highlight the group
                    groups[group].checkboxes.forEach(checkbox => {
                        checkbox.parentElement.classList.add('error');
                    });
                } else {
                    // Remove highlight if valid
                    groups[group].checkboxes.forEach(checkbox => {
                        checkbox.parentElement.classList.remove('error');
                    });
                }
            }
        }

        if (!allValid) {
            alert('Please select at least one option in each mandatory group.');
        }

        return allValid;
    }