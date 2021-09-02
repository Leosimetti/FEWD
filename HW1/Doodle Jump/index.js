const bgm = new Audio("https://cdnfiles.cc/dl/T1hZbE1GdWY4aWdqYmZzaFh5QnU3dz/sussy-baka-among-us-remix_(muzi.mobi).mp3")
new Audio("jump.mp3");
const gmOvr = new Audio("game_over.mp3")
const playArea = document.getElementById("play-space")
const play = document.getElementById("play")
const score = document.getElementById("score")

let win = new Audio('https://www.myinstants.com/media/sounds/street-fighter-ii-you-win-perfect.mp3')
const playAreaWidth = 400
const playAreaHeight = 750
const platformW = 50
const platformH = 10


let GOAL = 30
let doodler = null
let platforms = []

class Base {
    element

    x() {
        return Number(this.element.style.left.replace("px", ''))
    }

    y() {
        return Number(this.element.style.bottom.replace("px", ''))
    }

    width() {
        return Number(this.element.style.width.replace("px", ""))
    }

    height() {
        return Number(this.element.style.height.replace("px", ''))
    }

    move(x = this.x(), y = this.y()) {
        this.element.style.left = x + "px"
        this.element.style.bottom = y + "px"
    }
}

class Platform extends Base {

    kill() {
        let idx = platforms.indexOf(this)
        this.element.remove()

        platforms.splice(idx, 1)
    }

    constructor(maxX, maxY, width = platformW, minY = 0) {
        super();
        let platform = document.createElement("div")
        platform.className = "platform"
        platform.style.position = "absolute"
        platform.style.backgroundColor = "green"
        platform.style.width = width + "px"
        platform.style.height = platformH + "px"
        playArea.appendChild(platform)

        platform.style.left = Math.round(Math.random() * maxX) + "px"

        platform.style.bottom = Math.round(Math.min(minY + Math.random() * maxY, playAreaHeight - 20)) + "px"

        this.element = platform
        this.touches = 0
    }

    shift() {
        this.move(undefined, this.y() - doodler.y()/playAreaHeight)
    }
}


class Doodler extends Base {
    element = document.getElementById("doodle")
    verticalSpeed = -1
    counter
    fallCounter

    die() {
        this.element.style.left = 0 + "px"
        this.element.style.bottom = 0 + "px"
        clearInterval(this.counter)
        clearInterval(this.fallCounter)
    }

    width() {
        return 50
    }

    height() {
        return 60
    }


    constructor() {
        super();
        doodler = document.getElementById("doodle")

        //Reset player
        this.element.style.left = 0 + "px"
        this.element.style.bottom = 0 + "px"

        this.counter = setInterval(() => {
            platforms.forEach((plt) => {

                // Check if it is too late
                if (this.y() < 0) {
                    gameOver()
                }

                // Moving platforms down
                if (this.y() > playAreaHeight / 2) {
                    plt.shift()
                    if (plt.y() < 0) {
                        plt.kill()
                        if (Math.random() < 0.8)
                            platforms.push(new Platform(playAreaWidth - platformW, playAreaHeight - platformH, undefined,playAreaHeight))
                    }
                }

                if (Math.round(plt.y()) === Math.round(doodler.y())
                    && doodler.x() + doodler.width() >= plt.x()
                    && doodler.x() <= (plt.x() + plt.width())
                    && this.verticalSpeed === -1
                ) {
                    clearInterval(this.fallCounter)

                    if (!plt.touches) {
                        score.innerText = Number(score.innerText) + 1
                    }
                    else if (plt.touches >= 3){
                        plt.kill()
                    }
                    plt.touches += 1

                    if (score.innerText >= GOAL){
                        WIN()
                    }

                    this.fallCounter = setInterval(() => {
                        doodler.verticalSpeed = -1
                    }, 666)

                    doodler.move(undefined, plt.y())
                    doodler.verticalSpeed = 1
                    frt.play()
                }
            })
            doodler.move(undefined, doodler.y() + this.verticalSpeed)
        }, 1)

        this.fallCounter = setInterval(() => {
            doodler.verticalSpeed = -1
        }, 666)

    }

}


function AMOGUS() {
    let sass = []
    for (let i = 0; i < 42; i++) {
        let a = new Audio("https://www.myinstants.com/media/sounds/videoplayback-1_x1pB5fF.mp3");
        sass.push(a)
    }

    sass.map((x) => {
            x.play()
            setTimeout(function () {
                    x.pause();
                    x.remove();
                },
                1500);
        }
    )
}

function WIN(){
    let winBGM = new Audio('https://vgmsite.com/soundtracks/among-us/deksrllriy/Victory%20Impostor.mp3')
    win.play()
    bgm.pause()
    winBGM.play()

    clearInterval(doodler.counter)

    platforms.forEach((plt)=>plt.kill())

    doodler.element.style.backgroundImage = 'url("win.gif")'
    doodler.element.style.backgroundRepeat = 'no-repeat'
    doodler.element.style.backgroundSize = '105%'
    playArea.style.backgroundImage = 'url("dance.gif")'

    setTimeout(function () {
            win.pause();
            win = new Audio('https://www.myinstants.com/media/sounds/street-fighter-ii-you-win-perfect.mp3')
        },
        1000);

    setTimeout(function () {
            gameOver()
        },
        6000);
}

function control(e) {
    if (e.key === "a" || e.key === "d") {
        let left = e.key === "a"
        let direction = (1 - 2 * Number(left))
        let newX = doodler.x() + direction * 7

        if (newX <= (playAreaWidth - doodler.width()) && newX >= 0)
            doodler.move(newX)
    }
}

function gameOver() {
    bgm.pause()
    gmOvr.volume = 1
    gmOvr.play()

    doodler.element.style.backgroundImage = ''
    playArea.style.backgroundImage = ''
    play.style.display = ""
    play.innerText = "PLAY AGAIN?"
    doodler.die()
}

function startGame() {
    platforms.forEach((plt) => {
        plt.element.remove()
    })

    platforms = [new Platform(0, 0, 395)]

    for (let i = 0; i < 40; i++) {
        platforms.push(new Platform(playAreaWidth - platformW, playAreaHeight - platformH))
    }

    setTimeout(() => play.style.display = "none",
        750);
    play.removeEventListener("keypress", control)
    document.addEventListener('keypress', control)

    doodler = new Doodler()
    doodler.element.style.backgroundImage
    score.innerText = 0

    bgm.loop = true
    bgm.volume = 0.15
    bgm.play()
}

play.addEventListener('click', AMOGUS)
play.addEventListener("click", startGame)