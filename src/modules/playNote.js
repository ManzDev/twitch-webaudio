// const TYPES = ["sine", "square", "sawtooth", "triangle"];

// Init
const audio = new AudioContext();
const gainNode = audio.createGain();
gainNode.gain.value = 0.1;
gainNode.connect(audio.destination);

export const playNote = (freqValue = 440, duration = 100) => {
  const oscillator = audio.createOscillator();
  oscillator.connect(gainNode);
  // const typeValue = ~~(Math.random() * TYPES.length);
  oscillator.type = "square";
  oscillator.frequency.value = freqValue;
  oscillator.start();

  oscillator.onended = () => { };

  setTimeout(() => stopNote(oscillator), duration);

  return oscillator;
};

export const stopNote = (oscillator) => {
  oscillator.stop();
};
