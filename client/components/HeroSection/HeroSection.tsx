import { useEffect, useRef, useState } from "react";
import css from "./HeroSection.module.css";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setMousePos({ x: x * 20, y: y * 20 });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current) return;

      const touch = e.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width - 0.5;
      const y = (touch.clientY - rect.top) / rect.height - 0.5;

      setMousePos({ x: x * 20, y: y * 20 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("touchmove", handleTouchMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchmove", handleTouchMove);
      }
    };
  }, []);

  return (
    <section id="hero" ref={containerRef} className={css.heroSection}>
      {/* Background Image with Parallax */}
      <div
        ref={imageRef}
        className={css.heroBg}
        style={{
          transform: `perspective(1200px) rotateX(${mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg) scale(1.05)`,
        }}
      >
        <div className={css.heroOverlay} />
        <img
          className={css.heroImage}
          src="https://ik.imagekit.io/bmzutqlkz/Hero/layer-1.png"
          alt=""
        />
      </div>
      <img
        className={css.heroStaticLayer}
        src="https://ik.imagekit.io/bmzutqlkz/Hero/layer-2.png"
        alt=""
      />

      {/* Content */}
      <div className={css.heroContent}>
        <h1 className={css.heroTitle}>Слабкість хижака</h1>
        <p className={css.heroSubtitle}>
          Воблери на замовлення — форма, колір, бойове маскування. Ти вибираєш,
          ми створюємо.
        </p>
        <button className={css.heroButton}>Explore Collection</button>
      </div>
    </section>
  );
}
