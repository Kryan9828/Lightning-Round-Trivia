// variables and arrays
const clues = []
const answered = []
let cluesCount 
let randomNumberArray = [] 
let points = 0
let control = 0
let questionLabel = "Question:"
let questionsText = `${questionLabel}\n` 

// Dom Created Elements
const categoryTitle =document.createElement("h2")
const questions = document.getElementById("questions")
const responseToAnswer = document.createElement("h2") 
let start = document.getElementById("startButton")
const point = document.createElement("h2")
point.innerText = `${points} Pts.`
let submit = document.createElement("button")
submit.innerText = "Submit Answer"
let reset = document.createElement("button")
reset.innerText = "Reset Game"
let next = document.createElement("button")
next.innerText = "Next Question"
const answerLabel = document.createElement("label")
answerLabel.setAttribute("for","answer")
answerLabel.innerHTML = "Answer:"
let answerInput = document.createElement("input")
answerInput.setAttribute("type","text")
answerInput.id = "answer"
answerInput.placeholder = "Type Your Answer Here"
let blankSpace1 = document.createElement("h6")
let blankSpace2 = document.createElement("h6")
let rules = document.getElementById("rules")

function randomQuestion(max){
    return Math.floor(Math.random()*max)
}
function storeClues(data){
    let i = 0
    while(i !== data.length){
        let testRun = randomQuestion(data.length)
        let testCheck = randomNumberArray.includes(testRun)
        if (testCheck === false){
        randomNumberArray.push(testRun)
        i++}
    }
    while(clues.length < randomNumberArray.length){
        for(let index = 0;index <randomNumberArray.length;index++){
            let dataI = randomNumberArray[index]
            clues.push(data[dataI])    
        } 
    }
    categoryTitle.innerText = `${clues[0].category.title}`
    questions.innerText = questionsText + clues[control].question     
    
}
function processClue(response) {
    let responseProcess = response.json()
    responseProcess.then(storeClues)
    
}
function getClues(data){
    category = data[0].category.id
    if(category === 79){
        questions.innerText = "Unable to retrieve category please reload page"
    } else {

    let urlClues = `https://jservice.io/api/clues/?category=`+`${category}`
    let fetchClues = fetch(urlClues)
    fetchClues.then(processClue)
    }
}
function processResponce(response){
    let responseProcess = response.json()
    responseProcess.then(getClues)
}
function getCategory(){
    const urlCategory = "https://jservice.io/api/random"
    let fetchPromise = fetch(urlCategory)
    fetchPromise.then(processResponce)
}
start.addEventListener("click",function(){
    getCategory()
    document.body.append(answerLabel)
    document.body.append(answerInput)
    document.body.append(submit)
    document.body.append(point)   
    console.log(clues)
    document.body.removeChild(start)
    document.body.replaceChild(categoryTitle,rules)
})

function nextQuestion(){
    if(control === clues.length){
        control = 0
        let categoryComplete = document.createElement("h2")
        categoryComplete.innerText = "Congragulations! You have completed the category.Please reset your game."
        document.body.replaceChild(categoryComplete,responseToAnswer)
        document.body.replaceChild(reset,next)
    }else if (control < clues.length){
        control++
    questions.innerText = questionsText + clues[control].question
    document.body.replaceChild(answerLabel,blankSpace1)
    document.body.replaceChild(answerInput,blankSpace2)
    document.body.replaceChild(submit,next)
    document.body.replaceChild(questions,responseToAnswer) 
    }
}

function correctResponse(){
    responseToAnswer.innerText = "Congratulations, you are Correct."
    document.body.replaceChild(blankSpace1,answerLabel)
    document.body.replaceChild(blankSpace2,answerInput)
    document.body.replaceChild(responseToAnswer,questions)
    document.body.replaceChild(next,submit)
    points++
    point.innerText = `${points} Pts.`
}

function incorrectResponse(){
    responseToAnswer.innerText = "I'm sorry that is incorrect. Your Points have been zeroed out. Please reset your game."
    points = 0
    point.innerText = `${points} Pts.`
    document.body.replaceChild(reset,submit)
    document.body.replaceChild(responseToAnswer,questions)
    document.body.removeChild(answerLabel)
    document.body.removeChild(answerInput)
}
function easeOfAnswer(string){
    // Figured out the .replace to for the tags from:
    // https://css-tricks.com/snippets/javascript/strip-html-tags-in-javascript/
    // which lead me to finding .replaceChild()
    removeStyleTags = string.replace(/(<([^>]+)>)/gi,"")
    finalEaseAnswer = removeStyleTags.toLowerCase()
    return finalEaseAnswer
}

function resetGame(){
    // Got this from https://www.codegrepper.com/code-examples/html/refresh+the+page+onclick+javascript
    // was having trouble getting the game to reset with out going into an infinite loop.
    location.reload()
}

function checkAnswer(){
    finalAnswer = easeOfAnswer(answerInput.value)
    correctAnswer = easeOfAnswer(clues[control].answer)
    if(finalAnswer === correctAnswer){
        document.getElementById("answer").value = ""
        correctResponse()
        
    }else 
    {
        incorrectResponse()
    } 
}

submit.addEventListener("click",function(){
    checkAnswer()
})

next.addEventListener("click",function(){
    nextQuestion()
})

reset.addEventListener("click",function(){
    resetGame()
})