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
        this.currentQuestion = this.questions[0];
        this.questions.splice(0, 1);
        updateTimeline([{ key: "date1", startDate: this.currentQuestion.date }]);
    },
    startQuestionTimer() {
        let secondsLeft = this.secondsToAnswer;
        let percentRemaining = 100;
        this.displayQuestion();
        $("#countdown").text(`Time Remaining: ${secondsLeft} seconds`);
        $(".progress-bar").css("width", `${percentRemaining}%`); // TODO: UPDATE ARIA VALUE ALSO
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
questionList.push(new TriviaQuestion("What was the name of the set of computers developed by British codebreakers for cryptanalysis during WWII and operated by the Women's Royal Naval Service?", "Colossus", "Bombe", "Enigma", "Bletchley", "The women who operated the Colossus machines were called Wrens after the phonetic pronunciation of the acronym WRNS (Women's Royal Naval Service). The Colussus itself was the first of the electronic digital machines with programmability and was used to decipher intercepted encyrpted messages.", "1943"));
questionList.push(new TriviaQuestion("Grace Hopper is called the mother of which programming language?", "COBOL", "FLOW-MATIC", "FORTRAN", "UNIVAC", "American computer scientist and United States Navy admiral Grace Hopper popularized the idea of machine-independent programming languages as well as English word-based languages. Based on Hopper's work, the CODASYL consortium designed the language COBOL (common business-oriented language).", "1959"));
questionList.push(new TriviaQuestion("What activity is Mary Allen Wilkes known for being the first to do?", "Using a personal computer in the home", "Programming an IBM computer", "Developing an interactive operating system", "Authoring a programming manual", "Wilkes is recognized as the world's first personal computer because she worked on the LINC computer from her parents' home in Baltimore.", "1965"));
questionList.push(new TriviaQuestion("At its peak, what was the percentage of computer science majors that were women?", "37%", "82%", "14%", "59%", "The precipitous drop-off in female computer science majors starting in 1984 is believed to be caused by the rise in personal computers, which were largely marketed to men and boys.", "1984"));
questionList.push(new TriviaQuestion("What was the name of the email network for women in technology that Anita Borg founded?", "Systers", "The Institute for Women and Technology", "The Association for Women in Computing", "MECCA", "The idea for Systers came to Borg when she was struck by how few females were in attendance at the Symposium on Operating Systems Principles (SOSP) conference and discussed the issue with several other women in the ladies' room and over lunch.", "1987"));
questionList.push(new TriviaQuestion("In 2016, how much less did the average female programmer make than her male counterpart?", "28.3%", "19.5%", "36.2%", "41.7%", "In a study conducted by Glassdoor on over 505,000 salaries, computer programmers were found to have the largest gender pay gap of all the tech jobs.", "2016"));

$("#answers").on("click", "button", function () {
    clearInterval(questionTimer);
    triviaGame.checkGuess($(this).html());
});

$("#start-button, #reset-button").click(() => {
    triviaGame.startGame();
});
