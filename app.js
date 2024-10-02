const apiUrl = 'https://script.google.com/macros/s/AKfycbyofpTGjFtX1YTa3gqjJYtmAUdnD9U0UBKRDSBDdhhMf9FPdlzhZzWv93lUIOZjXX93/exec';

let questions = [];
let currentQuestionIndex = 0;

async function fetchQuestions() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        questions = data;
        displayQuestion(currentQuestionIndex);
    } catch (error) {
        console.error('Error fetching questions:', error);
        document.getElementById('question-text').textContent = 'Failed to load questions.';
    }
}

function displayQuestion(index) {
    const questionNumberElement = document.getElementById('question-number');
    const questionTextElement = document.getElementById('question-text');

    questionNumberElement.textContent = `Question ${index + 1}`;
    questionTextElement.textContent = questions[index].question;

    document.getElementById('prev-btn').disabled = index === 0;
    document.getElementById('next-btn').disabled = index === questions.length - 1;
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
});

document.getElementById('solution-btn').addEventListener('click', () => {
    const questionTextElement = document.getElementById('question-text');
    questionTextElement.textContent = questions[currentQuestionIndex].answer;

    // Change the heading to "Answer"
    const questionNumberElement = document.getElementById('question-number');
    questionNumberElement.textContent = 'Answer';
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
});

// Fetch questions when the page loads
fetchQuestions();
