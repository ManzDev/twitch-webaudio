import TwitchJs from "twitch-js";

const CHANNEL = "ManzDev";

const chat = new TwitchJs.Chat({
  username: undefined,
  token: undefined,
  log: { level: "warn" }
});

await chat.connect();
await chat.join(CHANNEL);

export { chat };
