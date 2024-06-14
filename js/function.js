//FUNZIONI//

//funzione per creare un elemento di markup e una classe associata
function createElementClass(tag, classToAdd) {

    //creare l'elemento blocco
    const box = document.createElement(tag);

    //aggiungere ai blocchi una classe
    box.classList.add(classToAdd);

    return box;

};

//funzione per generare un numero random entro un range definito
function randomNum(numMin, numMmax) {

    return Math.floor(Math.random() * (numMmax - numMin + 1) + numMin);

}