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
            if (currentPlayer === "cross") {
                autoPlay(herniPole)
            }
        }, 250)
    })
})

document.querySelectorAll(".game__field").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.target.classList.remove("game__field--empty")

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

const autoPlay = async (pole) => {
    document.querySelectorAll(".game__field--empty").forEach(btn => {
        btn.disabled = true
    })

    const response = await fetch("https://piskvorky.czechitas-podklady.cz/api/suggest-next-move", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            board: pole,
            player: 'x'
        }),
    })
    const data = await response.json()
    
    if (response.ok) {    
        document.querySelectorAll(".game__field--empty").forEach(btn => {
            btn.disabled = false
        })

        const { x, y } = data.position
        const field = document.querySelectorAll(".game__field")[x + y * 10]
        console.log(field)
        field.click()
    }
}