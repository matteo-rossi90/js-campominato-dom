/*L’utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro 
ed emetto un messaggio in console con il numero della cella cliccata */

//////////////////////////////////////////////////////////////////////////////////////////////

//selezionare il pulsante che consentirà di visualizzare la griglia di gioco
const playButton = document.getElementById("btn");

//selezionare il contenitore
const container = document.getElementById("grid");

//creare un evento che al click dell'utente sul pulsante faccia visualizzare la griglia
playButton.addEventListener("click",
    function(){

        // Rimuovere la griglia ed evitare che si ripeta al click del pulsante
        container.innerHTML = '';

        //Ripetere per 100 volte la procedura di creazione delle varie celle
        for (let i = 1; i <= 100; i++) {

            //creare un blocco "div" che abbia una classe "square"
            const newDiv = createElementClass("div", "square");

            //creare un evento che fa in modo di cambiare colore alla cella al click del giocatore
            newDiv.addEventListener("click", 
                function(){

                    //aggiungere la classe "clicked" e fare in modo che una cella cliccata cambi colore
                    newDiv.classList.add("clicked");

                    //stampare in console il numero progressivo della cella
                    console.log(i);
                }
            );

            newDiv.innerHTML = i;

            //inserire i blocchi con la classe nel container individuato
            container.append(newDiv);


        };

    }
);