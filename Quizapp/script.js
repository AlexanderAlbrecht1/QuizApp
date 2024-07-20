let currentQuestion = 0;
let correctAnswers = 0;
let audioCorrect = new Audio('audio/correct.mp3');
let audioWrong = new Audio('audio/wrong.mp3');
let audiFinish = new Audio('audio/finish.mp3');

function init() {
    document.getElementById('questionLength').innerText = questions.length;
    showQuestion()
}

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressBar();
        showNextQuestion();
    }
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedAnswerNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question.right_answer}`;
    if (selectedAnswerNumber == question.right_answer) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audioCorrect.play();
        correctAnswers++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        audioWrong.play();
    };
    document.getElementById('nextButton').disabled = false;
}

function nextQuestion() {
    document.getElementById('currentQuestion').innerText = '';
    currentQuestion++;
    document.getElementById('nextButton').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}
function showScore() {
    document.getElementById('questionLengthResult').innerText = questions.length;
    document.getElementById('correctAnswers').innerText = correctAnswers
    audiFinish.play();
}

function restartGame() {
    document.getElementById('endScreen').style = `display: none`;
    document.getElementById('questionBody').style = ``;
    currentQuestion = 0;
    correctAnswers = 0;
    init();
}

function showEndscreen() {
    document.getElementById('endScreen').style = ``;
    showScore();
    document.getElementById('questionBody').style = `display: none`;
}

function showNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('currentQuestion').innerHTML = currentQuestion + 1;
    document.getElementById('questionText').innerHTML = question.question;
    document.getElementById('answer_1').innerHTML = question.answer_1;
    document.getElementById('answer_2').innerHTML = question.answer_2;
    document.getElementById('answer_3').innerHTML = question.answer_3;
    document.getElementById('answer_4').innerHTML = question.answer_4;
}

function updateProgressBar() {
    let percent = Math.round(((currentQuestion + 1) / questions.length) * 100);
    document.getElementById('progressBar').innerHTML = `${percent} %`;
    document.getElementById('progressBar').style = `width: ${percent}%`;
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}
