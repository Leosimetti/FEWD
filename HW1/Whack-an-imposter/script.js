ROUND_TIME = 3000 //In milliseconds
ANIMATION_TIME = 600
SAMPLING_INC_CHANCE = 20//%
INIT_SAMPLING = 3

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const noop = () => {}

function game() {
    let holeElements = Array.from(document.getElementsByClassName("hole__content"))
    const buttonElement = document.getElementsByClassName("menu__button")[0]
    const scoreElement = document.getElementById("score")
    let score = 0
    let gameState = 'idle'

    function incScore() {
        scoreElement.innerHTML = (++score).toString()
    }

    function resetScore() {
        score = 0
        scoreElement.innerHTML = '0'
    }

    function hideElem(el) {
        el.classList.remove("imposter")
        el.classList.remove("ricardo")
        el.classList.remove("hole__content_active")
    }

    function showElem(el, className) {
        el.classList.add(className)
        el.classList.add("hole__content_active")
    }

    function handleFail() {
        if (gameState !== 'stop') {
            gameState='stop'
            for (const el of holeElements) {
                hideElem(el)
            }
            buttonElement.classList.remove("locked")
            buttonElement.innerHTML = "Start game"
        }
    }

    async function setEntity(holeElement, name, onClick, handleSkip, onClickSound) {
        showElem(holeElement, name)
        let clicked = false

        async function onClickProxy() {
            setTimeout(()=>{(new Audio(onClickSound)).play()}, 0)
            onClick()
            hideElem(holeElement)
            clicked = true
        }

        holeElement.addEventListener('click', onClickProxy)

        setTimeout(() => {
            holeElement.classList.remove("hole__content_active")
        }, ROUND_TIME - ANIMATION_TIME)

        setTimeout(() => {
            holeElement.removeEventListener('click',onClickProxy)
            if(gameState !== 'stop' && !clicked) {
                handleSkip()
                hideElem(holeElement)
            }
        }, ROUND_TIME)
    }

    async function setImposter(holeElement) {
        await setEntity(holeElement, "imposter", incScore, handleFail, "./static/imposter_kill_sound.mp3")
    }

    async function setRicardo(holeElement) {
        await setEntity(holeElement, "ricardo", handleFail, noop, "./static/ricardo_kill_sound_sad.mp3")
    }

    async function processRound(sampling) {
        const shuffledHoleElements = holeElements.sort(() => 0.5 - Math.random());
        const selectedHoleElements = shuffledHoleElements.slice(0, sampling);

        for (const holeElement of selectedHoleElements) {
            await (Math.random() > 0.5 ? setImposter(holeElement) : setRicardo(holeElement))
        }
    }

    return async function startGame() {
        resetScore()
        buttonElement.classList.add("locked")
        buttonElement.innerHTML = "Game in progress"
        let sampling = INIT_SAMPLING
        gameState = 'active'

        while (gameState === 'active') {
            await processRound(sampling)
            if (Math.ceil(Math.random()*100) < SAMPLING_INC_CHANCE && sampling<10) {
                sampling++;
            }
            await sleep(ROUND_TIME)
        }
    }
}

let soundtrackStarted = false

document.getElementsByClassName("menu__button")[0].addEventListener("click", () => {
    const newGameStart = game()
    async function startSoundtrack() {
        if(!soundtrackStarted) {
            soundtrackStarted = true
            const soundtrack = new Audio("./static/soundtrack.mp3")
            soundtrack.loop = true
            await soundtrack.play()
        }
    }
    Promise.any([newGameStart(), startSoundtrack()]).then(noop)
})