import { Application } from "pixi.js";

(async () => {
  const app = new Application();
  await app.init({
    resizeTo: window,
    backgroundColor: "#a29f9d",
  });
  document.body.appendChild(app.canvas);
})();
