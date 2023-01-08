import { getAvatar } from "./getAvatar.js";
import { playNote } from "./playNote.js";

const animateMessage = (container, message) => {
  const tone = 100 + message.length;

  for (let i = 0; i <= message.length; i++) {
    const delta = Math.floor(Math.random() * 50);
    const time = (i * 75) + delta;
    const duration = delta * 2;
    setTimeout(() => {
      container.textContent = message.substring(0, i);
      playNote(tone, duration);
    }, time);
  }
};

export const createUserMessage = async (username, message, container) => {
  const userMessage = document.createElement("div");
  const picture = await getAvatar(username);

  userMessage.classList.add("user-message");
  userMessage.innerHTML = /* html */`
      <div class="nick"><img src="${picture}" alt="${username}"></div>
      <div class="message-container">
        <span class="username">${username}</span>
        <div class="message"></div>
      </div>
    `;

  animateMessage(userMessage.querySelector(".message"), message);
  container.insertAdjacentElement("afterbegin", userMessage);
  const options = {
    duration: 250,
    iterations: 1
  };
  userMessage.animate([
    { transform: "translateY(-50%)", opacity: 0 },
    { transform: "translateY(0)", opacity: 1 }
  ], options);
};
