document.addEventListener("DOMContentLoaded", function () {
    const inputs = [...document.querySelectorAll("input")]
    inputs.forEach((input) => {
        label = input.nextElementSibling
        input.addEventListener("focus", function () {
            label.style.opacity = 0
        })
        input.addEventListener("blur", function () {
            label.style.opacity = 1
        })
    })
})
