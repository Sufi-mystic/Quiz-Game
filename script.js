const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-btn');

let shuffledQuestions, correctQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', ()=>{
    correctQuestionIndex++;
    setNextQuestion();
})

function startGame(){
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(()=>Math.random() -0.5);
    correctQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[correctQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answer.forEach(answer=>{
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click',selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
    })

    if(shuffledQuestions.length > correctQuestionIndex + 1){
        nextButton.classList.remove('hide');
    }else{
        startButton.innerText = "restart";
        startButton.classList.remove('hide');
    }

    if(selectedButton.dataset = correct){
        quizScore++
    }
    document.getElementById('right-answers').innerText = quizScore;
}

function setStatusClass(element, correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    }else{
        element.classList.add("wrong");
    }
}

function clearStatusClass(element){
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions=[
    {
        question : "Where is the world's tallest building located?",
        answer : [
            {text: 'Japan', correct: false},
            {text: 'Dubai', correct: true},
            {text: 'England', correct: false},
            {text: 'London', correct: false}
        ]
    },
    {
        question : "Who is the father of India?",
        answer : [
            {text: 'Jawaharlal Nehru', correct: false},
            {text: 'Mahatma Gandhi', correct: true},
            {text: 'Narendra Modi', correct: false},
            {text: 'Subash Chandra Bose', correct: false}
        ]
    },
    {
        question : "Who is the PM of India?",
        answer : [
            {text: 'Rahul Gandhi', correct: false},
            {text: 'Narendra Modi', correct: true}
        ]
    },
    {
        question : "What is 3 times 4?",
        answer : [
            {text: '12', correct: true},
            {text: '16', correct: false}
        ]
    }
]