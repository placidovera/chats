console.log("Cliente conectado");
const socket = io();

const box = document.querySelector("#box");
const appChat = document.querySelector("#app-chat");
const userConect = document.querySelector("#usuarios");
const conectIndicator = document.querySelector("#conect");

let user = "";

Swal.fire({
  title: "Bienvenido al chat",
  input: "text",
  inputLabel: "Ingresa tu nombre",
  inputPlaceholder: "Tu nombre...",
  allowOutsideClick: false,
  inputValidator: (value) => {
    if (!value) return "Tenés que escribir un nombre!";
  },
}).then((result) => {
  user = result.value;
  console.log("Usuario:", user);
    if (user) {
    document.getElementById("app-chat").style.display = "block";
  }
});

box.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && box.value !== "") {
    const mensaje = {
      user,
      texto: box.value,
    };
    socket.emit("mensaje", mensaje);
    box.value = "";
  }
});

socket.on("Lista de mensajes", (data) => {
  appChat.innerHTML = "";
  data.forEach((chat) => {
    if (chat.user === user) {
      appChat.innerHTML += `
        <div class="mensaje propio">
          <strong>Yo:</strong> ${chat.texto}
        </div>
      `;
    } else {
      appChat.innerHTML += `
        <div class="mensaje ajeno">
          <strong>${chat.user}:</strong> ${chat.texto}
        </div>
      `;
    }
  });
});

socket.on("usuarios_conectados", (cantidad) => {
  userConect.textContent = cantidad;
});
