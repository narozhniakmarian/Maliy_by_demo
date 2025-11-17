import css from "./AboutSection.module.css";
import { useEffect, useRef } from "react";
import { EffectCards } from "swiper/modules";
import Swiper from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/effect-cards";
import SwiperAbout from "./swiperAbout/swiperAbout";

interface SlideImage {
  title: string;
  image: string;
  alt: string;
}

export default function AboutSection() {
  // const swiperRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (swiperRef.current) {
  //     const swiperInstance = new Swiper(swiperRef.current, {
  //       effect: "cards",
  //       cardsEffect: {
  //         rotate: true,
  //       },
  //       grabCursor: true,
  //       initialSlide: 2,
  //       speed: 500,
  //       loop: true,
  //       mousewheel: {
  //         invert: false,
  //       },
  //     });
  //     window.addEventListener("resize", () => {
  //       swiperInstance.update();
  //     });
  //     return () => {
  //       window.removeEventListener("resize", () => {
  //         swiperInstance.update();
  //       });
  //     };
  //   }
  // }, []);

  // const slides = [
  //   {
  //     title: "The Queen's Gambit",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b6f5eb64-887c-43b1-aaba-d52a4c59a379",
  //   },
  //   {
  //     title: "Breaking Bad",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
  //     className: "img-position",
  //   },
  //   {
  //     title: "Breaking Bad",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
  //     className: "img-position",
  //   },
  //   {
  //     title: "Breaking Bad",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
  //     className: "img-position",
  //   },
  //   {
  //     title: "Breaking Bad",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
  //     className: "img-position",
  //   },
  //   {
  //     title: "Breaking Bad",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/e906353b-fde0-4518-9a03-16545c1161bd",
  //     className: "img-position",
  //   },
  //   {
  //     title: "Breaking Bad",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/aa8fe914-741f-4bf4-ad4a-24f19d1f4178",
  //     className: "img-position",
  //   },
  //   {
  //     title: "Breaking Bad",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/d5f10b4f-7d34-45bd-bb5f-5f1530c2ac1c",
  //     className: "img-position",
  //   },
  //   {
  //     title: "Breaking Bad",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7cbac263-7c55-4428-908e-31018dc1bce3",
  //     className: "img-position",
  //   },
  //   {
  //     title: "Breaking Bad",
  //     image:
  //       "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/2929f534-3bc3-4cbd-b84c-80df863d5a38",
  //     className: "img-position",
  //   },
  // ];
  return (
    <section id="about" className={css.aboutSection}>
      <div className="container">
        <div className={css.grid}>
          {/* Image */}
          {/* <div className={css.swiperContainer}></div> */}
          {/* <SwiperAbout /> */}
          {/* Text Content */}
          <div className={css.textContent}>
            <div>
              <span className={css.label}>Про нас</span>
              <h2 className={css.title}>Майстерність, що ловить серце</h2>
            </div>

            <p className={css.paragraph}>
              Ми — майстерня, де кожен воблер народжується з натхнення, досвіду
              і любові до риболовлі. Власноруч виготовляємо форму,
              розмальовуємо, лакуємо — і пакуємо в оригінальну упаковку, щоб
              кожен виріб був не просто снастю, а частиною історії.
            </p>

            <p className={css.paragraph}>
              Наші клієнти — це рибалки, які цінують індивідуальність. Ми
              створюємо воблери на замовлення, але також розвиваємо серійне
              виробництво, щоб більше людей могли відчути різницю між фабрикою і
              ремеслом.
            </p>

            <div className={css.stats}>
              <div className={css.stat}>
                <div className={css.statNumber}>500+</div>
                <p className={css.statLabel}>Замолень</p>
              </div>
              <div className={css.stat}>
                <div className={css.statNumber}>100+</div>
                <p className={css.statLabel}>Моделей, барв</p>
              </div>
              <div className={css.stat}>
                <div className={css.statNumber}>5</div>
                <p className={css.statLabel}>
                  Регіональних магазинів з наими співпрацюють
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
