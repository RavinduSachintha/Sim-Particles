export class Particle {
  private _x: number;
  private _y: number;
  private vx: number = 0;
  private vy: number = 0;
  private _visible: boolean;
  private _bounce: boolean;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
    this._visible = true;
    this._bounce = true;
  }

  public get x(): number {
    return this._x;
  }
  public set x(value: number) {
    this._x = value;
  }

  public get y(): number {
    return this._y;
  }
  public set y(value: number) {
    this._y = value;
  }

  public get visible(): boolean {
    return this._visible;
  }
  public set visible(value: boolean) {
    this._visible = value;
  }

  public setPosition(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  public setVelocity(vx: number, vy: number) {
    this.vx = vx;
    this.vy = vy;
  }

  public calculatePosition(mx: number, my: number) {
    const tmpx = this.x + this.vx;
    const tmpy = this.y + this.vy;

    if (this._bounce) {
      if (tmpx > mx) {
        this._x = mx;
        this.vx = -this.vx;
      } else if (tmpx < 0) {
        this._x = 0;
        this.vx = -this.vx;
      } else {
        this._x = tmpx;
      }

      if (tmpy > my) {
        this._y = my;
        this.vy = -this.vy;
      } else if (tmpy < 0) {
        this._y = 0;
        this.vy = -this.vy;
      } else {
        this._y = tmpy;
      }
    }
  }

  public calculateVisibility(mx: number, my: number) {
    this._visible =
      this._x <= mx && this._x >= 0 && this._y <= my && this._y >= 0;
  }
}
