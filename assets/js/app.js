// console.log( quizQuestions);
// Initial values
let counter = 10;
let currentQuestion = 0;
let score = 0;
let lost = 0;
let timer;

// function getGiphy(){
//  var queryUrl ="http://api.giphy.com/v1/gifs/search?q=parksandrec&api_key=AqeRwZk1AJ9TEai6gddvo5MTBBWNZ6NO";
 
//  $.ajax({
//     url: queryUrl,
//     type: "get"
//    }).then(function(response) {  

// var results = response.data

// console.log(results);
//    });   
// }




function nextQuestion() {
    const isQuestionOver = (quizQuestions.length -1) === currentQuestion;
    if (isQuestionOver) {
console.log('Game Over!');
    displayResult();
    }else {
            currentQuestion++;
            loadQuestion();
    }
}


// Timer
function timeUp(){
    clearInterval(timer);
    lost++;
    preloadImage('lost');
    setTimeout(nextQuestion, 3 * 1000);
}

function countDown() {
    counter--;
    $('#time').html('Timer:' + counter);
if (counter === 0){
    timeUp();
}
}
// Display question and choices to the browswer
function loadQuestion() {
    counter = 10;
    timer = setInterval(countDown,1000);

    const question = quizQuestions[currentQuestion].question;
    const choices = quizQuestions[currentQuestion].choices;

$('#time').html('Timer:' + counter);
$('#game').html(`
    <h4>${question}<h4/>
    ${loadChoices(choices)}
    ${loadRemainingQuestion()}
    `);
}    

function loadChoices(choices){
    let result = '';
    
    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }   

return result;
}
$(document).on('click', '.choice', function() {
    clearInterval(timer);
        
    const selectedAnswer= $(this).attr('data-answer');   
    const correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    
        if (correctAnswer === selectedAnswer){

            score++;
            console.log("April Ludgate");
            preloadImage('win');          
            setTimeout(nextQuestion, 3*1000);
    }
    else{
            lost++;   
            console.log("Jerry Gingrinch");
            preloadImage('lost');          
            setTimeout(nextQuestion, 3*1000);
    }
 console.log('hi', selectedAnswer);
});

function displayResult(){
    const result =`
    <p>You answered ${score} questions correctly!</p>
    <p>You missed ${lost} of the questions!</p>
    <p>Total questions ${quizQuestions.length} </p>
    <button class= "btn btn-lg btn-primary" id="reset">Play Again!</button>
    `;
    $('#game').html(result);
}

$(document).on('click','#reset', function() {
   
    counter = 10;
    currentQuestion = 0;
    score = 0;
    lost = 0;
    timer= null;
    
    loadQuestion();

});
    function loadRemainingQuestion() {
        const remainingQuestion = quizQuestions.length-(currentQuestion +1);
        const totalQuestion = quizQuestions.length;
        return `Remaining Questions: ${remainingQuestion}/${totalQuestion}`;
}
    function randomImage(images) {
        const random = Math.floor(Math.random() * images.length);
        const randomImage = images[random];
        return randomImage;
} 


function preloadImage(status) {
const correctAnswer = quizQuestions[currentQuestion].correctAnswer;


if(status==='win') {
    $('#game').html(`
    <p class="preload-image">Treat Yo Self!</p>
    <p class="preload-image">Correct answer is <b>${correctAnswer}</b></p>
    <img src ="${randomImage(winningImages)}"/>
    `);
} else{
$('#game').html(`
    <p class="preload-image">Knope the correct answer was <b>${correctAnswer}</b></p>
    <p class="preload-image">You could still work for the government.</p>
    <img src ="${randomImage(lostImages)}"/>
    `);
    console.log("Lil'Sebastian",randomImage);
}
}
$('#start').click(function() {
$('#start').remove();
$('#time').html(counter);
loadQuestion();

});;













