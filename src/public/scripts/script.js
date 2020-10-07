document.addEventListener("DOMContentLoaded", function() {
    path = window.location.pathname

    /* --- Auth ---- */
    if (path === "/signup" || path === "/signin") {
        const inputs = [...document.querySelectorAll("input")]
        inputs.forEach((input) => {
            label = input.nextElementSibling
            input.addEventListener("focus", function() {
                console.log(1)
                label.style.opacity = 0
            })
            input.addEventListener("blur", function() {
                label.style.opacity = 1
            })
        })
    }
    /* Chat room */
    else {
        const socket = io()
        const inpMessage = document.querySelector("#inp-message")
        const btn = document.querySelector("#btn-send")
        label = document.querySelector("#placeholder")

        inpMessage.addEventListener("focus", function() {
            label.style.opacity = 0
        })

        inpMessage.addEventListener("blur", function() {
            label.style.opacity = 1
        })

        btn.addEventListener("click", function(e) {
            e.preventDefault()
            const msg = inpMessage.value.trim()
            if (msg === "") return
            socket.emit("newMsg", msg)
            inpMessage.value = ""
        })

        socket.on("addMsg", function(data) {
            card = createMessageCard(data)
            addMessageCard(card)
        })
    }

    // signup request
    /* 
    1. valid fields
    2. make request
    3. enter (or not)
    */

    /* signin
    1.valid tokens
    2. make request
    3. enter (or not)
    */

    // const socket = io()
    // const inpMessage = document.querySelector("#inp-message")
    // const inputs = [...document.querySelectorAll("input")]
    // const btn = document.querySelector("#btn-send")
    // label = document.querySelector("#placeholder")

    // inpMessage.addEventListener("focus", function () {
    //     label.style.opacity = 0
    // })

    // inpMessage.addEventListener("blur", function () {
    //     label.style.opacity = 1
    // })

    // btn.addEventListener("click", function (e) {
    //     e.preventDefault()
    //     const msg = inpMessage.value.trim()
    //     if (msg === "") return
    //     socket.emit("newMsg", msg)
    //     inpMessage.value = ""
    // })

    // socket.on("addMsg", function (data) {
    //     card = createMessageCard(data)
    //     addMessageCard(card)
    // })

    // inputs.forEach((input) => {
    //     label = input.nextElementSibling
    //     input.addEventListener("focus", function () {
    //         label.style.opacity = 0
    //     })
    //     input.addEventListener("blur", function () {
    //         label.style.opacity = 1
    //     })
    // })
})

function createMessageCard(data) {
    card = document.createElement("div")
    card.classList.add("card", "blue-grey", "darken-1", "brad-8")

    cardContent = document.createElement("div")
    cardContent.classList.add("card-content", "white-text", "p-8")

    author = document.createElement("span")
    author.classList.add("grey-text")
    author.textContent = data.user

    message = document.createElement("p")
    message.textContent = data.msg

    cardContent.appendChild(author)
    cardContent.appendChild(message)

    card.appendChild(cardContent)
    return card
}

function addMessageCard(card) {
    msgList = document.querySelector("#msg-list")
    msgList.appendChild(card)
}
