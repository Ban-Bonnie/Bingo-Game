let playBtn = document.getElementById('playGame');
let roll = document.getElementById('roll');
let bingoTable = document.getElementById('bingoTable');
let inGame = false;
let isBingo = false;
let numDisplay = document.getElementById('numDisplay');
let draws = 0;
roll.disabled = true;

let usedNumbers = [0];
let tickedNumbers = [0];

let bingoCard = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, true, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Temporary Functions
function printBingoCard() {
    bingoCard.forEach(x => {
        console.log(x);
    });
}

async function bingoCombos() {
    let total = 0;

    // Check horizontal bingos
    total=0;
    for (let i = 0; i < 5; i++) {
        total = 0;
        for (let j = 0; j < 5; j++) {
            if (bingoCard[i][j] === true) {
                total += 1;
            }
        }
        if (total === 5) {
            await delay(1000);
            isBingo = true;
            console.log("You won horizontally!");
            
            

            for (let j = 0; j < 5; j++) {
                bingoTable.rows[i + 1].cells[j].classList.replace("tickedCard","bingo-won")
            }
            return;
        }
    }

    // Check vertical bingos
    total=0;
    for (let j = 0; j < 5; j++) {
        total = 0;
        for (let i = 0; i < 5; i++) {
            if (bingoCard[i][j] === true) {
                total += 1;
            }
        }
        if (total === 5) {
            await delay(1000);
            isBingo = true;
            console.log("You won vertically!");
           

            
            for (let i = 0; i < 5; i++) {
                bingoTable.rows[i + 1].cells[j].classList.replace("tickedCard","bingo-won")
            }
            return;
        }
    }
    

    
    // Check diagonal bingos
    total = 0;
    for (let i = 0; i < 5; i++) {
        if (bingoCard[i][i] === true) {
            total += 1;
        }
    }
    if (total === 5) {
        await delay(1000);
        isBingo = true;
        console.log("You won diagonally !");
        

        
        for (let i = 0; i < 5; i++) {
            bingoTable.rows[i + 1].cells[i].classList.replace("tickedCard", "bingo-won");
        }
        return;
    }

    total = 0;
    for (let i = 0; i < 5; i++) {
        if (bingoCard[i][4 - i] === true) {
            total += 1;
        }
    }
    if (total === 5) {
        await delay(1000);
        isBingo = true;
        console.log("You won diagonally!");
        

        
        for (let i = 0; i < 5; i++) {
            bingoTable.rows[i + 1].cells[4 - i].classList.replace("tickedCard", "bingo-won");
        }
        return;
    }


}

function numberGenerator(max, min) {
    let x = Math.floor(Math.random() * (max - min + 1)) + min;
    while (usedNumbers.includes(x)) {
        x = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    usedNumbers.push(x);
    return x;
}

function fetchNumber(character) {
    let min = 0;
    let max = 0;
    let randomNum = 0;
    switch (character) {
        case "B":
            min = 1;
            max = 15;
            randomNum = numberGenerator(max, min);
            return randomNum;
        case "I":
            min = 16;
            max = 30;
            randomNum = numberGenerator(max, min);
            return randomNum;
        case "N":
            min = 31;
            max = 45;
            randomNum = numberGenerator(max, min);
            return randomNum;
        case "G":
            min = 46;
            max = 60;
            randomNum = numberGenerator(max, min);
            return randomNum;
        case "O":
            min = 61;
            max = 75;
            randomNum = numberGenerator(max, min);
            return randomNum;
        default:
            console.log(`Something went wrong.. generating with letter ${character}`);
            break;
    }
}

async function generateBingoCard() {
    playBtn.disabled = true;
    //Character B
    for (let i = 1; i < 6; i++) {
        let number = fetchNumber("B");
        await delay(100); 
        bingoTable.rows[i].cells[0].textContent = number;
        bingoCard[i - 1][0] = number;
    }
    //Character I
    for (let i = 1; i < 6; i++) {
        let number = fetchNumber("I");
        await delay(100); 
        bingoTable.rows[i].cells[1].textContent = number;
        bingoCard[i - 1][1] = number;
    }
    //Character N
    for (let i = 1; i < 6; i++) {
        if (i === 3) continue;
        let number = fetchNumber("N");
        await delay(100); 
        bingoTable.rows[i].cells[2].textContent = number;
        bingoCard[i - 1][2] = number;
    }
    //Character G
    for (let i = 1; i < 6; i++) {
        let number = fetchNumber("G");
        await delay(100); 
        bingoTable.rows[i].cells[3].textContent = number;
        bingoCard[i - 1][3] = number;
    }
    //Character O
    for (let i = 1; i < 6; i++) {
        let number = fetchNumber("O");
        await delay(100); 
        bingoTable.rows[i].cells[4].textContent = number;
        bingoCard[i - 1][4] = number;
    }
    playBtn.disabled = false;
    roll.disabled = false;
}

//Roll Button Functions
function rollNumber() {
    let number = Math.floor(Math.random() * 75) + 1;
    while (tickedNumbers.includes(number)) {
        number = Math.floor(Math.random() * 75) + 1;
    }

    numDisplay.classList.replace('found-number','numDisplay') 
    numDisplay.textContent = number;
    return number;
}

function tickCard(number) {
    number = Number(number);
    let numberExistInCard = false;

    for (let i = 0; i < 5; i++) {
        if (bingoCard[i].includes(number)) {
            for (let j = 0; j < 5; j++) {
                if (bingoCard[i][j] == number) {
                    bingoCard[i][j] = true;
                    bingoTable.rows[i + 1].cells[j].classList.add("tickedCard");

                    console.log(`Number ${number} found at row ${i + 1} column ${j + 1}`);
                    numDisplay.classList.replace('numDisplay','found-number') 
                    tickedNumbers.push(number);
                    numberExistInCard = true;
                    break;
                }
            }
        }
    }

    numberExistInCard ? printBingoCard() : console.log(`Number ${number} is not in card`);
}

//Main methods(?)
playBtn.onclick = function () {
    inGame = true;
    usedNumbers = []; //reset the usedNumbers 
    generateBingoCard();
    printBingoCard();
};

roll.onclick = async function () {
    if (inGame) {
        roll.disabled = true;
        playBtn.disabled = true;


        let rolledNumber = rollNumber();
        console.log("Randomized: " + rolledNumber);
        tickCard(rolledNumber);
        await bingoCombos(); 
        draws+=1;

        if (!isBingo){
            while (!isBingo) {
                rolledNumber = rollNumber();
                console.log("Randomized: " + rolledNumber);
                tickCard(rolledNumber);
                await bingoCombos();
                await delay(500);
                draws+=1;  
            }
        }
        await delay(300);
        numDisplay.classList.replace('found-number','end-display');
        numDisplay.textContent = `Bingo with ${draws} draws`
        draws = 0;
        

    } else {
        window.alert("Please generate a card first!!");
    }
};
