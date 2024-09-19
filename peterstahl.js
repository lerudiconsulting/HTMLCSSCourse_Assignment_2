fetch('peterstahl.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const questionsContainer = document.getElementById('questions');
        data.questions.forEach(question => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question';
            questionElement.innerHTML = `
                <label>${question.question}</label><br/>
            `;

            if (question.type==='multiple') {
                question.answers.forEach(answer => {
                    questionElement.innerHTML = questionElement.innerHTML + `
                    <input type="checkbox" id="${answer.id}" data-answer="${answer.correct}" />${answer.text}<br/>`;
                });
            } else {
                question.answers.forEach(answer => {
                    questionElement.innerHTML = questionElement.innerHTML + `
                    <input type="radio" name="${question.id}" id="${answer.id}" data-answer="${answer.correct}" />${answer.text}<br/>`;
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