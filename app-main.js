

let compGuess   = ["red", "green", "blue", "yellow"];
let playGuess   = ["red", "green", "blue", "yellow"];


const compareGuesses    = (com_guess, plr_guess) => {
    if (com_guess.length != plr_guess.length) {
        console.error("Error, Guesses are not of equal length");
        return false;
    }

    //Sure there's a better way of doing this but...
    for (let index = 0; index < com_guess.length; index++) {
        if (com_guess[index] !== plr_guess[index]) {
            return false;
        }
    }
    return true;
}

console.log(compareGuesses(compGuess, playGuess));