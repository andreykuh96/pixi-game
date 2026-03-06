import { Application, Assets, Graphics, Sprite } from "pixi.js";
import { assetsMap } from "./assetsMap";
import { Tank } from "./Tank";

(async () => {
  const app = new Application();
  await app.init({
    resizeTo: window,
    backgroundColor: "#abafae",
  });
  document.body.appendChild(app.canvas);

  const runGame = () => {
    const marker = new Graphics();
    marker.rect(0, 0, 10, 10).fill("#fe232a");

    const tank = new Tank();
    app.stage.addChild(tank.view);
    app.stage.addChild(marker);
    app.stage.position.set(window.innerWidth / 2, window.innerHeight / 2);

    // window["TANK"] = tank;
  };

  Assets.addBundle("Tank", assetsMap.sprites);
  await Assets.loadBundle("Tank");

  runGame();
})();
