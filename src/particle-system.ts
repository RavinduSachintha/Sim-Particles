import globals from "./globals";
import { Particle } from "./particle";
import { randomValue } from "./utils";

export class ParticleSystem {
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  public state: "started" | "stopped" = "stopped";

  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public setContext(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  // single entry point generation
  public generate(count: number, x: number, y: number) {
    for (let index = 0; index < count; index++) {
      const p = new Particle(x, y);
      p.setVelocity(randomValue(), randomValue());
      this.particles.push(p);
    }
  }

  public calculateAndDraw() {
    this.particles.forEach((p) => {
      p.calculatePosition(this.canvas.width, this.canvas.height);
      p.calculateVisibility(this.canvas.width, this.canvas.height);
    });
    this.draw();
  }

  public reset() {
    this.particles = [];
    this.state = "stopped";
  }

  /**
   * draw circular particles
   */
  private draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles
      .filter((p) => p.visible)
      .forEach((p) => this.drawSingleParticle(p.x, p.y));
  }

  private drawSingleParticle(x: number, y: number) {
    this.context.beginPath();
    this.context.arc(x, y, globals.PARTICLE_SIZE, 0, 2 * Math.PI);
    this.context.fillStyle = globals.PARTICLE_COLOR;
    this.context.fill();
    this.context.closePath();
  }
}
