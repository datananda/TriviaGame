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
    numCorrect: 0,
    numIncorrect: 0,
    numUnanswered: 0,
    displayQuestion() {
        $("#question").text(this.questions[0].question);
        let answerList = $("#answers");
        // this.questions[0].answers.forEach( function (elem) {

        // });
        console.log(this.questions[0]);
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

TriviaQuestion.prototype.checkGuess = function check(guess) {
    if (guess === this.correctAnswer) {
        return true;
    }
    return false;
};

/*-------------------------------------------------------------------------
/ MAIN PROCESS
/-------------------------------------------------------------------------*/
console.log(question1);
console.log(question1.checkGuess("Parker"));
triviaGame.displayQuestion();