/*
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle 
bombe non potranno esserci due numeri uguali.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - 
abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.Altrimenti 
la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di 
numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente 
ha cliccato su una cella che non era una bomba. */

//////////////////////////////////////////////////////////////////////////////////////////////

// Selezionare il pulsante che consentirà di visualizzare la griglia di gioco
const playButton = document.getElementById("btn");

// Selezionare il contenitore
const container = document.getElementById("grid");

// Creare un evento che al click dell'utente sul pulsante faccia visualizzare la griglia
playButton.addEventListener("click", 
    
    function () {
        // Rimuovere la griglia ed evitare che si ripeta al click del pulsante
        container.innerHTML = '';

        // Creare un array con i numeri da 1 a 100 (per i numeri visibili)
        const visibleNumbers = Array.from({ length: 100 }, (_, index) => index + 1);

        // Creare un array con i numeri da 1 a 16 (per i numeri casuali da assegnare)
        const randomNumbers = randomRange(1, 16);

        // Creare un array con gli indici delle celle disponibili (da 0 a 99)
        const availableIndices = Array.from({ length: 100 }, (_, index) => index);

        // Selezionare casualmente 16 indici dalle celle disponibili
        const randomIndices = [];
        for (let i = 0; i < 16; i++) {
            const randomIndex = randomNum(0, availableIndices.length - 1);
            randomIndices.push(availableIndices[randomIndex]);
            availableIndices.splice(randomIndex, 1); // Rimuovere l'indice selezionato per evitare ripetizioni
        }

        // Ripetere per 100 volte la procedura di creazione delle varie celle
        for (let i = 0; i < 100; i++) {
            // Creare un blocco "div" che abbia una classe "square"
            const newDiv = createElementClass("div", "square");

            // Assegnare il numero progressivo visibile a ogni cella
            newDiv.textContent = visibleNumbers[i];

            // Se l'indice corrente è tra quelli selezionati casualmente, assegnare un numero casuale
            if (randomIndices.includes(i)) {
                let randomNumber = randomNumbers.pop();
                newDiv.dataset.randomNumber = randomNumber;
            }

            // Creare un evento che fa in modo di cambiare colore alla cella al click del giocatore
            newDiv.addEventListener("click", 
                
                function () {
                    // Aggiungere la classe "clicked" e fare in modo che una cella cliccata cambi colore
                    newDiv.classList.add("clicked");

                    // Stampare in console il numero visibile della cella
                    console.log(newDiv.textContent);

                    // Stampare in console il numero casuale assegnato (che è invisibile) e cambiare colore
                    if (newDiv.dataset.randomNumber) {
                        newDiv.classList.add("bomb-square");
                        console.log(newDiv.dataset.randomNumber);
                    } else if (!newDiv.dataset.randomNumber){
                        newDiv.classList.add( "safe-square");
                    }
                }
            );

            // Inserire i blocchi con la classe nel container individuato
            container.append(newDiv);
        }
    }
);
