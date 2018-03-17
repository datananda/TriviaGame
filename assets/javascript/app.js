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
    questions: questionList,
    currentQuestion: {},
    numCorrect: 0,
    numIncorrect: 0,
    numUnanswered: 0,
    secondsToAnswer: 5,
    startGame() {
        this.questions = questionList;
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
                this.displayResult("Out of time!");
            }
        }, 1000);
    },
    displayQuestion() {
        $("#question").show().text(this.currentQuestion.question);
        $("#answers").show();
        // TODO: SHUFFLE ANSWERS look into .map
        this.currentQuestion.answers.forEach((elem, i) => {
            $(`#answers li:eq(${i})`).text(elem);
        });
    },
    displayResult(result) {
        $("#question").hide();
        $("#answers").hide();
        $("#result").show().text(result);
        $("#correct-answer").show().text(`The correct answer was: ${this.currentQuestion.correctAnswer}`);
        setTimeout(() => {
            $("#result").hide();
            $("#correct-answer").hide();
            console.log(this);
            if (triviaGame.checkGameOver()) {
                triviaGame.displayGameResult();
            } else {
                triviaGame.selectQuestion();
                triviaGame.startQuestionTimer();
            }
        }, 3000);
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
        $("#num-correct").text(`Correct Answers: ${this.numCorrect}`);
        $("#num-incorrect").text(`Incorrect Answers: ${this.numIncorrect}`);
        $("#num-unanswered").text(`Unanswered Questions: ${this.numUnanswered}`);
    }
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

// TriviaQuestion.prototype.isCorrectAnswer = function check(guess) {
//     if (guess === this.correctAnswer) {
//         return true;
//     }
//     return false;
// };


/*-------------------------------------------------------------------------
/ MAIN PROCESS
/-------------------------------------------------------------------------*/
questionList.push(new TriviaQuestion("Who is considered to be the first computer programmer?", "Ada Lovelace", "Annabella Byron", "Betty Alexandra Toole", "Charles Babbage"));
questionList.push(new TriviaQuestion('The “Harvard Computers” were a group of women hired by the director of the Harvard Observatory to process astronomical data. By what other name were they known?', "Pickering's Harem", "Harvard Classification System", "Cepheid Variables", "The Harem Effect"));

$("#answers li").click(function () {
    clearInterval(questionTimer);
    triviaGame.checkGuess($(this).html());
});

$("#start-button").click(() => {
    triviaGame.startGame();
});
