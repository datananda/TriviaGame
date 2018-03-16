/* --------------------------------------------
PseudoCode
-----------------------------------------------

#################
# GAME LOGIC
#################
start game
show new question
starts timer for 30 seconds
if user clicks correct question, end timer, show message
if user clicks incorrect question, end timer, show message
if time runs out, show message
wait 5 seconds and start a new question
repeat until all the questions are used up
show results & option to start over

#####################
# QUESTION OBJECT
#####################
question
4 answers
correct answer

#################
# GAME OBJECT
#################
questions
current question (?)
number correctly answered
number incorrectly answered
number unanswered
seconds given for answering a question
seconds given for viewing the answer

############################
# SETTING UP THE QUESTIONS
############################
questions = [question: "What is Utah's state song?"
            answers: ["Utah, This is the Place",
                      "It's a Pretty, Great State"
                      "From Mountains to Deserts"
                      "Deseret. The Land of Zion."],
*/

/*-------------------------------------------------------------------------
/ GLOBAL VARIABLES
/-------------------------------------------------------------------------*/
const question1 = new TriviaQuestion("Who's the best Coding Boot Camp teacher?", "Parker", "Josh", "Jed", "Bob");

const triviaGame = {
    questions: [question1],
    currentQuestion: question1,
    numCorrect: 0,
    numIncorrect: 0,
    numUnanswered: 0,
    secondsToAnswer: 5,
    startGame() {
        this.numCorrect = 0;
        this.numIncorrect = 0;
        this.numUnanswered = 0;
        $("#start-button").hide();
        this.startQuestionTimer();
    },
    displayQuestion() {
        $("#question").text(this.currentQuestion.question);
        // shuffle answers
        this.currentQuestion.answers.forEach((elem) => {
            const newListItem = $("<li>").text(elem);
            $("#answers").append(newListItem);
        });
    },
    startQuestionTimer() {
        let secondsLeft = this.secondsToAnswer;
        this.displayQuestion();
        $("#countdown").text(`Time Remaining: ${secondsLeft} seconds`);
        const questionTimer = setInterval(() => {
            secondsLeft--;
            $("#countdown").text(`Time Remaining: ${secondsLeft} seconds`);
            if (secondsLeft === 0) {
                clearInterval(questionTimer);
            }
        }, 1000);
    },
    checkGuess(guess) {
        if (this.currentQuestion.isCorrectAnswer(guess)) {
            this.numCorrect++;
        } else {
            this.numIncorrect++;
        }
        // TODO: DISPLAY RESULT
    },
};

/*-------------------------------------------------------------------------
/ CONSTRUCTORS & FUNCTIONS
/-------------------------------------------------------------------------*/

function TriviaQuestion(question, answer1, answer2, answer3, answer4, correctAnswer = answer1) {
    this.question = question;
    this.answers = [answer1, answer2, answer3, answer4];
    this.correctAnswer = correctAnswer;
}

TriviaQuestion.prototype.shuffleAnswers = function shuffle() {
    // shuffle array
};

TriviaQuestion.prototype.isCorrectAnswer = function check(guess) {
    if (guess === this.correctAnswer) {
        console.log("correct");
        return true;
    }
    return false;
};

/*-------------------------------------------------------------------------
/ MAIN PROCESS
/-------------------------------------------------------------------------*/
$("li").click(function () {
    triviaGame.checkGuess($(this).html());
});

$("#start-button").click(() => {
    triviaGame.startGame();
});
