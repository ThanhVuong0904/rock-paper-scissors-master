const userChoice = document.querySelectorAll('.button');
const userPicked = document.getElementById("user-picked");
const housePicked = document.getElementById("house-picked");
const userPickedImage = document.getElementById("user-picked-image");
const housePickedImage = document.getElementById("house-picked-image");

const btnRules = document.querySelector(".btn-rules");
const game = document.querySelector(".game");
const gameBonus = document.querySelector(".game-bonus");
const gameStep = document.querySelector(".game-step");
const gameStepUser = document.querySelector(".game-step-user");
const gameStepHouse = document.querySelector(".game-step-computer");
const gameStepResult = document.querySelector(".game-step-result");
//score at heading
const result = document.getElementById("result");
//
const playAgain = document.querySelector(".button-playagain");
const scoreNumber = document.querySelector(".heading-score-number");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".closeModal");
const rulesImgBonus = document.querySelector(".rules-image-bonus");
const rulesImg = document.querySelector(".rules-image");
const toggleBg = document.querySelector('.toggle-bg');
const toggleCircle = document.querySelector('.toggle-circle');

let user_Choice = '';
const randomComputerChoice = ['paper', 'rock', 'scissors'];
const randomComputerChoiceBonus = ['paper', 'rock', 'scissors', 'spock', 'lizard'];

const runApp = () =>{
     toggleCircle.classList.add('left-0');
     getUserChoice();
     modalControl();
}

const getUserChoice = () =>{
     userChoice.forEach((element)=> {
          element.addEventListener('click', ()=> {
               user_Choice = element.getAttribute('data-user-choice');
               
                    gameStep.style.display = 'grid';
                    checkGameStep();
                    lockButton();
                    checkHandleLogic();
                    addEffect();
          })
     })
}
const checkToggle = () =>{
     if(toggleCircle.classList.contains('left-0')) {
          return true;
     }
     else {
          return false;
     }
}
//if have game => gamebonus hidden
//have gamebonus => game hidden
const checkGameMode = () =>{
     if(game.style.display === 'grid') {
          gameBonus.style.display = 'none';
     }
     else if(game.style.display === 'none'){
          gameBonus.style.display = 'grid';
     }
}

//if have gamestep => game or gamebonus hiden
const checkGameStep = () =>{
     if(gameStep.style.display == 'grid') {
          game.style.display = 'none';
          gameBonus.style.display = 'none';
     }
}
const checkHandleLogic = () =>{
     if(checkToggle()) {
          handleLogic();
     }
     else {
          handleLogicBonus();
     }
}
const handleToggle = () =>{
     const title = document.querySelector(".heading-title-bonus");
     //click toggle gameStep hidden
     gameStep.style.display = 'none';
     removeClass();
     removeEffect();
     if(checkToggle()) {
          //add spock, lizard
          title.style.display = 'flex';
          toggleCircle.classList.remove('left-0');
          toggleCircle.classList.add('right-0');
          // default = grid;
          game.style.display = 'none';
          rulesImgBonus.style.display = 'block';
          rulesImg.style.display = 'none';
          checkGameMode();
     }
     else {
          title.style.display = 'none';
          toggleCircle.classList.add('left-0');
          toggleCircle.classList.remove('right-0');
          game.style.display = 'grid';
          rulesImgBonus.style.display = 'none';
          rulesImg.style.display = 'block';
          checkGameMode();
     }
}

toggleBg.addEventListener('click', handleToggle);

const lockButton = ()=> {
     housePicked.setAttribute("disabled", true)
     userPicked.setAttribute("disabled", true)
}
//generator computer
const randomChoose = ()=> {
     return randomComputerChoice[Math.floor(Math.random() * randomComputerChoice.length)]
}
const randomChooseBonus = ()=> {
     return randomComputerChoiceBonus[Math.floor(Math.random() * randomComputerChoiceBonus.length)]
}

