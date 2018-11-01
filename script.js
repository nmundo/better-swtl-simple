$(() => {
    $('.ui.checkbox').checkbox();

    $(document).keypress(e => {
        if(e.which == 13) {
            checkAnswer();
        }
    });
});

let correctAnswers = 0;

function checkAnswer() {
    let questionContainer = $('.questionContainer:visible');
    let questionType = questionContainer.data('questionType');
    let correctAnswer = questionContainer.data('answer').replace(/&quot/g, '"');
    let questionId = questionContainer.data('id');
    let answeredCorrectly;

    let selectedAnswer = '';
    switch (questionType) {
        case 0:
            selectedAnswer = questionContainer.find('input[type=radio]:checked').val();
            break;
        case 1:
        case 2:
            selectedAnswer = questionContainer.find('input[name=answer]').val();
            break;
    }

    answeredCorrectly = selectedAnswer === correctAnswer;

    answeredCorrectly ? goToNextQuestion(questionId) : showError(questionId, correctAnswer);
}

function goToNextQuestion(questionId) {
    $(`#question${questionId}`).hide();
    $(`#question${questionId + 1}`).show();
    $(`#questionSteps div:nth-child(${questionId + 1})`).removeClass('active').addClass('completed');
    $(`#questionSteps div:nth-child(${questionId + 2})`).addClass('active');

}

function showError(questionId, correctAnswer) {
    let errorDiv = $(`#errorMessage${questionId}`);
    errorDiv.text(`The correct answer is ${correctAnswer}`);
    $(`#question${questionId} .form`).addClass('error')
}