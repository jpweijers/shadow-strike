import { GameLoop } from "./core/game-loop";

const DEBUG = process.env.NODE_ENV === "development";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;

  if (!canvas) {
    throw new Error("Canvas not found");
  }

  canvas.width = 1280;
  canvas.height = 720;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context not found");
  }

  ctx.strokeStyle = "red";
  ctx.fillStyle = "white";
  ctx.font = "12px Arial";

  new GameLoop(ctx, DEBUG).loop(0);
});
