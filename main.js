
// Quiz content data input

let quizData = [
    {
        question: "Robert crossed the road",
        options: ["To see the monkey", "To see what was happening", "To give money to the old man", "To dance with the monkey"],
        correct: "To see what was happening"
    },
    {
        question: "The gathering was",
        options: [
          "Inside the park and near the entrance.",
          "Outside the park at the entrance.",
          "On the pavement",
          "In an apartment"
        ],
        correct: "Outside the park at the entrance."
    },
    {
        question: "What did the old man use to collect money?",
        options: [
          "a bucket",
          "a hat",
          "a cup",
          "a tin"
        ],
        correct: "a hat"
    },
    {
        question: "What did the old man do to get everybody's attention?",
        options: [
          "Let out a loud cry",
          "Cried silently",
          "Yelled at people",
          "Got angry"
        ],
        correct: "Let out a loud cry"
    },
    {
        question: "Why did the people give silver coins to the old man?",
        options: [
          "Because the monkey's tricks were so good",
          "Because the monkey died",
          "Because the old man was angry",
          "Because the old man was dying"
        ],
        correct: "Because the monkey died"
    }
    ];
    /*{
        question: "What is the capital of Japan?",
        options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        correct: "Tokyo",
    },

    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        correct: "Mars",
    },
    {
        question:
          "Which famous scientist developed the theory of general relativity?",
        options: ["Isaac Newton","Albert Einstein","Stephen Hawking","Galileo Galilei",],
        correct: "Albert Einstein",
    },
    {
        question: "What is the largest mammal on Earth?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: "Blue Whale",
    },
    {
        question: "Which famous artist painted the Mona Lisa?",
        options: ["Vincent van Gogh","Pablo Picasso","Leonardo da Vinci","Michelangelo",],
        correct: "Leonardo da Vinci",
    },
    {
        question: "Which playwright wrote the tragedy 'Romeo and Juliet'?",
        options: ["William Shakespeare","George Bernard Shaw","Oscar Wilde","Charles Dickens",],
        correct: "William Shakespeare",
    },
    {
        question: "Who is known as the father of modern physics?",
        options: ["Isaac Newton","Albert Einstein","Galileo Galilei","Niels Bohr",],
        correct: "Albert Einstein",
    },
    {
        question:
          "Which ancient wonder of the world was a massive statue of the Greek god Zeus?",
        options: ["Great Pyramid of Giza","Hanging Gardens of Babylon","Statue of Zeus at Olympia","Colossus of Rhodes",],
        correct: "Statue of Zeus at Olympia",
    },*/


//  Adding functions with js

// HTML to JS element retrieval 

const quizContainer = document.querySelector (".quiz-container");
const question = document.querySelector (".quiz-container .question");
const options = document.querySelector (".quiz-container .options");
const nextBtn = document.querySelector (".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");

//variables
let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS  = 5; 

// adding shuffling

const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() -0.5);
};

quizData = shuffleArray (quizData) ;

//reset local storage 
const resetLocalStorage = () => {
    for (i = 0; i <MAX_QUESTIONS; i++) {
        localStorage.removeItem(`userAnswer_${i}`);
    }
};

resetLocalStorage();


//adding feedback mechanism
const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    if (userAnswer === quizData[questionNumber].correct){
        score++;
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("incorrect");
    }
    //storing user answers
    localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

    let alloptions = document.querySelectorAll(".quiz-container .option");
    alloptions.forEach((o) => {
        o.classList.add("disabled");
    })
};


//Dynamic question generation

const createQuestion = () => {
    options.innerHTML = "";
    question.innerHTML = `<span class='question-number'>${
        questionNumber + 1
    }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;
   
    //shuffle options
    const shuffledOptions = shuffleArray(quizData[questionNumber].options);

    shuffledOptions.forEach((o) =>{
        const option = document.createElement ("button");
        option.classList.add ("option");
        option.innerHTML = o;
        option.addEventListener("click", (e) =>{
            checkAnswer(e);
        });
        options.appendChild(option);
    });
};

const retakeQuiz = () => {
   questionNumber = 0;
   score = 0;
   quizData = shuffleArray(quizData);
   resetLocalStorage();

   createQuestion();
   quizResult.style.display = "none";
   quizContainer.style.display = "block";
};


//quiz result page
const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    quizResult.innerHTML = "";

    const resultHeading = document.createElement("h2");
    resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
    quizResult.appendChild(resultHeading);

    for (let i =0; i < MAX_QUESTIONS; i++) {
        const resultItem = document.createElement ("div");
        resultItem.classList.add("question-container");

        const userAnswer = localStorage.getItem(`userAnswer_${i}`);
        const correctAnswer = quizData[i].correct;

        let answerCorrectly =userAnswer === correctAnswer;

        if (!answerCorrectly){
            resultItem.classList.add("incorrect");
        }

        resultItem.innerHTML = `<div class = "question"> Question ${i + 1}: ${
            quizData[i].question
        }</div>
        <div class ="user-answer">Your answer:${userAnswer || "Not Answered"}</div>
        <div class ="correct-answer">Correct answer:${correctAnswer}</div>`;

        quizResult.appendChild(resultItem);
    }

    //adding Retake button
    const retakeBtn = document.createElement("button");
    retakeBtn.classList.add("retake-btn");
    retakeBtn.innerHTML = "Retake Quiz";
    retakeBtn.addEventListener("click", retakeQuiz);
    quizResult.appendChild(retakeBtn);
};

createQuestion();

//adding Event listeners

const displayNextQuestion = () => {
    if (questionNumber >=MAX_QUESTIONS -1) {
        displayQuizResult();
        return;
    }
    questionNumber++;
    createQuestion();
};


nextBtn.addEventListener("click", displayNextQuestion);