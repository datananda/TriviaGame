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

*/


/*-------------------------------------------------------------------------
/ GLOBAL VARIABLES
/-------------------------------------------------------------------------*/
let questionTimer;
const questionList = [];

const triviaGame = {
    questions: questionList.concat(),
    currentQuestion: {},
    numCorrect: 0,
    numIncorrect: 0,
    numUnanswered: 0,
    secondsToAnswer: 30,
    startGame() {
        this.questions = questionList.concat();
        this.numCorrect = 0;
        this.numIncorrect = 0;
        this.numUnanswered = 0;
        $("#start-button").hide();
        $("#game-result-container").hide();
        this.selectQuestion();
        this.startQuestionTimer();
    },
    selectQuestion() {
        const randIndex = Math.floor(Math.random() * this.questions.length);
        this.currentQuestion = this.questions[randIndex];
        this.questions.splice(randIndex, 1);
        updateTimeline([{ key: "date1", startDate: this.currentQuestion.date }]);
    },
    startQuestionTimer() {
        let secondsLeft = this.secondsToAnswer;
        let percentRemaining = 100;
        this.displayQuestion();
        $("#countdown").text(`Time Remaining: ${secondsLeft} seconds`);
        $(".progress-bar").css("width", `${percentRemaining}%`); //TODO: UPDATE ARIA VALUE ALSO
        $("#countdown-container").show();
        questionTimer = setInterval(() => {
            secondsLeft--;
            percentRemaining = 100 * (secondsLeft / this.secondsToAnswer);
            $("#countdown").text(`Time Remaining: ${secondsLeft} seconds`);
            $(".progress-bar").css("width", `${percentRemaining}%`);
            if (secondsLeft === 0) {
                clearInterval(questionTimer);
                this.numUnanswered++;
                this.displayResult("Out of time!");
            }
        }, 1000);
    },
    displayQuestion() {
        $("#question").text(this.currentQuestion.question);
        $("#answers").empty();
        const currentAnswers = this.currentQuestion.answers.concat();
        for (let i = 0; i < this.currentQuestion.answers.length; i++) {
            const randIndex = Math.floor(Math.random() * currentAnswers.length);
            $("#answers").append($("<button>", { type: "button", class: "btn btn-outline-secondary btn-block" }).text(currentAnswers[randIndex]));
            currentAnswers.splice(randIndex, 1);
        }
        $("#question-container").show();
    },
    displayResult(result) {
        $("#question-container").hide();
        $("#result").text(result);
        $("#correct-answer").empty();
        if (result !== "Correct!") {
            $("#correct-answer").append($("<p>").text(`The correct answer was:\n${this.currentQuestion.correctAnswer}`));
        }
        $("#correct-answer").append($("<p>").text(this.currentQuestion.response));
        $("#result-container").show();
        setTimeout(() => {
            $("#result-container").hide();
            if (triviaGame.checkGameOver()) {
                triviaGame.displayGameResult();
            } else {
                triviaGame.selectQuestion();
                triviaGame.startQuestionTimer();
            }
        }, 10000);
    },
    checkGuess(guess) {
        if (this.currentQuestion.correctAnswer === guess) {
            this.numCorrect++;
            this.displayResult("Correct!");
        } else {
            this.numIncorrect++;
            this.displayResult("Wrong Answer!");
        }
    },
    checkGameOver() {
        if (this.questions.length === 0) {
            return true;
        }
        return false;
    },
    displayGameResult() {
        updateTimeline([]);
        $("#countdown-container").hide();
        $("#game-stats").empty();
        $("#game-stats").append($("<p>").text(`Correct Answers: ${this.numCorrect}`));
        $("#game-stats").append($("<p>").text(`Incorrect Answers: ${this.numIncorrect}`));
        $("#game-stats").append($("<p>").text(`Unanswered Questions: ${this.numUnanswered}`));
        $("#game-result-container").show();
    },
};


/*-------------------------------------------------------------------------
/ CONSTRUCTORS & FUNCTIONS
/-------------------------------------------------------------------------*/
function TriviaQuestion(question, a1, a2, a3, a4, response, date, correctAnswer = a1) {
    this.question = question;
    this.answers = [a1, a2, a3, a4];
    this.response = response;
    this.correctAnswer = correctAnswer;
    this.date = parseInt(date, 10);
}


/*-------------------------------------------------------------------------
/ MAIN PROCESS
/-------------------------------------------------------------------------*/
questionList.push(new TriviaQuestion("Who is considered to be the first computer programmer?", "Ada Lovelace", "Annabella Byron", "Betty Alexandra Toole", "Charles Babbage", "Lovelace wrote an algorithm for the Analytical Engine, a mechanical computer proposed by her friend and colleague Charles Babbage, to compute Bernoulli numbers. This algorithm is considered to be the first specifically tailored for implementation on a computer.", "1842"));
questionList.push(new TriviaQuestion('The "Harvard Computers" were a group of women hired by the director of the Harvard Observatory to process astronomical data. By what other name were they known?', "Pickering's Harem", "Harvard Classification System", "Cepheid Variables", "The Harem Effect", "The Harvard Computers were better known at the time as Pickering's Harem since they were hired by Edward Charles Pickering, then director of the Harvard Observatory. This is a prime example of the so-called Harem effect where male scientists in power hire predominately female subordinates.", "1893"));

$("#answers").on("click", "button", function () {
    clearInterval(questionTimer);
    triviaGame.checkGuess($(this).html());
});

$("#start-button, #reset-button").click(() => {
    triviaGame.startGame();
});
