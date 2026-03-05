const keyMap = {
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "top",
  ArrowDown: "bottom",
};

type KeyName = (typeof keyMap)[keyof typeof keyMap];

export class Controller {
  keys: Record<KeyName, { pressed: boolean }>;

  constructor() {
    this.keys = {
      left: { pressed: false },
      right: { pressed: false },
      top: { pressed: false },
      bottom: { pressed: false },
    };

    window.addEventListener("keydown", (e) => this.keydownHandler(e));
    window.addEventListener("keyup", (e) => this.keyupHandler(e));
  }

  keydownHandler(e: KeyboardEvent) {
    const key = keyMap[e.code as keyof typeof keyMap];
    this.keys[key].pressed = true;
  }

  keyupHandler(e: KeyboardEvent) {
    const key = keyMap[e.code as keyof typeof keyMap];
    this.keys[key].pressed = false;
  }
}
