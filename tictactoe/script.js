console.log("welcome to tictactoe")
let music=new Audio("ali.mp3")
let turn=new Audio("sastomutu.mp3")
let gameover=new Audio("najik.mp3")
let turn="X"

//function to change the turn
const changeTurn =()=>//
{
  return turn ==="X"?"0":"X" //if x ko turn vayana 0 put otherwise x
}
//function to check for a win
const checkWin= ()=>{
  let boxtexts=document.getElementsByClassName('boxtext');
  let wins=[
    [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
  ]
wins.forEach(e=>{
  if(boxtext[e[0]].innerText===boxtext[e[1]].innerText)&&(boxtext[e[2]].innerText)&&(boxtext[e[0]].innerText===))
  document.querySelector('.info').innerText=boxtext[e[0]].innerText +"win"
}
//Game logic
let boxes=document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
  let boxtext=element.querySelector('.boxtext');
  element.addEventListener('click',()=>{
    if(boxtext.innerText===''){
      boxtext.innerText = turn;
      turn=changeTurn();
      audioTurn.play();
      checkWin();
      document.getElementsByClassName("info")[0].innerText="Turn for" +turn;

    }
  })
})
