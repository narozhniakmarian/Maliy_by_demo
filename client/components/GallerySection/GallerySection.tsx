import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import css from "./GallerySection.module.css";
import fetchGallery from "@/lib/api/fetchGaleery/fetchGaleery";

interface GalleryImage {
  id: string;
  image: string;
  alt: string;
}

export default function GallerySection() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = new Swiper(swiperRef.current, {
        loop: true,
        grabCursor: true,
        initialSlide: 2,
        centeredSlides: true,
        spaceBetween: 6,
        speed: 800,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
      window.addEventListener("resize", () => {
        swiperInstance.update();
      });
      return () => {
        window.removeEventListener("resize", () => {
          swiperInstance.update();
        });
      };
    }
  }, []);
async function loadGallery() {
  try {
    const galleryData = await fetchGallery();
    console.log("Gallery Data:", galleryData.data);
  } catch (error) {
    console.error("Error fetching gallery data:", error);
  }
}
loadGallery();


  const mockImages: GalleryImage[] = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      alt: "Fishing lure close-up",
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop",
      alt: "Artisan workspace",
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      alt: "Fishing at sunset",
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      alt: "Lure collection",
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop",
      alt: "Workshop detail",
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      alt: "River fishing",
    },
  ];

  return (
    <section id="gallery" className={css.gallery}>
      <div className="container">
        <div className={css.galleryContainer}>
          <h2 className={css.title}>Фотогалерая </h2>
          <div className={css.swiperContainer}>
            <div className="swiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {mockImages.map((image) => (
                  <div key={image.id} className="swiper-slide">
                    <div className={css.swiperSlide}>
                      <img src={image.image} alt={image.alt} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
