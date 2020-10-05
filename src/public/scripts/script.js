document.addEventListener("DOMContentLoaded", function () {
    const btnSend = document.querySelector("#btn-send-message")
    const inpMessage = document.querySelector("#msg-inp")

    const socket = io("http://localhost:3000")
    btnSend.addEventListener("click", (e) => {
        console.log(inpMessage.value)
        socket.emit("newMsg", msg)
        inpMessage.value = ""
    })
})
