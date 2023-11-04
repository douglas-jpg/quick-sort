// HTML elements
const cartas = document.querySelector(".array");
const range = document.querySelector(".range");
const reset = document.querySelector(".reset");
const indexs = document.querySelector(".index");

// variables to change the style with css
const delay = 700;
const pixels = 8;
const colors = {
    black: "var(--black)",
    white: "var(--white)",
    red: "var(--red)",
    orange: "var(--orange)",
    yellow: "var(--yellow)",
    green: "var(--green)",
    blue: "var(--blue)",
    purple: "var(--purple)" 
};

// card board
let cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

function createIndexs() {
    for(let i = 0; i <= 12; i++) {
        const num = document.createElement("p");
        num.textContent = i;
        indexs.appendChild(num);
    }
}

function shuffleCards(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function createCardElement(card) {
    const img = document.createElement("img");
    
    img.id = card;
    img.src = `image/${card}.png`;
    img.classList.add("card");
    return img;
}

function generateCards() {
    const shuffledCards = shuffleCards(cards);

    shuffledCards.forEach(card => {
        const cardElement = createCardElement(card);
        cartas.appendChild(cardElement);
    });
}

function styleBorder(elm, color) {
    return elm.style.border = `${pixels}px solid ${color}`;
}

function resetCardBorders(cards) {
    cards.forEach(card => {
        card.style.border = "none";
    });
}

function swapCards(card1, card2) {
    const tempSrc = card1.src;
    const tempId = card1.id;

    card1.src = card2.src;
    card1.id = card2.id;
    card2.src = tempSrc;
    card2.id = tempId;
}

async function partition(left, right, delay) {
    const allCards = document.querySelectorAll(".card");
    const pivotValue = Number(allCards[right].id);
    let i = left - 1;

    styleBorder(allCards[right], colors.red);
    range.textContent = `[${left},${right}]`;

    for(let j = left; j <= right - 1; j++) {
        const card = allCards[j];
        styleBorder(card, colors.yellow);

        await new Promise(resolve => setTimeout(resolve, delay));

        const cardValue = Number(card.id);

        if(cardValue < pivotValue){
            i++;
            swapCards(allCards[i], card);
            styleBorder(allCards[i], colors.orange);
            (i != j) ? styleBorder(card, colors.purple) : undefined;
        }else {
            styleBorder(card, colors.purple);
        }
    }

    i++;

    swapCards(allCards[i], allCards[right]);

    styleBorder(allCards[right], colors.purple);
    styleBorder(allCards[i], colors.blue);

    await new Promise(resolve => setTimeout(resolve, delay * 3));

    range.innerHTML = "";
    resetCardBorders(allCards);

    return i;
}

async function quickSort(left, right) {
    if(left < right) {
        const pivo_index = await partition(left, right, delay);
        await quickSort(left, pivo_index - 1);
        await quickSort(pivo_index + 1, right);
    }
}

generateCards();
createIndexs();

reset.addEventListener("click", () => {
    cartas.innerHTML = "";
    generateCards();
    quickSort(0, 12);
})
