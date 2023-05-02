const gameContainer = document.querySelector('.game-container')

const buttonplay = document.querySelector('.btn')
const chooseVillain = document.querySelectorAll('.choose-btn')

const score = document.querySelector('.score')
const time = document.querySelector('.time')
const message = document.querySelector('.message')

let seconds = 0
let scoreCount = 0
let selectedVillain = ''

buttonplay.addEventListener('click', () => {
    buttonplay.parentElement.classList.add('up')
})

chooseVillain.forEach(villain => {
    villain.addEventListener('click', (e) => {
        console.log(villain.dataset.user)
        villain.parentElement.parentElement.classList.add('up')
        selectedVillain = `img/${villain.dataset.user}.png`
        document.getElementById(villain.dataset.user).play()
        setTimeout(createVillain, 1000)
        setInterval(timer, 1000)
    })
})

function createVillain() {
    const villain = document.createElement('div')
    const villainImg = document.createElement('img')
    villain.classList.add('villain')

    const {x, y} = randomPosition()

    villain.style.top = `${y}px`
    villain.style.left = `${x}px`


    villainImg.src = selectedVillain
    villainImg.style.transform = `rotate(${randomRotation()}deg)`
    villainImg.draggable = false

    villain.appendChild(villainImg)
    gameContainer.appendChild(villain)

    villain.addEventListener('click', () => {
        updateScore()
        villain.classList.add('defeated')
        setTimeout(()=>{
            villain.remove()
        }, 700)

        createMoreVillains()
    })
}


function randomPosition() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function randomRotation() {
    return Math.floor(Math.random() * 360) + 1
}

function updateScore() {
    scoreCount++
    score.textContent = `Pontuação: ${scoreCount}`

    if(scoreCount % 20 === 0){
        message.classList.add('visible')
        setTimeout(()=>{
            message.classList.remove('visible')
        }, 2000)
    }
}

function createMoreVillains(){
    setTimeout(createVillain, 1000)
    setTimeout(createVillain, 1500)
}

function timer() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    time.innerHTML = `Tempo: ${m}:${s}`
    seconds++
}