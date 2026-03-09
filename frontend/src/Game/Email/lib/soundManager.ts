/**
 * Safe Sound Manager – uses Web Audio API to synthesize corporate tones.
 * Never crashes if audio is unavailable. All sounds triggered via explicit calls only.
 * No autoplay before user interaction.
 */

let ctx: AudioContext | null = null;
let userInteracted = false;

function getCtx(): AudioContext | null {
  try {
    if (!userInteracted) return null;
    if (!ctx || ctx.state === "closed") {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  } catch (e) {
    console.warn("[SoundManager] AudioContext unavailable:", e);
    return null;
  }
}

export function initSoundManager() {
  // Mark user interaction on first click/key anywhere on the page
  const markInteracted = () => {
    userInteracted = true;
    // Pre-warm the audio context
    getCtx();
  };
  document.addEventListener("click", markInteracted, { once: true });
  document.addEventListener("keydown", markInteracted, { once: true });
}

/** Play a synthesized tone with given params */
function playTone(opts: {
  frequency: number;
  type?: OscillatorType;
  duration: number;
  gain?: number;
  fadeOut?: boolean;
  delay?: number;
}) {
  try {
    const c = getCtx();
    if (!c) return;

    const { frequency, type = "sine", duration, gain = 0.3, fadeOut = true, delay = 0 } = opts;
    const startTime = c.currentTime + delay;

    const osc = c.createOscillator();
    const gainNode = c.createGain();

    osc.connect(gainNode);
    gainNode.connect(c.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, startTime);
    gainNode.gain.setValueAtTime(gain, startTime);

    if (fadeOut) {
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    }

    osc.start(startTime);
    osc.stop(startTime + duration);
  } catch (e) {
    console.warn("[SoundManager] playTone error:", e);
  }
}

/** Subtle email notification – two soft ascending tones */
export function playEmailNotification() {
  playTone({ frequency: 880, type: "sine", duration: 0.12, gain: 0.15 });
  playTone({ frequency: 1100, type: "sine", duration: 0.15, gain: 0.12, delay: 0.14 });
}

/** Malware detection alert – sharp double beep */
export function playMalwareAlert() {
  playTone({ frequency: 660, type: "square", duration: 0.1, gain: 0.2 });
  playTone({ frequency: 880, type: "square", duration: 0.1, gain: 0.2, delay: 0.15 });
}

/** Infection spread warning – low pulse */
export function playInfectionSpread() {
  playTone({ frequency: 220, type: "sawtooth", duration: 0.4, gain: 0.15 });
}

/** Ransomware alarm – descending siren sweep */
export function playRansomwareAlarm() {
  try {
    const c = getCtx();
    if (!c) return;
    const osc = c.createOscillator();
    const gainNode = c.createGain();
    osc.connect(gainNode);
    gainNode.connect(c.destination);
    osc.type = "sawtooth";
    const start = c.currentTime;
    osc.frequency.setValueAtTime(1200, start);
    osc.frequency.linearRampToValueAtTime(400, start + 1.0);
    gainNode.gain.setValueAtTime(0.25, start);
    gainNode.gain.exponentialRampToValueAtTime(0.001, start + 1.1);
    osc.start(start);
    osc.stop(start + 1.1);
  } catch (e) {
    console.warn("[SoundManager] playRansomwareAlarm error:", e);
  }
}

/** High infection emergency – rapid triple beep */
export function playEmergencySiren() {
  [0, 0.18, 0.36].forEach(delay => {
    playTone({ frequency: 1400, type: "square", duration: 0.12, gain: 0.25, delay });
  });
}

/** Soft button click */
export function playButtonClick() {
  playTone({ frequency: 440, type: "sine", duration: 0.06, gain: 0.08, fadeOut: true });
}

/** Terminal typing – soft tick */
export function playTerminalTick() {
  playTone({ frequency: 1800, type: "square", duration: 0.03, gain: 0.05, fadeOut: false });
}

/** Correct action positive chime */
export function playCorrectAction() {
  playTone({ frequency: 523, type: "sine", duration: 0.15, gain: 0.2 });
  playTone({ frequency: 659, type: "sine", duration: 0.2, gain: 0.18, delay: 0.16 });
}

/** Wrong action negative tone */
export function playWrongAction() {
  playTone({ frequency: 280, type: "sawtooth", duration: 0.3, gain: 0.2 });
}
