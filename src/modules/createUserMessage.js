import { playNote } from "./playNote.js";

const animateMessage = (container, message) => {
  const tone = 100 + message.length;

  // container.textContent = message;
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

export const createUserMessage = (username, picture, message, container) => {
  const userMessage = document.createElement("div");
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
};
