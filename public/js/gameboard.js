const backgroundAudio = new Audio('../mp3/refreshing.mp3')
const gameboard = {
    height: 5,
    width: 5,
    tiles: 5,
    trials: 1,
    score: 0,
    hitCorrect: 0,
    hitWrongTiles: 0,
    array: []
}
$().ready(function () {
    if (window.location.pathname == '/play-game') {
        backgroundAudio.play()
        initializeArray(gameboard)
        $("#scoreInput").val(gameboard.score)
        $(".score-tiles").text("TIELS " + gameboard.tiles)

        let indexArray = getIndexofCorrectCard(gameboard)
        createInitialGameBoard(gameboard, indexArray)
        setTimeout(() => {
            rotate90Degree();
        }, 2000);
        boxClick(gameboard)
    }
    if (window.location.pathname == '/summary') {
        console.log(gameboard.score)
    }

})
function initializeArray(gameboard) {
    gameboard.array = []
    for (let i = 0; i < gameboard.height * gameboard.width - gameboard.tiles; i++) {
        gameboard.array.push(0)
    }
    for (let j = 0; j < gameboard.tiles; j++) {
        gameboard.array.push(1)
    }
    gameboard.array.sort(() => Math.random() - 0.5)


}

function createInitialGameBoard(gameboard, indexArray) {
    let divRow = $('<div class="row" id="game-board-row"></div>')
    $(".score-trials").text("TRIAL " + gameboard.trials)
    $("#game-board").append(divRow.clone());
    for (let i = 0; i < gameboard.height; i++) {

        for (let j = 0; j < gameboard.width; j++) {
            let divBox = document.createElement('div')
            $(divBox).addClass("box col square")
            let indexValue = i * gameboard.width + j
            if (indexArray.includes(indexValue)) {
                $(divBox).addClass("correct-back-box")
                $(divBox).appendTo($("#game-board-row"))

            }
            else {
                $(divBox).appendTo($("#game-board-row"))

            }
        }
        $("#game-board-row").append("<div class='w-100'></div>")
    }
    showCorrectCards()
}
function showCorrectCards() {
    $(".correct-back-box").each((index, value) => {
        $(value).addClass('rightColor')
        setTimeout(function () {
            $(value).removeClass('rightColor')

        }, 1500)
    })
}
function getIndexofCorrectCard(gameboard) {
    let indexArray = []
    gameboard.array.forEach((element, index, array) => {
        if (element === 1) {
            indexArray.push(index)
        }
    });
    return indexArray
}
function rotate90Degree() {
    $("#game-board-row").animate(
        { deg: 90 },
        {
            duration: 1200,
            step: function (now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
            }
        }
    );
}
function boxClick(gameboard) {
    $(document).on('click', '.box', function () {
        if ($(this).hasClass("correct-back-box")) {
            $(this).addClass('rightColor')
            gameboard.hitCorrect++
            gameboard.score++
            $(".score-score").text("SCORE " + gameboard.score)
            $("#scoreInput").val(gameboard.score)
            if (gameboard.hitCorrect === gameboard.tiles) {
                setTimeout(() => {
                    goToNextLevel(gameboard)
                }, 1500);

            }
        } else {
            $(this).addClass('wrongColor')
            gameboard.score--
            gameboard.hitWrongTiles++
            $(".score-score").text("SCORE " + gameboard.score)
            $("#scoreInput").val(gameboard.score)
            if (gameboard.score < 1) {
                gameOver()
            }
        }
        // $(".score-score").text("SCORE " + gameboard.score)

    })
}
function goToNextLevel(gameboard) {
    backgroundAudio.play();
    let choiceN = Math.round(Math.random())
    if (gameboard.hitWrongTiles == 0) {
        switch (choiceN) {
            case 0:
                successfulClick1(gameboard)
                break;
            case 1:
                successfulClick2(gameboard)
                break;
        }
    } else {
        switch (choiceN) {
            case 0:
                wrongClick1(gameboard)
                break;
            case 1:
                wrongClick2(gameboard)
                break;
        }

    }
}
function successfulClick1(gameboard) {
    $("#game-board").empty()
    gameboard.tiles++
    $(".score-tiles").text("TIELS " + gameboard.tiles)
    gameboard.trials++

    gameboard.hitCorrect = 0
    gameboard.hitWrongTiles = 0
    initializeArray(gameboard)
    // shuffleArray(gameboard.array)
    let indexArray = getIndexofCorrectCard(gameboard)
    createInitialGameBoard(gameboard, indexArray)
    setTimeout(() => {
        rotate90Degree();
    }, 2000);
}
function successfulClick2(gameboard) {
    $("#game-board").empty()
    if (gameboard.height > gameboard.width) {
        gameboard.width++
    } else {
        gameboard.height++
    }
    $(".score-tiles").text("TIELS " + gameboard.tiles)
    gameboard.trials++
    gameboard.hitCorrect = 0
    gameboard.hitWrongTiles = 0
    initializeArray(gameboard)
    // shuffleArray(gameboard.array)
    let indexArray = getIndexofCorrectCard(gameboard)
    createInitialGameBoard(gameboard, indexArray)
    setTimeout(() => {
        rotate90Degree();
    }, 2000);
}
function wrongClick1(gameboard) {
    $("#game-board").empty()
    if (gameboard.tiles > 1) {
        gameboard.tiles--
    }
    $(".score-tiles").text("TIELS " + gameboard.tiles)
    gameboard.trials++
    gameboard.hitCorrect = 0
    gameboard.hitWrongTiles = 0
    initializeArray(gameboard)
    // shuffleArray(gameboard.array)
    let indexArray = getIndexofCorrectCard(gameboard)
    createInitialGameBoard(gameboard, indexArray)
    setTimeout(() => {
        rotate90Degree();
    }, 2000);
}
function wrongClick2(gameboard) {
    $("#game-board").empty()
    if (gameboard.height > gameboard.width) {
        gameboard.height--
    } else {
        gameboard.width--
    }
    $(".score-tiles").text("TIELS " + gameboard.tiles)
    gameboard.trials++
    gameboard.hitCorrect = 0
    gameboard.hitWrongTiles = 0
    initializeArray(gameboard)
    // shuffleArray(gameboard.array)
    let indexArray = getIndexofCorrectCard(gameboard)
    createInitialGameBoard(gameboard, indexArray)
    setTimeout(() => {
        rotate90Degree();
    }, 2000);
}

function gameOver() {
    $.ajax({
        url: "/",
        complete: function (xmlHttp) {
            alert("GAME OVER; YOUR SCORE IS 0");
            if (xmlHttp.code != 200) {
                top.location.href = '/';
            }
        }
    });
}



function gameTerminate() {
    $.ajax({
        url: "/summary",
        type: "POST",
        data: { 'score': gameboard.score },
        success: function () {
            console.log("POST Request")
        }
    })
}
function confSubmit(form) {
    if (confirm("Are you sure you want to submit the Score?")) {
        form.submit();
    }

    else {
        alert("You decided to not submit the form!");
    }
}