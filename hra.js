let currentPlayer = "circle"

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