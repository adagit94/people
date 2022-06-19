import { TRANSLATE_SQUARES_DURATION } from "../constants.js";

export default class Augen {
  static #COMMON_AUDIO_NODE_OPTIONS = {
    channelCount: 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers",
  };

  constructor() {
    window.addEventListener("click", this.#initContext);
  }

  #context;
  #audioSources = {};

  #initContext = () => {
    window.removeEventListener("click", this.#initContext);

    const Context = window.AudioContext ?? window.webkitAudioContext;

    this.#context = new Context();

    //this.#testTone();
    this.#initSquareTranslationSource();
    this.#initRotateLinesSource();
  };

  #testTone = () => {
    const source = {
      osc: new OscillatorNode(this.#context, {
        ...Augen.#COMMON_AUDIO_NODE_OPTIONS,
        type: "sine",
        frequency: 300,
      }),
      gain: new GainNode(this.#context, Augen.#COMMON_AUDIO_NODE_OPTIONS),
    };

    source.osc.connect(source.gain).connect(this.#context.destination);
    source.osc.start();
  };

  #initSquareTranslationSource = () => {
    const source = {
      osc: new OscillatorNode(this.#context, {
        ...Augen.#COMMON_AUDIO_NODE_OPTIONS,
        type: "sine",
        frequency: 200,
      }),
      gain: new GainNode(this.#context, {
        ...Augen.#COMMON_AUDIO_NODE_OPTIONS,
        gain: 1,
      }),
    };

    source.osc.connect(source.gain).connect(this.#context.destination);

    this.#audioSources.squareTranslation = source;
  };

  #initRotateLinesSource = () => {
    const source = {
      osc: new OscillatorNode(this.#context, {
        ...Augen.#COMMON_AUDIO_NODE_OPTIONS,
        type: "square",
        frequency: 400,
      }),
      gain: new GainNode(this.#context, {
        ...Augen.#COMMON_AUDIO_NODE_OPTIONS,
        gain: 1,
      }),
    };

    source.osc.connect(source.gain).connect(this.#context.destination);

    this.#audioSources.rotateLines = source;
  };

  loopAnimSound = (it, soundFunc) => {
    for (let i = 0; i < it; i++) {
      soundFunc(this.#context, this.#audioSources);
    }
  };

  triggerAnimSound = soundFunc => {
    soundFunc(this.#context, this.#audioSources);
  };
}
