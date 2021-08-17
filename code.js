const clues = []
const answered = []
let cluesCount 
let everything = []
let categoryTitle = []
let points = 0
let control = 0

let submit = document.getElementById("submitButton")

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
        // console.log(everything)
        i++}
    }
    while(clues.length < everything.length){
        for(let index = 0;index <everything.length;index++){
            let dataI = everything[index]
            clues.push(data[dataI])    
            // console.log(clues)
            
        } 
    }
         
        
    console.log(clues)
    spawnQuestion()
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
let questionLabel = "Question:"

function spawnQuestion() {
    const questions = document.getElementById("questions")
    questions.innerText = `${questionLabel}\n` + clues[control].question
    

}

function correctResponse(){
    const responseCorrect = document.createElement("h4")
        responseCorrect.innerHTML = "Congratulations, you are Correct."
        document.append(correctResponse)
}

function reset(){
    point.innerText = "0 Pts."
    getCategory()
}
function checkAnswer(answerValue){
    
    
    const point = document.getElementById("points")
    answerValue = document.getElementById("answer").value
    answered.push(answerValue)
    if(answerValue === clues[control].answer){
        control++
        points++
        let pointsText = `${points} Pts.`
        point.innerText = pointsText
        console.log(answerValue)
        console.log(points)
        console.log(control)
        questions.innerText = `${questionLabel}\n ${clues[control].question}`
        document.getElementById("answer").value = ""
    } else if (answerValue !== clues[control].answer) {
        points--
        control--
        console.log(points)
        console.log(control)

    }
    // console.log(answered)
}
console.log(answered)
submit.addEventListener("click",function(){
    checkAnswer()
})
console.log(clues)