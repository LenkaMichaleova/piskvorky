import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

const herniPole = Array(100)
herniPole.fill("_")
let currentPlayer = "circle"

document.querySelectorAll(".game__field").forEach((btn, i) => {
    btn.addEventListener("click", () => {
        const player = currentPlayer === "circle" ? "o" : "x"
        herniPole[i] = player
        const winner = findWinner(herniPole)

        setTimeout(() => {
            if (winner === "o" || winner === "x") {
                alert(`Vyhrál hráč se symbolem ${winner}.`)
                window.location.reload()
            } else if (winner === "tie"){
                alert(`Hra skončila remízou.`)
            }
        }, 250)
    })
})

document.querySelectorAll(".game__field").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (currentPlayer === "circle") {
            document.querySelector(".game__player img").src = "img/cross.svg"
            e.target.classList.add("game__field--circle")
            e.target.disabled = true
            currentPlayer = "cross"
        } else {
            document.querySelector(".game__player img").src = "img/circle.svg"
            btn.classList.add("game__field--cross")
            e.target.disabled = true
            currentPlayer = "circle"
        }
    })
})

document.querySelector(".game__button--blue").addEventListener("click", (event) => {
    if (window.confirm('Opravdu chceš začít znovu?') === false) {
        event.preventDefault()
    }
})
