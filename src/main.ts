import { AnimatedSprite, Application, Assets } from "pixi.js";

(async () => {
  const app = new Application();
  await app.init({
    resizeTo: window,
    backgroundColor: "#a29f9d",
  });
  document.body.appendChild(app.canvas);

  const getPaths = (path: string, length: number) => {
    return Array.from(
      { length },
      (_, i) => `assets/char_1/${path}/${path}_${i}.png`,
    );
  };

  const walkPaths = getPaths("walk", 8);
  const idlePaths = getPaths("idle", 6);

  const assetsWalk = await Assets.load(walkPaths);
  const assetsIdle = await Assets.load(idlePaths);

  const framesWalk = walkPaths.map((path) => assetsWalk[path]);
  const framesIdle = idlePaths.map((path) => assetsIdle[path]);

  const sprite = new AnimatedSprite(framesIdle);

  sprite.scale.set(0.2);
  sprite.anchor.set(0.5);
  sprite.position.set(50, 0);
  sprite.animationSpeed = 0.2;

  const keys: Record<string, boolean> = {};

  window.addEventListener("keydown", (e) => {
    keys[e.code] = true;
  });

  window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
  });

  const SPEED = 3;

  let state: "idle" | "walk" = "idle";

  app.ticker.add(() => {
    const isRightPressed = !!keys["ArrowRight"];
    const isLeftPressed = !!keys["ArrowLeft"];

    const nextState: "idle" | "walk" =
      isRightPressed || isLeftPressed ? "walk" : "idle";

    if (nextState !== state) {
      state = nextState;

      if (state === "walk") {
        sprite.textures = framesWalk;
        sprite.play();
      } else {
        sprite.textures = framesIdle;
        sprite.play();
      }
    }

    if (state === "walk") {
      if (isRightPressed) {
        sprite.scale.x = Math.abs(sprite.scale.x);
        sprite.position.x += SPEED;
      } else if (isLeftPressed) {
        sprite.scale.x = -Math.abs(sprite.scale.x);
        sprite.position.x -= SPEED;
      }
    }
  });

  sprite.play();
  app.stage.addChild(sprite);
})();
