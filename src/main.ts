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
  const deathPaths = getPaths("death", 10);

  const assetsWalk = await Assets.load(walkPaths);
  const assetsIdle = await Assets.load(idlePaths);
  const assetsDeath = await Assets.load(deathPaths);

  const framesWalk = walkPaths.map((path) => assetsWalk[path]);
  const framesIdle = idlePaths.map((path) => assetsIdle[path]);
  const framesDeath = deathPaths.map((path) => assetsDeath[path]);

  const sprite = new AnimatedSprite(framesIdle);

  sprite.scale.set(0.2);
  sprite.anchor.set(0.5);
  sprite.position.set(200, 200);
  sprite.animationSpeed = 0.2;

  const keys: Record<string, boolean> = {};

  window.addEventListener("keydown", (e) => {
    keys[e.code] = true;

    if (e.code === "Space" && state !== "death") {
      state = "death";
      sprite.textures = framesDeath;
      sprite.loop = false;
      sprite.gotoAndPlay(0);
    }
  });

  window.addEventListener("keyup", (e) => {
    keys[e.code] = false;
  });

  const SPEED = 3;

  let state: "idle" | "walk" | "death" = "idle";

  app.ticker.add(() => {
    const isRightPressed = !!keys["ArrowRight"];
    const isLeftPressed = !!keys["ArrowLeft"];

    if (state !== "death") {
      const nextState: "idle" | "walk" | "death" =
        isRightPressed || isLeftPressed ? "walk" : "idle";

      if (nextState !== state) {
        state = nextState;

        if (state === "walk") {
          sprite.textures = framesWalk;
          sprite.loop = true;
          sprite.play();
        } else {
          sprite.textures = framesIdle;
          sprite.loop = true;
          sprite.play();
        }
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

      const spriteWidth = (sprite.width / 2) * 0.2;
      const minX = spriteWidth;
      const maxX = app.renderer.width - spriteWidth;

      sprite.position.x = Math.min(Math.max(sprite.position.x, minX), maxX);
    }
  });

  sprite.play();
  app.stage.addChild(sprite);
})();
