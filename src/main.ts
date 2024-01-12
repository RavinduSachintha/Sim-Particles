import globals from "./globals";
import { ParticleSystem } from "./particle-system";

const canvas = document.getElementById("pc") as HTMLCanvasElement;
const context = canvas.getContext("2d");

const emgRfs = document.getElementById("emg-refresh") as HTMLButtonElement;
const startBtn = document.getElementById("start") as HTMLButtonElement;
const pCount = document.getElementById("particle-count") as HTMLInputElement;
const pSize = document.getElementById("particle-size") as HTMLInputElement;

const ps: ParticleSystem = new ParticleSystem();

const setCanvasSize = () => {
  if (window.innerWidth >= 768) {
    // Laptop or larger screens
    canvas.width = 600;
    canvas.height = 600;
  } else {
    // Mobile screens
    canvas.width = 300;
    canvas.height = 300;
  }
};

const start = () => {
  ps.state = "started";
  globals.PARTICLE_SIZE = parseInt(pSize.value);

  pCount.disabled = true;
  pSize.disabled = true;

  ps.generate(parseInt(pCount.value), 300, 300);

  const animate = (timestamp: number) => {
    ps.calculateAndDraw();

    if (ps.state === "started") {
      window.requestAnimationFrame(animate);
    }
  };

  window.requestAnimationFrame(animate);
};

const stop = () => {
  pCount.disabled = false;
  pSize.disabled = false;
  ps.reset();
};

/**
 * main function that executes the logic
 */
const main = () => {
  setCanvasSize();

  if (context != null) {
    ps.setCanvas(canvas);
    ps.setContext(context);
  }

  emgRfs.addEventListener("click", () => {
    window.location.reload();
  });

  startBtn.addEventListener("click", () => {
    switch (ps.state) {
      case "stopped":
        start();
        startBtn.innerText = "Stop Simulation";
        startBtn.style.backgroundColor = "#777777";
        break;
      case "started":
        stop();
        startBtn.innerText = "Start Simulation";
        startBtn.style.backgroundColor = "green";
        break;
      default:
        break;
    }
  });
};

main();
