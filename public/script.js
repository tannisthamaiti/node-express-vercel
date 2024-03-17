import data from './question.json' assert { type: 'json' };
const questions = data;

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons") ;
const nextbutton = document.getElementById("next-btn") ;

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    let currentQuestionIndex=0;
    let score=0;
    nextbutton.innerHTML="Next";
    showQuestions();

}
function showQuestions(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML= questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if (answer.correct){
            button.dataset.correct=answer.correct;

        }
        button.addEventListener("click",selectAnswer)
    });

}
function resetState(){
    nextbutton.style.display="none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }

}
function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct ==='true';
    if (iscorrect){
        selectedBtn.classList.add("correct"); 
        score++;
    }else{
        selectedBtn.classList.add("incorrect"); 
    }
    Array.from(answerbuttons.children).forEach(button =>{
        if(button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    })
    nextbutton.style.display="block";

}
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML= 
        `<a class="anchor-link" href="index.html">Play Again</a> `;
    nextbutton.style.display="block";

}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestions();

    }else{
        showScore();
    }

}
nextbutton.addEventListener("click", ()=>{
    if (currentQuestionIndex <questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})
startQuiz();