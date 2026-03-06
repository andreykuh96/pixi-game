import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";

type TTextureNames = string[];

const createAnimatedSprite = (
  textureNames: TTextureNames,
  position = { x: 0, y: 0 },
  anchor = { x: 0.5, y: 0.5 },
) => {
  const textures = textureNames.map((name) => Texture.from(name));

  const animatedSprite = new AnimatedSprite(textures);
  animatedSprite.position.copyFrom(position);
  animatedSprite.anchor.copyFrom(anchor);
  animatedSprite.animationSpeed = 0.2;
  return animatedSprite;
};

const createSprite = (
  textureName: string,
  position = { x: 0, y: 0 },
  anchor = { x: 0.5, y: 0.5 },
) => {
  const sprite = new Sprite(Texture.from(textureName));

  sprite.position.copyFrom(position);
  sprite.anchor.copyFrom(anchor);
  return sprite;
};

export class Tank {
  private _view: Container;
  private _trackLeft: AnimatedSprite;
  private _trackRight: AnimatedSprite;
  private _towerContainer: Container;
  private _bodyContainer: Container;

  constructor() {
    this._view = new Container();

    this._bodyContainer = new Container();
    this._view.addChild(this._bodyContainer);

    this._trackLeft = createAnimatedSprite(["Track_1", "Track_2"], {
      x: 80,
      y: 0,
    });
    this._trackRight = createAnimatedSprite(["Track_1", "Track_2"], {
      x: -80,
      y: 0,
    });
    this._bodyContainer.addChild(this._trackLeft, this._trackRight);

    this._bodyContainer.addChild(createSprite("Hull"));

    this._towerContainer = new Container();
    this._towerContainer.position.set(0, 40);
    this._towerContainer.addChild(createSprite("Tower"));
    this._towerContainer.addChild(createSprite("Gun", { x: 0, y: -110 }));
    this._bodyContainer.addChild(this._towerContainer);
  }

  get view() {
    return this._view;
  }

  rotateTowerBy(angle: number) {
    this._towerContainer.rotation += angle;
  }

  rotateBodyBy(angle: number) {
    this._bodyContainer.rotation += angle;
  }

  startTracks() {
    this._trackLeft.play();
    this._trackRight.play();
  }

  stopTracks() {
    this._trackLeft.stop();
    this._trackRight.stop();
  }
}
