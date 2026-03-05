import {
  AnimatedSprite,
  Application,
  Assets,
  Container,
  Sprite,
} from "pixi.js";
import { Controller } from "./Controller";

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
  // const deathPaths = getPaths("death", 10);

  const assetsWalk = await Assets.load(walkPaths);
  const assetsIdle = await Assets.load(idlePaths);
  // const assetsDeath = await Assets.load(deathPaths);

  const framesWalk = walkPaths.map((path) => assetsWalk[path]);
  const framesIdle = idlePaths.map((path) => assetsIdle[path]);
  // const framesDeath = deathPaths.map((path) => assetsDeath[path]);

  const sprite = new AnimatedSprite(framesIdle);

  sprite.scale.set(0.2);
  sprite.anchor.set(0.5);
  sprite.position.set(200, 200);
  sprite.animationSpeed = 0.2;

  const controller = new Controller();

  const SPEED = 10;

  let state: "idle" | "walk" | "death" = "idle";

  app.ticker.add(() => {
    const isRightPressed = controller.keys.right.pressed;
    const isLeftPressed = controller.keys.left.pressed;
    const isTopPressed = controller.keys.top.pressed;
    const isBottomPressed = controller.keys.bottom.pressed;

    if (state !== "death") {
      const nextState: "idle" | "walk" | "death" =
        isRightPressed || isLeftPressed || isTopPressed || isBottomPressed
          ? "walk"
          : "idle";

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
      } else if (isTopPressed) {
        sprite.position.y -= SPEED;
      } else {
        sprite.scale.y = Math.abs(sprite.scale.y);
        sprite.position.y += SPEED;
      }

      const spriteWidth = (sprite.width / 2) * 0.2;
      const minX = spriteWidth;
      const maxX = app.renderer.width - spriteWidth;

      const spriteHeight = (sprite.height / 2) * 0.2;
      const minY = spriteHeight - 50;
      const maxY = app.renderer.height - spriteHeight - 120;

      sprite.position.x = Math.min(Math.max(sprite.position.x, minX), maxX);
      sprite.position.y = Math.min(Math.max(sprite.position.y, minY), maxY);
    }
  });

  sprite.play();
  app.stage.addChild(sprite);

  const arrowsContainer = new Container();
  arrowsContainer.position.set(window.innerWidth / 2, window.innerHeight - 100);

  const arrowTexture = await Assets.load("assets/icons/arrow.png");
  const offset = 50;

  const arrowUp = new Sprite(arrowTexture);
  arrowUp.anchor.set(0.5);
  arrowUp.rotation = 0;
  arrowUp.position.set(0, -offset);
  arrowsContainer.addChild(arrowUp);

  const arrowDown = new Sprite(arrowTexture);
  arrowDown.anchor.set(0.5);
  arrowDown.rotation = Math.PI;
  arrowDown.position.set(0, offset);
  arrowsContainer.addChild(arrowDown);

  const arrowLeft = new Sprite(arrowTexture);
  arrowLeft.anchor.set(0.5);
  arrowLeft.rotation = -Math.PI / 2;
  arrowLeft.position.set(-offset, 0);
  arrowsContainer.addChild(arrowLeft);

  const arrowRight = new Sprite(arrowTexture);
  arrowRight.anchor.set(0.5);
  arrowRight.rotation = Math.PI / 2;
  arrowRight.position.set(offset, 0);
  arrowsContainer.addChild(arrowRight);

  arrowUp.eventMode = "static";
  arrowUp.cursor = "pointer";

  arrowUp.on("pointerdown", () => {
    controller.keys.top.pressed = true;
  });

  arrowUp.on("pointerup", () => {
    controller.keys.top.pressed = false;
  });

  arrowUp.on("pointerupoutside", () => {
    controller.keys.top.pressed = false;
  });

  arrowDown.eventMode = "static";
  arrowDown.cursor = "pointer";

  arrowDown.on("pointerdown", () => {
    controller.keys.bottom.pressed = true;
  });

  arrowDown.on("pointerup", () => {
    controller.keys.bottom.pressed = false;
  });

  arrowDown.on("pointerupoutside", () => {
    controller.keys.bottom.pressed = false;
  });

  arrowLeft.eventMode = "static";
  arrowLeft.cursor = "pointer";

  arrowLeft.on("pointerdown", () => {
    controller.keys.left.pressed = true;
  });

  arrowLeft.on("pointerup", () => {
    controller.keys.left.pressed = false;
  });

  arrowLeft.on("pointerupoutside", () => {
    controller.keys.left.pressed = false;
  });

  arrowRight.eventMode = "static";
  arrowRight.cursor = "pointer";

  arrowRight.on("pointerdown", () => {
    controller.keys.right.pressed = true;
  });

  arrowRight.on("pointerup", () => {
    controller.keys.right.pressed = false;
  });

  arrowRight.on("pointerupoutside", () => {
    controller.keys.right.pressed = false;
  });

  app.stage.addChild(arrowsContainer);
})();
