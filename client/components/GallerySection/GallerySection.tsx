import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import "swiper/css/autoplay";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import css from "./GallerySection.module.css";
import fetchGallery from "@/lib/api/fetchGaleery/fetchGaleery";

interface GalleryImage {
  _id: string;
  image: string;
  description: string;
}

export default function GallerySection() {
  const swiperRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

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

  useEffect(() => {
    async function loadGallery() {
      try {
        const galleryData = await fetchGallery();
        // Normalize API response: some endpoints may return { data: [...] } or [...] directly
        const items = Array.isArray(galleryData)
          ? galleryData
          : Array.isArray((galleryData as any)?.data)
          ? (galleryData as any).data
          : [];
        setGalleryImages(items);
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    }
    loadGallery();
  }, []);

  return (
    <section id="gallery" className={css.gallery}>
      <div className="container">
        <div className={css.galleryContainer}>
          <h2 className={css.title}>Фотогалерая </h2>
          <div className={css.swiperContainer}>
            <div className="swiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {(galleryImages || []).map((image) => (
                  <div key={image._id} className="swiper-slide">
                    <div className={css.swiperSlide}>
                      <img src={image.image} alt={image.description} />
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