//handle paper > rock...
const handleLogic = ()=> {
     const computerRandom = randomChoose();
     
     if(user_Choice == computerRandom) {
          result.innerHTML = "DRAW";
          updateUI(computerRandom);
     }
     else if(
               user_Choice == "paper" && computerRandom == "rock" 
               || user_Choice == "rock" && computerRandom == "scissors" 
               || user_Choice == "scissors" &&computerRandom == "paper"
          ) {
          updateUI(computerRandom);
          result.innerHTML = "WIN";
          //animation rote 2s , so settimeout 2,1s
          setTimeout(()=> {
               updateScore(1);
               userPicked.classList.add('winner');
          },2100)
     }
     else {
          updateUI(computerRandom);
          result.innerHTML = "LOSE";
          //animation rote 2s , so settimeout 2,2s
          setTimeout(()=> {
               updateScore(-1);
               housePicked.classList.add('winner');
          },2200)
     }
     
}
const handleLogicBonus = ()=> {
     const computerRandomBonus = randomChooseBonus();
     if(user_Choice == computerRandomBonus) {
          result.innerHTML = "DRAW";
          updateUI(computerRandomBonus);
     }
     else if(
               user_Choice == "paper" && computerRandomBonus == "rock" 
               || user_Choice == "paper" && computerRandomBonus == "spock" 
               || user_Choice == "rock" && computerRandomBonus == "scissors" 
               || user_Choice == "rock" && computerRandomBonus == "lizard" 
               || user_Choice == "scissors" &&computerRandomBonus == "paper"
               || user_Choice == "scissors" &&computerRandomBonus == "lizard"
               || user_Choice == "lizard" && computerRandomBonus == "spock"
               || user_Choice == "lizard" && computerRandomBonus == "paper"
               || user_Choice == "spock" && computerRandomBonus == "scissors"
               || user_Choice == "spock" && computerRandomBonus == "rock"
          ) {
          updateUI(computerRandomBonus);
          result.innerHTML = "WIN";
          //animation rote 2s , so settimeout 2,1s
          setTimeout(()=> {
               updateScore(1);
               userPicked.classList.add('winner');
          },2100)
     }
     else {
          updateUI(computerRandomBonus);
          result.innerHTML = "LOSE";
          //animation rote 2s , so settimeout 2,2s
          setTimeout(()=> {
               updateScore(-1);
               housePicked.classList.add('winner');
          },2200)
     }
}

const removeClass = () =>{
     userPicked.classList.remove(`button--${user_Choice}`);
     userPickedImage.src = `./images/icon-${user_Choice}.svg`;

     housePicked.classList.remove("button--rock");
     housePicked.classList.remove("button--paper");
     housePicked.classList.remove("button--scissors");
     housePicked.classList.remove("button--lizard");
     housePicked.classList.remove("button--spock");
}

const updateUI = (randomComputer) =>{
     userPicked.classList.add(`button--${user_Choice}`);
     userPickedImage.src = `./images/icon-${user_Choice}.svg`;
     housePicked.classList.add(`button--${randomComputer}`);
     housePickedImage.src = `./images/icon-${randomComputer}.svg`;
}
//update score
let score = 0;
const updateScore = (value)=> {
     score = score + value;
     scoreNumber.innerHTML = score;
}

//open and close modal (rules)
const modalControl = ()=> {
     btnRules.addEventListener('click', ()=>{
          modal.classList.add('modal-show');
     })
     closeModal.addEventListener('click', ()=> {
          modal.classList.remove("modal-show");
     })
}
const addEffect = () => {
     setTimeout(()=>{
          housePicked.classList.remove("visible-hidden");
     },500)
     setTimeout(()=>{
          gameStepResult.classList.remove("visible-hidden");

          gameStepHouse.classList.add('grid-col-45');
          gameStepUser.classList.add('grid-col-12');
          gameStepResult.classList.add('grid-col-24');
          gameStepResult.classList.add('grid-row-12');
     },2000)
}
const removeEffect = () => {
     //add class visible hidden
     housePicked.classList.add("visible-hidden");
     gameStepResult.classList.add("visible-hidden");
     //remove effect winner
     housePicked.classList.remove("winner");
     userPicked.classList.remove("winner");

     gameStepHouse.classList.remove('grid-col-45');
     gameStepUser.classList.remove('grid-col-12');
     gameStepResult.classList.remove('grid-col-24');
     gameStepResult.classList.remove('grid-row-12');
}

playAgain.addEventListener('click', ()=> {
     if(checkToggle()) {
          gameStep.style.display = 'none';
          game.style.display = 'grid';
          checkGameMode();
          removeEffect();
          removeClass();
     }
     else {
          gameStep.style.display = 'none';
          gameBonus.style.display = 'grid';
          checkGameMode();
          removeEffect();
          removeClass();
     }
});
runApp();