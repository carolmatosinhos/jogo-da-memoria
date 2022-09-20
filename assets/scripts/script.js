const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";

let techs = ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'];


let cards = null;

startGame();

function startGame() {
    cards = createCardsFromTechs(techs);
    shuffleCards(cards);
    initilizeCards(cards);
}

function initilizeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");

    cards.forEach(card => {
        let cardElement = document.createElement('div'); //criando o elemento
        cardElement.id = card.id;
        cardElement.classList.add(CARD); //adicionando a classe card
        cardElement.dataset.icon = card.icon; //verificando se os ícones são iguais

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipcard);
        gameBoard.appendChild(cardElement); //adicionando as cartas ao tabuleiro 

    })
}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace)
}

function shuffleCards(cards) {
    let currentIndex = cards.length;
    let randomIndex = 0;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]; //invertendo valores
    }
}

createCardsFromTechs(techs);
function createCardsFromTechs(techs) { //criando uma carta para cada tech
    let cards = [];
    techs.forEach((tech) => { //loop de um array
        cards.push(createPairFromTech(tech));
    })

    return cards.flatMap(pair => pair);
}

function createPairFromTech(tech) {
    return [{
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false,
    }, {
        id: createIdWithTech(tech),
        icon: tech,
        flipped: false,
    }]
}

function createIdWithTech(tech) {
    return tech + parseInt(Math.random() * 1000);
}

function flipcard() {
this.classList.add("flip");
}