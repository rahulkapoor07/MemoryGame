const colors = ["red", "blue", "green", "orange", "purple", "red", "blue", "green", "orange", "purple"];
const allDiv = document.getElementById('game');
const finalScore = document.querySelector('h3');
const newGameBtn = document.querySelector('button');
let card1 = null;
let card2 = null;
let flipped = false;
let cardFlipped = 0;
let score = 0;

function shuffle(array){
    let counter = array.length;

    while (counter > 0){
        let randomNum = Math.floor(Math.random() * (counter));
        counter --;
        let temp = array[randomNum];
        array[randomNum] = array[counter];
        array[counter] = temp;
    }
    return array;
}

let shuffledColors = shuffle(colors);

function createDivs(arr){
    for (let color of arr){
        const newDiv = document.createElement('div');
        newDiv.classList.add(color);
        newDiv.addEventListener('click', gotClicked);
        allDiv.appendChild(newDiv);
    }
}

function gotClicked(e){
    if (flipped) return;
    if (e.target.classList.contains('flip')) return;
    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.className;

    if(!flipped){
        score += 1;
        currentCard.classList.add('flip');
        card1 = card1 || currentCard;
        card2 = card1 === currentCard ? null : currentCard;
    }

    if (card1 && card2){
        flipped = true;
        let gif1 = card1.className;
        let gif2 = card2.className;
        if(gif1===gif2){
            cardFlipped += 2;
            card1.removeEventListener('click', gotClicked);
            card2.removeEventListener('click', gotClicked);
            card1 = null;
            card2 = null;
            flipped = false;
        }else{
            setTimeout(function(){
                card1.style.backgroundColor = "";
                card2.style.backgroundColor = "";
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                card1 = null;
                card2 = null;
                flipped = false;
            }, 800);
        }
    }
    if(cardFlipped === colors.length){ 
        finalScore.textContent = `Final Score: ${score}`;
    }
}

newGameBtn.addEventListener('click', refreshPage);

function refreshPage(){
    window.location.reload();
}
    

createDivs(shuffledColors);
