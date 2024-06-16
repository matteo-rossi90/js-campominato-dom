/*Aggiungere una select accanto al bottone di generazione, che fornisca una scelta 
tra tre diversi livelli di difficoltà: 
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe; 
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe; 
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle;
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste. */

//////////////////////////////////////////////////////////////////////////////////////////////

//selezionare il pulsante che consentirà di visualizzare la griglia di gioco
const playButton = document.getElementById("btn");

//selezionare il contenitore
const container = document.getElementById("grid");

//selezionare l'input che corrisponde alla scelta dell'utente
let choiceInput = document.querySelector("#choice-difficult");

//selezionare l'intestazione che raccoglierà il messaggio da comunicare se il giocatore ha perso
let messageText = document.getElementById("message-container");

// Variabile per il punteggio del giocatore
let score = 0;

// Variabile per il controllo del termine del gioco
let gameOver = false;

//Assegnare l'evento al pulsante che permetta al giocatore di visualizzare una griglia
// in base al livello di difficoltà scelto
playButton.addEventListener("click", 
    
    function () {

        // Leggere il valore corrente dell'input di difficoltà
        let game = choiceInput.value;
        console.log(game);

        // Ripristinare lo stato del gioco e il punteggio
        gameOver = false;
        score = 0;

        // Rimuovere la griglia esistente
        container.innerHTML = '';

        //cancella il testo che appare in alto se presente;
        messageText.innerHTML = '';

        //creare le condizioni affinché si possa materializzare la griglia
        //in base al livello di difficoltà scelto
        if (game === 'facile') {// se il livello è facile, si crea una griglia 10x10
            createGrid(10, "square-easy");
        } else if (game === 'medio') {// se il livello è medio, si crea una griglia 9x9
            createGrid(9, "square-medium");
        } else if (game === 'difficile') {// se il livello è difficile, si crea una griglia 7x7
            createGrid(7, "square-hard");
        }
        
    }

);

//FUNZIONI//

// Funzione per creare un elemento di markup con una classe
function createElementClass(tag, classToAdd) {

    //creare un elemento di markup
    const box = document.createElement(tag);

    //associare una classe all'elemento
    box.classList.add(classToAdd);

    return box;
};

//funzione per generare un numero random entro un range definito
function randomNum(numMin, numMax) {

    return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);

};

//funzione che genera un array con numeri randomici
function randomRange(min, max) {

    //creare un array vuoto per accogliere la sequenza di numeri
    const newArr = [];

    // generare una sequenza di numeri fino a un massimo
    while (newArr.length < max) {

        //generare un range di numeri
        let newRange = randomNum(min, max);

        //creare condizioni per evitare che il numero si raddoppi
        if ((newArr.includes(newRange) === false)) {

            //aggiungere il numero all'array
            newArr.push(newRange);
        }
    }

    return newArr

}

// Funzione per creare una griglia di dimensione specifica a cui associare 
function createGrid(size, className) {

    // calcolare il numero di celle
    let numCells = size * size;

    // Punteggio massimo per terminare il gioco
    const maxScore = numCells - 16;

    // Creare un array con i numeri delle celle
    const visibleNumbers = Array.from({ length: numCells }, (_, index) => index + 1);

    // Creare un array con i numeri da 1 a 16 (per i numeri casuali da assegnare)
    const randomNumbers = randomRange(1, 16);

    // Creare un array con gli indici delle celle disponibili
    const availableIndices = Array.from({ length: numCells }, (_, index) => index);

    // Selezionare casualmente 16 indici dalle celle disponibili
    const randomIndices = [];
    for (let i = 0; i < 16; i++) {
        const randomIndex = randomNum(0, availableIndices.length - 1);
        randomIndices.push(availableIndices[randomIndex]);
        availableIndices.splice(randomIndex, 1); // Rimuovere l'indice selezionato per evitare ripetizioni
    }

    //reiterare un numero di volte
    for (let i = 1; i <= numCells; i++) {
        const newDiv = createElementClass("div", className);

        // Assegnare il numero progressivo visibile a ogni cella
        newDiv.textContent = visibleNumbers[i];

        // Se l'indice corrente è tra quelli selezionati casualmente, assegnare un numero casuale
        if (randomIndices.includes(i)) {
            let randomNumber = randomNumbers.pop();
            newDiv.dataset.randomNumber = randomNumber;
        }

        //creare evento al click di una cella
        newDiv.addEventListener("click", 
            
            function () {

                //aggiungere la classe clicked
                newDiv.classList.add("clicked");

                // Se il gioco è già terminato, non fare nulla
                if (gameOver) return;
                // Stampare in console il numero casuale assegnato (che è invisibile), cambiare colore
                //e comunicare al giocatore se ha perso
                
                if (newDiv.dataset.randomNumber) {
                    newDiv.classList.add("bomb-square"); // Aggiunge classe per colore rosso
                    gameOver = true;
                    messageText.innerHTML = `Hai perso! Il tuo punteggio è: ${score}`;
                } else if (!newDiv.dataset.randomNumber) {

                    // Se è una cella "sicura", aumenta il punteggio e aggiorna la visualizzazione
                    newDiv.classList.add("safe-square"); // Aggiunge classe per colore verde
                    score++;
                    console.log("Punteggio attuale:", score);

                }

                // Verifica se il giocatore ha raggiunto il punteggio massimo
                if (score === maxScore) {
                    gameOver = true;
                    messageText.innerHTML = `Complimenti! Hai raggiunto il punteggio massimo di ${maxScore} punti!`
                }
                
                console.log(i);
        });

        newDiv.innerHTML = i;
        container.append(newDiv);
    }

    //impostare opacità
    container.style.opacity = 0;

    setTimeout(() => {
        container.style.transition = 'opacity 1s';
        container.style.opacity = 1;
    }, 100 * container); // Ritardare leggermente l'elemento

};
