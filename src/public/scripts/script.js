document.addEventListener("DOMContentLoaded", function() {
    path = window.location.pathname

    /* --- Auth ---- */
    if (path === "/signin") {
        toggleLabelStyles()
        const formSignin = document.querySelector("#form-signin")
        formSignin.addEventListener("submit", signin)
    }
    else if (path === "/signup") {
        toggleLabelStyles()
        const formSignup = document.querySelector("#form-signup")
        formSignup.addEventListener("submit", signup)
    }
    else {
        /* Chat room */
        const socket = io()
        const inpMessage = document.querySelector("#inp-message")
        const btn = document.querySelector("#btn-send")
        label = document.querySelector("#placeholder")

        // toggleLabelStyles()

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

})

const searchURLParams = (params) => {
    return Object.keys(params).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    }).join('&')
}


function signup(e) {
    e.preventDefault()
    const name = document.querySelector("#full-name").value || "Anonymous"
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    if (!areValidFilelds(email, password)) return

    const params = searchURLParams({ name, email, password })
    fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params,
    })
        .then((res) => {
            if (!res.ok) alert("User with such email already registered")
            return res.json()
        })
        .then(({ name }) => redirectOnChatRoom(name))
        .catch(err => console.log(JSON.stringify(err)))
}

function redirectOnChatRoom(name) {
    fetch(`http://localhost:3000?name=${name}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
        .then((res) => {
            if (!res.ok) alert("something went wrong")
            return res.json()
        })
        .then(data => console.log(data))
        .catch(err => console.log(err))
}


function signin() {
    e.preventDefault()
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    if (!areValidFilelds(email, password)) return

    const params = searchURLParams({ name, email, password })

    fetch("http://localhost:3000/signin", {
        method: "POST",
        body: params
    })
        .then((res) => {
            if (!res.ok) alert("Wrong email or password")
            return res.json()
        })
        .then(data => {
            redirectOnChatRoom()
        })
        .catch(err => console.log(err))
}

function areValidFilelds(...values) {
    return values.reduce((res, val) => {
        if (!val) res = false
        return res
    }, true)
}

function toggleLabelStyles() {
    const inputs = [...document.querySelectorAll("input[type=text")]
    inputs.forEach((input) => {
        input.addEventListener("focus", function() {
            input.nextElementSibling.style.opacity = 0
        })
        input.addEventListener("blur", function() {
            if (!input.value) input.nextElementSibling.style.opacity = 1
        })
    })
}

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