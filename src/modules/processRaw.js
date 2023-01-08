export const processRaw = (raw) => {
  const [flagsRaw, userdataRaw, eventType, channel] = raw.substring(1).split(" ", 4);
  const [, message] = raw.split(` ${eventType} ${channel} :`);
  const flagList = flagsRaw.split(";");
  const flags = {};

  flagList.forEach(data => {
    const [flagName, flagValue] = data.split("=");
    flags[flagName] = flagValue;
  });

  return {
    flags,
    username: userdataRaw.substring(1).split("!")[0],
    eventType,
    channel,
    message: message.trim()
  };
};
