

let compGuess   = ["red", "green", "blue", "yellow"];
let playGuess   = ["red", "yellow", "white", "green"];


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
            resultArr.push("Match");
        } else if (com_guess.includes(plr_guess[index])) {
            resultArr.push("present");
        } else {
            resultArr.push("wrong");
        }
    }
    return resultArr;
}

console.log(compareGuesses(compGuess, playGuess));