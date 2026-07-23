/* =========================================
   NAJUK XO
   COMPLETE GAME LOGIC
========================================= */


// =========================================
// GAME SCREENS
// =========================================

const passwordScreen =
    document.getElementById("passwordScreen");

const nameScreen =
    document.getElementById("nameScreen");

const modeScreen =
    document.getElementById("modeScreen");

const gameScreen =
    document.getElementById("gameScreen");


// =========================================
// PASSWORD
// =========================================

const passwordInput =
    document.getElementById("passwordInput");

const passwordBtn =
    document.getElementById("passwordBtn");

const passwordMessage =
    document.getElementById("passwordMessage");


// 🔐 GAME PASSWORD

const GAME_PASSWORD =
    "najukxo";


// =========================================
// NAME
// =========================================

const playerNameInput =
    document.getElementById("playerNameInput");

const nameBtn =
    document.getElementById("nameBtn");

const nameMessage =
    document.getElementById("nameMessage");

const welcomeText =
    document.getElementById("welcomeText");


// =========================================
// MODE BUTTONS
// =========================================

const computerModeBtn =
    document.getElementById(
        "computerModeBtn"
    );

const twoPlayerModeBtn =
    document.getElementById(
        "twoPlayerModeBtn"
    );


// =========================================
// GAME ELEMENTS
// =========================================

const cells =
    document.querySelectorAll(
        ".cell"
    );

const gameStatus =
    document.getElementById(
        "gameStatus"
    );

const playerOneLabel =
    document.getElementById(
        "playerOneLabel"
    );

const playerTwoLabel =
    document.getElementById(
        "playerTwoLabel"
    );

const playerOneScore =
    document.getElementById(
        "playerOneScore"
    );

const playerTwoScore =
    document.getElementById(
        "playerTwoScore"
    );

const resultBox =
    document.getElementById(
        "resultBox"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultMessage =
    document.getElementById(
        "resultMessage"
    );

const newGameBtn =
    document.getElementById(
        "newGameBtn"
    );


// =========================================
// GAME VARIABLES
// =========================================

let playerName =
    "";

let gameMode =
    "";

let board =
    [

        "",

        "",

        "",

        "",

        "",

        "",

        "",

        "",

        ""

    ];

let currentPlayer =
    "X";

let gameOver =
    false;


// SCORES

let playerScore =
    0;

let opponentScore =
    0;


// =========================================
// WINNING COMBINATIONS
// =========================================

const winningCombinations = [

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]

];


// =========================================
// SCREEN CHANGER
// =========================================

function showScreen(

    screen

){

    document

        .querySelectorAll(

            ".screen"

        )

        .forEach(

            item => {

                item.classList.remove(

                    "active"

                );

            }

        );


    screen.classList.add(

        "active"

    );

}


// =========================================
// PASSWORD CHECK
// =========================================

passwordBtn.addEventListener(

    "click",

    function(){

        const password =

            passwordInput.value.trim();


        if(

            password ===

            GAME_PASSWORD

        ){

            passwordMessage.textContent =

                "🔓 Access Granted!";


            passwordMessage.style.color =

                "#00ff88";


            setTimeout(

                function(){

                    showScreen(

                        nameScreen

                    );

                },

                700

            );

        }


        else{

            passwordMessage.textContent =

                "❌ Wrong password! Try again.";


            passwordMessage.style.color =

                "#ff668d";


            passwordInput.value =

                "";


            passwordInput.focus();

        }

    }

);


// =========================================
// ENTER KEY FOR PASSWORD
// =========================================

passwordInput.addEventListener(

    "keydown",

    function(

        event

    ){

        if(

            event.key ===

            "Enter"

        ){

            passwordBtn.click();

        }

    }

);


// =========================================
// NAME SUBMIT
// =========================================

nameBtn.addEventListener(

    "click",

    function(){

        const enteredName =

            playerNameInput.value.trim();


        if(

            enteredName ===

            ""

        ){

            nameMessage.textContent =

                "Please enter your name 😊";


            return;

        }


        playerName =

            enteredName;


        welcomeText.textContent =

            `Welcome, ${playerName}! Choose your mode 🎮`;


        showScreen(

            modeScreen

        );

    }

);


// =========================================
// COMPUTER MODE
// =========================================

computerModeBtn.addEventListener(

    "click",

    function(){

        gameMode =

            "computer";


        playerOneLabel.textContent =

            `${playerName} ❌`;


        playerTwoLabel.textContent =

            "Shubham ⭕";


        startGame();

    }

);


// =========================================
// TWO PLAYER MODE
// =========================================

twoPlayerModeBtn.addEventListener(

    "click",

    function(){

        gameMode =

            "twoPlayer";


        playerOneLabel.textContent =

            `${playerName} ❌`;


        playerTwoLabel.textContent =

            "Player 2 ⭕";


        startGame();

    }

);


// =========================================
// START GAME
// =========================================

function startGame(){

    showScreen(

        gameScreen

    );


    resetBoard();


    gameStatus.textContent =

        `${playerName}'s Turn ❌`;

}


// =========================================
// CELL CLICK
// =========================================

