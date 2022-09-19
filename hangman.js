const alphabetList = 'abcdefghijklmnopqrstuvwxyz'.split('');

let guesses = 10;
let arrayOfLettersGuessed = [];

fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(response => response.json())
    .then(data => {
        document.querySelector('#guesses-box').innerHTML = guesses;

        generateButtons(alphabetList);
        generateEmptySlots(String(data));

        document.querySelectorAll('button').forEach(element => {
            element.addEventListener('click', () => {
                const buttonLetter = element.innerHTML;
                letterButtonClick(buttonLetter, String(data));

        });
        
        document.onkeyup = event => {
            if (alphabetList.includes(String(event.key))) {
                const buttonLetter = String(event.key);
                if (document.getElementById(buttonLetter).disabled != true) {
                    letterButtonClick(buttonLetter, String(data));
                }
            }
        };
        
        document.querySelector('#hint-button').addEventListener('click', () => {
            displayHint(String(data));
        })
});
    })

function generateButtons(list) {
    list.forEach(letter => {
        const newButton = document.createElement('button');
        newButton.innerHTML = letter;
        newButton.id = letter;
        document.getElementById('button-container').append(newButton);
    })
}

function letterButtonClick(letter, word) {
    if (word.split('').includes(String(letter))) {

        for(let i = 0; i < word.split('').length; i++) {
            if (word.split('')[i] === String(letter)) {
                document.getElementById(String(i)).innerHTML = letter + '&nbsp;';
                arrayOfLettersGuessed.push(letter);
            }
        }

        document.getElementById(letter).disabled = true;

        if (arrayOfLettersGuessed.length === word.length) {
            disableAllButtons();
            document.getElementById('word-box').style.color = 'green';
            setTimeout(() => {
                alert(`You guessed the word!`);
            }, 200)

            setTimeout(() => {
                playAgain();
            }, 2500)
        }
    } else {
        document.querySelector('#guesses-box').innerHTML = Number(guesses) - 1;
        guesses--;

        document.getElementById(letter).className = 'disabled-red';

        document.getElementById(letter).disabled = true;

        if (guesses === 0) {
            disableAllButtons();
            document.getElementById('word-box').style.color = 'red';
            
            document.getElementById('word-box').innerHTML = '';

            for(i = 0; i < word.split('').length; i++) {
                document.getElementById('word-box').innerHTML = document.getElementById('word-box').innerHTML + word.split('')[i] + '&nbsp;';
            }

            setTimeout(() => {
                alert(`Oops! You ran out of guesses! The word was '${word}'!`);
            }, 200)

            setTimeout(() => {
                playAgain();
            }, 2500)
        }

        document.querySelector('img').src = `${10 - Number(guesses)}.png`;
    }
}

function generateEmptySlots(word) {
    const wordArray = word.split('');

    var counter = 0;
    wordArray.forEach(item => {
        const dashElement = document.createElement('span');
        dashElement.innerHTML = '_&nbsp;';
        
        dashElement.id = counter;

        document.querySelector('#word-box').append(dashElement);

        counter++;
    });
}

function disableAllButtons() {
    document.querySelectorAll('button').forEach(element => {
        element.disabled = true;
    })
}

function playAgain() {
    yesOrNo = confirm('Would you like to play again?');

    if (yesOrNo) {
        window.location.reload();
    }
}

function displayHint(word) {
    const hint = `The word begins with ${word.split('')[0]}.`
    const div = document.querySelector('#hint-div');
    div.innerHTML = hint;

    document.querySelector('#hint-button').remove();
}   
