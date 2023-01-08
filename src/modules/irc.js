import TwitchJs from "twitch-js";
import { processRaw } from "./processRaw.js";

const CHANNEL = "manzdev";
const listeners = [];

const client = new TwitchJs.Chat({
  username: undefined,
  token: undefined,
  log: { level: "warn" }
});

await client.connect();
await client.join(CHANNEL);

client.on("*", (data) => {
  const eventType = data.events || data.command;

  // console.log(data._raw);

  if (eventType === "PRIVMSG") {
    const raw = processRaw(data._raw);
    if (raw.message.startsWith("\u0001ACTION")) {
      listeners.filter(listener => listener.eventType === "action").forEach(event => event.method(raw));
    } else {
      listeners.filter(listener => listener.eventType === "message").forEach(event => event.method(raw));
    }
  } else {
    console.log(data._raw);
  }
});

export const chat = {
  on: function (eventType, method) {
    listeners.push({ eventType, method });
  }
};
