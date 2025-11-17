import { useEffect, useRef } from "react";
import styles from "./WaveCanvas.module.css";

export default function WaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();
  const runningRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const computed = getComputedStyle(document.documentElement);
    const waveColor1 = computed.getPropertyValue("--wave-color-1").trim();
    const waveColor2 = computed.getPropertyValue("--wave-color-2").trim();
    const starColor = computed.getPropertyValue("--star-color").trim();

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 400;
    }

    resize();
    window.addEventListener("resize", resize);

    function draw(time: number) {
      if (!runningRef.current || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // хвилі
      ctx.save();
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        const k = i === 0 ? waveColor1 : waveColor2;
        for (let x = 0; x < canvas.width; x += 2) {
          let y =
            canvas.height * 0.6 +
            Math.sin((x + time / 18 + i * 110) * 0.012) *
              (26 + i * 9) *
              Math.sin(time / 410 + i * 1.7);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = k;
        ctx.fill();
      }
      ctx.restore();

      // зорі
      for (let i = 0; i < 36; i++) {
        ctx.beginPath();
        const x =
          (Math.sin(i * 33.2 + time * 0.0001) * canvas.width) / 2 +
          canvas.width / 2;
        const y =
          ((i * i * 156) % (canvas.height / 2)) +
          90 +
          Math.sin(time * 0.001 + i) * 9;
        const r = Math.abs(Math.sin(i * time * 0.000077)) * 0.9 + 0.5;
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    }

    draw(performance.now());

    return () => {
      runningRef.current = false;
      cancelAnimationFrame(frameRef.current!);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}
