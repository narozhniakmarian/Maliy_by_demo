import { useEffect, useRef } from "react";
import { EffectCards } from "swiper/modules";
import Swiper from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/effect-cards";
import css from "./SwiperAbout.module.css";
import "./swiperAbout.css";

interface SlideImage {
  title: string;
  image: string;
  alt: string;
}

export default function SwiperAbout() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      //   const swiperInstance = new Swiper(swiperRef.current, {
      //     effect: "cards",
      //     cardsEffect: {
      //       rotate: true,
      //     },
      //     grabCursor: true,
      //     initialSlide: 2,
      //     speed: 500,
      //     loop: true,
      //     mousewheel: {
      //       invert: false,
      //     },
      //   });
      //   window.addEventListener("resize", () => {
      //     swiperInstance.update();
      //   });
      //   return () => {
      //     window.removeEventListener("resize", () => {
      //       swiperInstance.update();
      //     });
      //   };
      var swiper = new Swiper(".swiperAbout", {
        effect: "cards",
        cardsEffect: {
          rotate: true,
        },
        grabCursor: true,
        initialSlide: 2,
        speed: 500,
        loop: true,
        mousewheel: {
          invert: false,
        },
      });
    }
  }, []);

  const slides = [
    {
      title: "The Queen's Gambit",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b6f5eb64-887c-43b1-aaba-d52a4c59a379",
    },
    {
      title: "Breaking Bad",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
      className: "img-position",
    },
    {
      title: "Breaking Bad",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
      className: "img-position",
    },
    {
      title: "Breaking Bad",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
      className: "img-position",
    },
    {
      title: "Breaking Bad",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
      className: "img-position",
    },
    {
      title: "Breaking Bad",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
      className: "img-position",
    },
    {
      title: "Breaking Bad",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/aa8fe914-741f-4bf4-ad4a-24f19d1f4178",
      className: "img-position",
    },
    {
      title: "Breaking Bad",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d5f10b4f-7d34-45bd-bb5f-5f1530c2ac1c",
      className: "img-position",
    },
    {
      title: "Breaking Bad",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7cbac263-7c55-4428-908e-31018dc1bce3",
      className: "img-position",
    },
    {
      title: "Breaking Bad",
      image:
        "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2929f534-3bc3-4cbd-b84c-80df863d5a38",
      className: "img-position",
    },
  ];
  return (
    <div className={css.swiprContainer}>
      <div className="swiperAbout" ref={swiperRef}>
        <div className="swiper-wrapper">
          {slides.map((slide) => (
            <div key={slide.title} className="swiper-slide">
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