cells.forEach(

    function(

        cell

    ){

        cell.addEventListener(

            "click",

            function(){

                const index =

                    Number(

                        this.dataset.index

                    );


                if(

                    board[index] !==

                    ""

                    ||

                    gameOver

                ){

                    return;

                }


                if(

                    gameMode ===

                    "computer"

                    &&

                    currentPlayer !==

                    "X"

                ){

                    return;

                }


                makeMove(

                    index,

                    currentPlayer

                );


                const result =

                    checkWinner();


                if(

                    result

                ){

                    finishGame(

                        result

                    );


                    return;

                }


                switchTurn();


                if(

                    gameMode ===

                    "computer"

                    &&

                    currentPlayer ===

                    "O"

                    &&

                    !gameOver

                ){

                    gameStatus.textContent =

                        "Shubham is thinking... 🤔";


                    setTimeout(

                        computerMove,

                        600

                    );

                }

            }

        );

    }

);


// =========================================
// MAKE MOVE
// =========================================

function makeMove(

    index,

    player

){

    board[index] =

        player;


    cells[index].textContent =

        player;


    cells[index].classList.add(

        player ===

        "X"

            ?

        "x"

            :

        "o"

    );

}


// =========================================
// SWITCH TURN
// =========================================

function switchTurn(){

    currentPlayer =

        currentPlayer ===

        "X"

            ?

        "O"

            :

        "X";


    if(

        gameMode ===

        "computer"

    ){

        gameStatus.textContent =

            currentPlayer ===

            "X"

                ?

            `${playerName}'s Turn ❌`

                :

            "Shubham's Turn ⭕`;

    }


    else{

        gameStatus.textContent =

            currentPlayer ===

            "X"

                ?

            `${playerName}'s Turn ❌`

                :

            "Player 2's Turn ⭕`;

    }

}


// =========================================
// CHECK WINNER
// =========================================

function checkWinner(){

    for(

        const combination

        of

        winningCombinations

    ){

        const a =

            combination[0];


        const b =

            combination[1];


        const c =

            combination[2];


        if(

            board[a]

            &&

            board[a] ===

            board[b]

            &&

            board[a] ===

            board[c]

        ){

            cells[a].classList.add(

                "winner"

            );


            cells[b].classList.add(

                "winner"

            );


            cells[c].classList.add(

                "winner"

            );


            return board[a];

        }

    }


    if(

        board.every(

            cell =>

                cell !==

                ""

        )

    ){

        return "draw";

    }


    return null;

}


// =========================================
// FINISH GAME
// =========================================

function finishGame(

    winner

){

    gameOver =

        true;


    resultBox.classList.add(

        "show"

    );


    if(

        winner ===

        "X"

    ){

        playerScore++;


        playerOneScore.textContent =

            playerScore;


        resultTitle.textContent =

            `🎉 WOW ${playerName.toUpperCase()}, YOU WIN! 🏆`;


        resultMessage.textContent =

            "Amazing! You played beautifully ✨";

    }


    else if(

        winner ===

        "O"

    ){

        opponentScore++;


        playerTwoScore.textContent =

            opponentScore;


        resultTitle.textContent =

            "😄 WOW, YOU LOSE!";


        resultMessage.textContent =

            `🏆 SHUBHAM WINS! 🔥`;

    }


    else{

        resultTitle.textContent =

            "🤝 IT'S A DRAW!";


        resultMessage.textContent =

            "Both played amazingly! Try again 😄";

    }

}


// =========================================
// COMPUTER AI
// =========================================

function computerMove(){

    if(

        gameOver

    ){

        return;

    }


    const emptyCells =

        board

            .map(

                (

                    value,

                    index

                ) =>

                    value ===

                    ""

                        ?

                    index

                        :

                    null

            )

            .filter(

                index =>

                    index !==

                    null

            );


    if(

        emptyCells.length ===

        0

    ){

        return;

    }


    let selectedIndex;


    // TRY TO WIN

    selectedIndex =

        findWinningMove(

            "O"

        );


    // BLOCK PLAYER

    if(

        selectedIndex ===

        null

    ){

        selectedIndex =

            findWinningMove(

                "X"

            );

    }


    // CENTER

    if(

        selectedIndex ===

        null

        &&

        board[4] ===

        ""

    ){

        selectedIndex =

            4;

    }


    // RANDOM MOVE

    if(

        selectedIndex ===

        null

    ){

        selectedIndex =

            emptyCells[

                Math.floor(

                    Math.random()

                    *

                    emptyCells.length

                )

            ];

    }


    makeMove(

        selectedIndex,

        "O"

    );


    const result =

        checkWinner();


    if(

        result

    ){

        finishGame(

            result

        );


        return;

    }


    switchTurn();

}


// =========================================
// FIND WINNING MOVE
// =========================================

function findWinningMove(

    player

){

    for(

        const combination

        of

        winningCombinations

    ){

        const values =

            combination.map(

                index =>

                    board[index]

            );


        const playerCount =

            values.filter(

                value =>

                    value ===

                    player

            ).length;


        const emptyIndex =

            combination.find(

                index =>

                    board[index] ===

                    ""

            );


        if(

            playerCount ===

            2

            &&

            emptyIndex !==

            undefined

        ){

            return emptyIndex;

        }

    }


    return null;

}


// =========================================
// NEW GAME
// =========================================

newGameBtn.addEventListener(

    "click",

    function(){

        resultBox.classList.remove(

            "show"

        );


        resetBoard();

    }

);


// =========================================
// RESET BOARD
// =========================================

function resetBoard(){

    board =

        [

            "",

            "",

            "",

            "",

            "",

            "",

            "",

            "",

            ""

        ];


    currentPlayer =

        "X";


    gameOver =

        false;


    cells.forEach(

        function(

            cell

        ){

            cell.textContent =

                "";


            cell.classList.remove(

                "x",

                "o",

                "winner"

            );

        }

    );


    gameStatus.textContent =

        `${playerName}'s Turn ❌`;

}
