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
let questionTimer;
const question1 = new TriviaQuestion("Who's the best Coding Boot Camp teacher?", "Parker", "Josh", "Jed", "Bob");
const question2 = new TriviaQuestion("Who's the best Coding Boot Camp TA?", "Katie", "Matt", "Hogan", "Will");
const question3 = new TriviaQuestion("Who's the best Coding Boot Camp SSM?", "Andrea", "Jamie", "Sarah", "Joelle");

const triviaGame = {
    questions: [question1, question2, question3],
    currentQuestion: {},
    numCorrect: 0,
    numIncorrect: 0,
    numUnanswered: 0,
    secondsToAnswer: 5,
    startGame() {
        this.numCorrect = 0;
        this.numIncorrect = 0;
        this.numUnanswered = 0;
        $("#start-button").hide();
        this.selectQuestion();
        this.startQuestionTimer();
    },
    selectQuestion() {
        const randIndex = Math.floor(Math.random() * this.questions.length);
        this.currentQuestion = this.questions[randIndex];
        this.questions.splice(randIndex, 1);
    },
    startQuestionTimer() {
        let secondsLeft = this.secondsToAnswer;
        this.displayQuestion();
        $("#countdown").text(`Time Remaining: ${secondsLeft} seconds`);
        questionTimer = setInterval(() => {
            secondsLeft--;
            $("#countdown").text(`Time Remaining: ${secondsLeft} seconds`);
            if (secondsLeft === 0) {
                clearInterval(questionTimer);
                this.numUnanswered++;
                this.displayResult("unanswered");
            }
        }, 1000);
    },
    displayQuestion() {
        $("#question").show().text(this.currentQuestion.question);
        $("#answers").show();
        // TODO: SHUFFLE ANSWERS
        this.currentQuestion.answers.forEach((elem, i) => {
            $(`#answers li:eq(${i})`).text(elem);
        });
    },
    displayResult(result) {
        $("#question").hide();
        $("#answers").hide();
        $("#result").show().text(result);
        setTimeout(() => {
            $("#result").hide();
            if (triviaGame.checkGameOver()) {
                // display end of game summary
            } else {
                triviaGame.selectQuestion();
                triviaGame.startQuestionTimer();
            }
        }, 3000);
    },
    checkGuess(guess) {
        if (this.currentQuestion.isCorrectAnswer(guess)) {
            this.numCorrect++;
            this.displayResult("correct");
        } else {
            this.numIncorrect++;
            this.displayResult("incorrect");
        }
    },
    checkGameOver() {
        if (this.questions.length === 0) {
            return true;
        }
        return false;
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
        return true;
    }
    return false;
};

/*-------------------------------------------------------------------------
/ MAIN PROCESS
/-------------------------------------------------------------------------*/
$("#answers li").click(function () {
    clearInterval(questionTimer);
    triviaGame.checkGuess($(this).html());
});

$("#start-button").click(() => {
    triviaGame.startGame();
});
