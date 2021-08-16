const clues = []
let category
let cluesCount 
let everything = []
let categoryTitle = []
let points = 0

let title = document.createElement("h1")
title.innerText = "Lightning Round Trivia"
document.body.append(title)

let text = document.createElement("h3")
text.innerText ="This is a lightning round trivia game. You will\n"+
"be asked questions from a specific category. Every \n"+
"correct answer will give you 1 point. An incorrect \n"+
"answer will result in a loss of all points and a reset \n"+
"of the game."
document.body.append(text)



function randomQuestion(max){
    return Math.floor(Math.random()*max)
}

function storeClues(data){
    console.log(data)
    let i = 0
    while(i !== data.length){
        let testRun = randomQuestion(data.length)
        // console.log(testRun)
        let testCheck = everything.includes(testRun)
        if (testCheck === false){
        everything.push(testRun)
        console.log(everything)
        i++}
    }
    while(clues.length < everything.length){
        let control = 0
        for(let index = 0;index <everything.length;index++){
            let dataI = everything[index]
            clues.push(data[dataI])    
            // console.log(clues)
            
        } 
    }
         
        
    console.log(clues)
    spawnQuestion(clues)
}
    

function processClue(response) {
    let responseProcess = response.json()
    responseProcess.then(storeClues)
    
}

function storeCategory(data){
    console.log(data)
}

function processCategory(response){
    let responseProcess = response.json()
    responseProcess.then(storeCategory)
}

function getClues(data){
    category = data[0].category.id
    categoryTitle = data[0].category.title
    console.log(data)
    console.log(category)
    console.log(categoryTitle)
    let urlClues = `https://jservice.io/api/clues/?category=`+`${category}`
    console.log(urlClues)
    let fetchClues = fetch(urlClues)
    fetchClues.then(processClue)
    let categoryTest = "https://jservice.io/api/category/?id=" + category
    let fetchCategory = fetch(categoryTest)
    fetchCategory.then(processCategory)
    
}


function processResponce(response){
    let responseProcess = response.json()
    responseProcess.then(getClues)
}

function getCategory(){
    const urlCategory = "https://jservice.io/api/random"
    console.log(urlCategory)
    let fetchPromise = fetch(urlCategory)
    fetchPromise.then(processResponce)
    
}

getCategory()

function spawnQuestion(data) {
    let control = 0
    let questionLabel = "Question:"
    let questions = document.createElement("h4")
    questions.innerHTML = `<br>${questionLabel}</br>` + data[control].question
    console.log(clues)
    document.body.append(questions)
    let answerLabel = document.createElement("label")
    answerLabel.innerText = "Answer:"
    document.body.append(answerLabel)
    var answerInput = document.createElement("input")
    answerInput.setAttribute("type","text")
    answerInput.setAttribute("placeholder","Answer here")
    answerInput.id = "answerValue"
    let answerValue = answerInput.value
    document.body.append(answerInput)
    var submitButton = document.createElement("button")
    submitButton.id = "submitButton"
    submitButton.innerText = "Submit Answer"
    document.body.append(submitButton)
    function checkAnswer(){
        if(answerValue === clues.answer){
            var correctResponse = document.createElement("h4")
            correctResponse.innerText()
            document.append(correctResponse)
            control++
        }
    }
    submitButton.addEventListener("click", checkAnswer())
}



