import { createUserMessage } from "./modules/createUserMessage.js";
import { chat } from "./modules/irc.js";

const container = document.querySelector(".container");

chat.on("message", async (data) => {
  const { message, username } = data;

  await createUserMessage(username, message, container);

  const messages = [...container.querySelectorAll(".user-message")];
  if (messages.length > 10) {
    messages.at(-1).remove();
  }
});

chat.on("action", (data) => console.log("ACTION: ", data));
