//FUNZIONI//

//funzione per creare un elemento di markup e una classe associata
function createElementClass(tag, classToAdd) {

    //creare l'elemento blocco
    const box = document.createElement(tag);

    //aggiungere ai blocchi una classe
    box.classList.add(classToAdd);

    return box

};

//funzione per generare un numero random entro un range definito
function randomNum(numMin, numMax) {

    return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);

};

//funzione che genera un array con numeri randomici
function randomRange(min, max){

    //creare un array vuoto per accogliere la sequenza di numeri
    const newArr = [];

    // generare una sequenza di numeri fino a un massimo
    while (newArr.length < max){

        //generare un range di numeri
        let newRange = randomNum(min, max);

        //creare condizioni per evitare che il numero si raddoppi
        if((newArr.includes(newRange) === false)){

            //aggiungere il numero all'array
            newArr.push(newRange);
        }
    }

    return newArr

}