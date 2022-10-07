//Function Declareations:

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

const getValues = (inputArr) => {
    return inputArr.map((input) => {
        return input.value
    })
}


    //Global variable assignments:

const colourOptions = ["red", "green", "blue", "yellow", "magenta"];
const guessLength   = 4;    //Sets the guess length used by the majority of the document.
//This allows for dynamic updating of the page.

const infoColours   = {
    "match"     : "green",
    "present"   : "yellow",
    "wrong"     : "red",
    "hidden"    : "grey"
}

let compGuess   = selectRandomItems(colourOptions, guessLength);  //Generate computer's guess as four random items from our colours list.
//Could probably be a const? But if I ever make a non-refresh reset for this I want the dynamism

let guessCount = 0; //Number of guesses taken.


//Document selectors/constructors:

const gameControls  = document.querySelector(".game__controls");
const gameSubmit    = document.querySelector(".game__submit");

//Constructor for game inputs
//Loop runs in reverse to ensure that options appear in ascending order, witht he submit button on the end.
for (let index = guessLength; index > 0; index--) {
    gameControls.insertAdjacentHTML("afterbegin", `
<select class="game__input game__input--${index}">
</select>`)
}

const gameInputs    = document.querySelectorAll(".game__input");    //gets all the input selectors
const gameOutput    = document.querySelector(".game__output");
const gameGuess     = document.querySelectorAll("game__guess");


//Logic to ensure that user's answer can't be submitted unless it contains a valid color.
//Technically wouldn't break anything if the user could enter anything, but would let them damage their win chances.
gameInputs.forEach((gameInput) => {

    colourOptions.forEach((colour) => {
        gameInput.insertAdjacentHTML("beforeend", `
<option value="${colour}" class="">${colour}</option>`);
    })
    gameInput.addEventListener("change", () => {
        console.log(`${gameInput.classList} has been set to ${gameInput.value}`);
        if (getValues([...gameInputs])
                .every((input) => {
                    return colourOptions.includes(input);
                })
        ) {
            gameSubmit.removeAttribute("disabled");
        } else {
            gameSubmit.setAttribute("disabled", "");    //Needs a value to assign, even if said flag doesn't take values >.<
        }
    })

})

//Temporary log for cheating developers:
console.log(compGuess);

//Main program logic:

//I should probably abstract this into a function? but for something I'm only doing once it seems kinda pointless?
gameControls.addEventListener("submit", (event) => {
    event.preventDefault(); //Prevent the submit from refreshing the page.
    

    //Assign playerguess here- It's internal scope, so we don't need it anywhere else.
    let playGuess = getValues([...gameInputs]);
    

    gameOutput.insertAdjacentHTML("beforeend", `
<div class="result__repeat"></div>
<div class="result__checker"></div>`
    )

    //Assigning selectors for these.
    //Can't asign these any earlier- they call on HTML not inserted yet, and their targets dynmamically update with each call.
    const playerguessReturn     = [...document.querySelectorAll(".result__repeat")].slice(-1)[0]//Get most recent only
    const playerguessChecker    = [...document.querySelectorAll(".result__checker")].slice(-1)[0]//Ditto.
    //I'd just get [array.length-1], but they aren't assigned yet, so improvising.

    //Return feedback
    console.log(compareGuesses(compGuess, playGuess))   //temporary dev cheat.
    playGuess.forEach((guess) => {
        playerguessReturn.insertAdjacentHTML("beforeend", `
<img src="./assets/colors/${guess}.jpg">`
        )
    })
    compareGuesses(compGuess, playGuess).forEach((result) => {
        playerguessChecker.insertAdjacentHTML("beforeend", `
<img src="./assets/colors/${infoColours[result]}.jpg">`
        )
    })
    //I shoudl probably also make those functions.

    console.log(compareGuesses(compGuess, playGuess).every((result) => {
        return result === "match";
    }))
    if (compareGuesses(compGuess, playGuess).every((result) => {
        return result === "match";
    })) {
        alert("Test");
        [...gameGuess].forEach((guessObj) => {
            console.log("setting bottom of screen green")
            guessObj.src = "./assets/colors/green.jpg"
        })
    // } else {
        //However, like multiple difficulties, that will follow on from getting game fully working.
    }
})