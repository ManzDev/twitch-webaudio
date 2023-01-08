import { createUserMessage } from "./modules/createUserMessage.js";
import { chat } from "./modules/irc.js";

const API_URL = "http://localhost:9999/api/userinfo/";
const container = document.querySelector(".container");
const users = {};

const getAvatar = async (username) => {
  const response = await fetch(API_URL + username);
  const data = await response.json();
  return data.picture;
};

chat.on("PRIVMSG", async (data) => {
  const { message } = data;
  const username = data._raw.match(/;user-type=(.+):(.+)!(.+) PRIVMSG/)[2];

  // load
  const tone = users[username] ?? 100 + message.length;

  // save
  if (!users[username]) {
    users[username] = tone;
  }

  console.log(username, data._raw);

  const picture = await getAvatar(username);

  createUserMessage(username, picture, message, container);

  const messages = [...container.querySelectorAll(".user-message")];
  if (messages.length > 8) {
    messages.at(-1).remove();
  }
});
