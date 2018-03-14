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
"What is Utah's state song?"
"Utah, This is the Place"
"It's a Pretty, Great State"
"From Mountains to Deserts"
"Deseret. The Land of Zion."

*/


/*-------------------------------------------------------------------------
/ CONSTRUCTORS & FUNCTIONS
/-------------------------------------------------------------------------*/

function TriviaQuestion(question, answers, correctAnswer = answers[0]) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
    this.shuffleAnswers = function shuffle() {
        // shuffle array
    };
    this.checkGuess = function check(guess) {
        if (guess === this.correctAnswer) {
            return true;
        }
        return false;
    };
}

