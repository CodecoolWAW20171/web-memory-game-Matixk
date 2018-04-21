var deck = {
    1: "fas fa-code",
    2: "fas fa-code-branch",
    3: "fas fa-coffee",
    4: "fas fa-file-code",
    5: "fas fa-filter",
    6: "fas fa-fire-extinguisher",
    7: "fas fa-keyboard",
    8: "fas fa-microchip",
    9: "fas fa-qrcode",
    10: "fas fa-shield-alt",
    11: "fas fa-sitemap",
    12: "fas fa-user-secret",
    13: "fas fa-database",
    14: "fas fa-desktop",
    15: "fas fa-headphones",
    16: "fas fa-mobile-alt",
    17: "fas fa-plug",
    18: "fas fa-power-off",
    19: "fas fa-globe",
    20: "fas fa-comment-dots",
    21: "fas fa-poo",
    22: "fas fa-video",
    23: "fas fa-at",
    24: "fas fa-bluetooth",
    25: "fas fa-microphone",
    26: "fas fa-rss-square",
    27: "fas fa-wifi",
    28: "fas fa-eye",
    29: "fas fa-cloud-download-alt",
    30: "fas fa-gamepad",
    31: "fas fa-flag-checkered",
    32: "fas fa-key"
};


function shuffleDeck(array) {
    // https://bost.ocks.org/mike/shuffle/
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
  }

  return array;
}


function generateCard() {
    return Math.floor((Math.random() * 32) + 1);
}


function getCards(x, y) {
    var howManyCards = (x * y) / 2;
    var result = [];

    for(let i = 0; i < howManyCards; i++){
        let card = generateCard();
        
        while (result.indexOf(deck[card]) != -1)
            card = generateCard();
        result.push(deck[card]);
        result.push(deck[card]);
    }
    return result;
}


function setDeck() {
    var x = parseInt(document.getElementById("x").value);
    var y = parseInt(document.getElementById("y").value);
    var cards = shuffleDeck(getCards(x, y));
    var index = 0;

    for(let row = 0; row < x; row++)
        for(let column = 0; column < y; column++) {
            document.getElementById(String(row) + ", " + String(column)).lastElementChild.classList = cards[index];
            index++;
        }
}


function showCard(card) {
    card.firstElementChild.style.display = 'none';
    card.lastElementChild.style.display = 'block';
}


function hideCard(card) {
    card.firstElementChild.style.display = 'block';
    card.lastElementChild.style.display = 'none';
}


function game() {
    setDeck()
    var cards = document.querySelectorAll(".card")
    var move = 0, firstCard;
    var remainingMoves = (parseInt(document.getElementById("x").value) * parseInt(document.getElementById("y").value)) / 2;
    
    cards.forEach(function(card) {
        card.addEventListener("click", function() {
            if (move == 0) {
                move = !move;
                showCard(card);
                firstCard = card;
            }
            else if (move == 1)
                if (card != firstCard) {
                    move = 2;
                    showCard(card)
                    if (card.lastElementChild.className == firstCard.lastElementChild.className) {
                        card.lastElementChild.style.color = 'green';
                        firstCard.lastElementChild.style.color = 'green';
                        move = 0;
                        remainingMoves--;
                        if (remainingMoves == 0) {
                            alert("YOU WIN!")
                        }
                    }
                    else {
                        setTimeout(function(){
                            hideCard(card)
                            hideCard(firstCard)
                            move = 0;
                        }, 1500);
                    }
                }
            
        });
    });

    
}


document.addEventListener("DOMContentLoaded", function() {

    if (document.getElementsByClassName("board")) {
        game();
    }
});