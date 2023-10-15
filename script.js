
    function Game(level,lives) {
        this.level = level;
        this.potolok = 2 ** level * 50;
        this.secret = Math.round(Math.random() * this.potolok);
        this.lives = lives;
        this.dogadka = function (userNumber) {
            if (this.lives === 0) {
                this.lives -= 1;
                return "Жизни закончились, вы проиграли!" // проиграл
            }
            if (userNumber > this.secret) {
                this.lives -= 1; // меньше
                return "Число "+userNumber+ " больше загаданного";
            }
            if (userNumber < this.secret) {
                this.lives -= 1; // больше
                return "Число "+userNumber+ " меньше загаданного";
            }
            if (userNumber == this.secret) {
                this.levelUp();
                return "Угадал!" ;
                // переход на новый уровень
            }
        };
        this.levelUp = function () {
            this.level+=1;
            this.potolok*=2;
            this.secret = Math.round(Math.random() * this.potolok);
            this.lives +=10;
        }
    }

    let newGame=document.getElementById("newGame");
    let buttonGo=document.getElementById("go");
    let logs=document.querySelector(".logs");
    let help=document.querySelector(".help");
    let scores=document.getElementById("scores");
    let panel=document.getElementsByClassName('panel')[0];

    newGame.addEventListener('click', startGame);
    buttonGo.addEventListener('click', nextMove);

    let minimumNumber = document.getElementById('smallNumber');
    let maximumNumber = document.getElementById('maxNumber');

    function refreshNumbers (){
        let lvl=document.getElementById('lvl').innerHTML = player1.level;
        let tries=document.getElementById('tries').innerHTML = player1.lives+1;
        let max=document.getElementById('max').innerHTML = player1.potolok;
    }

    let player1=new Game(1,9);

    let lessNumbers = [0];
    let highNumbers = [player1.potolok];

    function returnStartingPosition() {
        lessNumbers = [0];
        highNumbers = [player1.potolok];
        minimumNumber.innerHTML = lessNumbers[0];
        maximumNumber.innerHTML = highNumbers[0];
    }

    function startGame() {
        returnStartingPosition();
        logs.innerHTML='';
        setTimeout(logs.innerHTML='Игра началась!<br>', 500);
        this.style.display='none';   //кнопка "Новая игра" скрывается
        help.style.display='none';
        panel.style.display = 'block';
        buttonGo.disabled = false;
        refreshNumbers ();
    }

    function nextMove() {
        refreshNumbers();
        let guess = document.getElementById('guess').value;
        if (player1.secret == guess) {
            buttonGo.disabled = true;
            setTimeout(function () {buttonGo.disabled = false}, 2000);
            setTimeout(refreshNumbers, 2000);
            setTimeout(logs.innerHTML = "", 2000);
            scores.innerHTML = Number(scores.innerHTML) + player1.level * player1.lives;
            setTimeout(returnStartingPosition, 2000);
        }
        else {
            player1.secret > guess ? lessNumbers.push(guess) : highNumbers.push(guess);
             minimumNumber.innerHTML = lessNumbers.sort(function(a, b) {
                return b - a;
            })[0];
             maximumNumber.innerHTML = highNumbers.sort(function(a, b) {
                return a - b;
            })[0];
        }
        logs.innerHTML += player1.dogadka(guess) + "<br>";
        finalResult(player1);
    }

    function finalResult(player) {
        if (player.lives === -1) {
            buttonGo.disabled = true;
            logs.innerHTML = '<div class="loose">' + "Вы проиграли! <br> Ваш результат: " + scores.innerHTML + " очков" + '</div>';
            newGame.style.display = 'block';
            player1 = new Game(1, 9);
            refreshNumbers();
        }
        if (player.level === 5) {
            buttonGo.disabled = true;
            logs.innerHTML = '<div class="win">' + "Вы выиграли! <br> Ваш результат: " + scores.innerHTML + " очков" + '</div>';
            newGame.style.display = 'block';
            player1 = new Game(1, 9);
            refreshNumbers();
        }
    }


// function changeColors(element, colorRule, initialHue, timeout) {
//     setInterval(() => element.style[colorRule] = `hsl(${++initialHue % 360},100%,50%)`, timeout)
// }
//
// changeColors(panel, "background", 0, 100)
