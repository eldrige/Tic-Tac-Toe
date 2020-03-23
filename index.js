const cellElements = document.querySelectorAll('[data-cell]');
let circleTurn
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const board = document.getElementById('board')
const winningMessageTextElement = document.querySelector('[data-winning-msg-txt]')
const winningMessageElement = document.getElementById('winning-msg')
const restartButton = document.getElementById('restart-button')
const WINNING_COMBO = [
    [0,1,2],
    [ 3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach( cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick )
        cell.addEventListener('click', handleClick, { once: true})
       })

       setBoardHoverClass()
       winningMessageElement.classList.remove('show')
}

function handleClick(e){
//    place the mark
// check for a win or a draw
// switch tuns
const cell = e.target
const  currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
placeMark(cell, currentClass)
if (checkWin(currentClass)){
  endGame(false)
} else if(isDraw()){
    endGame(true)
} else {
    swapTurns()
    setBoardHoverClass()
}
// switching turns


}
function endGame(draw){
    if (draw){
        winningMessageTextElement.innerText =  'Draw!'
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's" } Wins!` 
    }
    winningMessageElement.classList.add('show')
}
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
function swapTurns(){
    circleTurn = !circleTurn
}
function setBoardHoverClass(){
   board.classList.remove(X_CLASS)
   board.classList.remove(CIRCLE_CLASS)
   if (circleTurn){
       board.classList.add(CIRCLE_CLASS)
   } else {
       board.classList.add(X_CLASS)
   }

}

function checkWin(currentClass){
    return WINNING_COMBO.some(combination => {
        return combination.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}