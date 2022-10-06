
const colourOptions = ["red", "green", "blue", "yellow", "magenta"];

/**
 * Returns a random in between 0 and the int provided(Exclusive)
 * @param {int} max 
 * @returns int
 */
const getRandomInt = (max = 1) => {
    return Math.floor(Math.random() * max);
}

/**
 * an impure wrapperfunction for getRandomInt to keep array generation from becoming arbitrarily long.
 * Hopefully there's a better way.
 * @param {iterable} inputArr 
 * @param {int} max 
 * @returns iterable
 */
const selectRandomItems = (inputArr, max=1) => {
    const resultArr = []

    for (let index = 0; index < max; index++) {
        resultArr.push(inputArr[getRandomInt(inputArr.length)]);
    }
    return resultArr;
}


// let compGuess   = ["red", "green", "blue", "yellow"];
// let playGuess   = ["red", "green", "blue", "yellow"];

let compGuess   = selectRandomItems(colourOptions, 4);  //Generate computer's guess as four random items from our colours list.
//I made this relatively flexible, should be able to handle increased or decreased ranges.

let playGuess   = [...compGuess]; //current just globlising a default player guess, but later we'll get this as an input.


//Document selectors:
const gameInputs    = document.querySelectorAll(".game__input");    //gets all the input selectors



/**
 * takes in two iterables of equal length and returns an iterable containing data about the seocnd list compared to the first.
 * items present in both with the same index are tagged "match"
 * Items present in both lists but with differe indeces are tagged "present"
 * items not present in both lists are tagged "wrong"
 * @param {iterable} com_guess 
 * @param {iterable} plr_guess 
 * @returns iterable
 * @error   false
 */
const compareGuesses    = (com_guess, plr_guess) => {
    if (com_guess.length != plr_guess.length) {
        console.error("Error, Guesses are not of equal length");
        return false;
    }

    const resultArr = [];

    //Sure there's a better way of doing this but...
    for (let index = 0; index < com_guess.length; index++) {
        if (com_guess[index] === plr_guess[index]) {
            resultArr.push("match");
        } else if (com_guess.includes(plr_guess[index])) {
            resultArr.push("present");
        } else {
            resultArr.push("wrong");
        }
    }
    return resultArr;
}

console.log(compareGuesses(compGuess, playGuess));


//Testing every as a win condition checker.
console.log(compareGuesses(compGuess, playGuess).every((current) => {
    return current === "match"
}));
//function isn't Pure, but it does work.
// Might query some help on arry.every()


console.log(compGuess);

//Test to see if we can assign options to the existing selects.
gameInputs.forEach((gameInput) => {
    gameInput.insertAdjacentHTML("beforeend", `
    <option value="blue" class="only__option">Blue</option>`)
})

//further test to see if inserted HTML merges with existing to allow return calls.
gameInputs[0].addEventListener("change", (event) => {
    console.log(gameInputs[0].value);
})
//Surprise! it does. that's good.