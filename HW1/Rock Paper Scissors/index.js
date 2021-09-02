const bot = document.querySelector("#bot-vs")
const botWeapon = document.querySelector("#bot-vs .action")

const usr = document.querySelector("#user-vs")
const usrWeapon = document.querySelector("#user-vs .action")
const usrIcon = document.querySelector('#user-vs .ico')

const usrScore = document.getElementById("user-score")
const botScore = document.getElementById("bot-score")

const bgm = new Audio("bgm.mp3")
const win = new Audio("win.mp3")
const oops = new Audio("oops.mp3")
oops.volume = 0.3
bgm.loop = true
bgm.volume = 0.2
bgm.play()

let usrChoice = null
let actions = Array.from(document.getElementsByClassName("choice"))

const logic = {
    '🦎': ['🖖,🧻'],
    '🖖': ['🪨', '✂️'],
    '🪨': ['🦎', '✂️'],
    '✂️': ['🦎', '🧻'],
    '🧻': ['🖖', '🪨']
}


function play() {
    actions.forEach((e) => {
        e.style.pointerEvents = "none"
    })

    let botChoice = (actions[Math.floor(Math.random() * actions.length)]).textContent
    botWeapon.textContent = botChoice

    if (botChoice === usrChoice) {
        usrIcon.textContent = '😐'
    } else if (logic[usrChoice].includes(botChoice)) {
        usrIcon.textContent = '😎'
        usrScore.innerText = Number(usrScore.innerText) + 1
        bot.style.filter = 'grayscale()'
        win.play()
    } else {
        oops.play()
        usrIcon.textContent = "😢"
        usr.style.filter = 'grayscale()'
        botScore.innerText = Number(botScore.innerText) + 1
    }

    setTimeout(() => {
        botWeapon.textContent = '❓'
        usrWeapon.textContent = '❓'
        reset()
    }, 1250)
}

function reset() {
    usrIcon.textContent = '🤔'

    actions.forEach((e) => {
        e.style.pointerEvents = ""
        e.style.borderColor = "blue"

        bot.style.filter = ''
        usr.style.filter = ''
    })
}

actions.forEach((a) => {
    a.addEventListener("click", () => {
        usrChoice = a.textContent
        a.style.borderColor = "red"
        play()
    })

    a.onmouseover = () => {
        usrWeapon.textContent = a.textContent
        usrChoice = a.textContent
    }
})