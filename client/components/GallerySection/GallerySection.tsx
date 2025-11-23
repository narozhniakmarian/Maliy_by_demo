import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/autoplay";
import "./GallerySection.css";
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
        spaceBetween: 10,
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
      window.addEventListener("resize", swiperInstance.update);
      return () => {
        window.removeEventListener("resize", swiperInstance.update);
      };
    }
  }, []);

  useEffect(() => {
    async function loadGallery() {
      try {
        const galleryData = await fetchGallery();
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
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="gallery__container">
          <h2 className="gallery__title scroll-animate-up">Фотогалерея</h2>
          <div
            className="swiper gallery__slider"
            ref={swiperRef}
            id="gallery-swiper"
          >
            <div className="swiper-wrapper">
              {galleryImages.map((image) => (
                <div key={image._id} className="slide swiper-slide">
                  <img
                    src={image.image}
                    alt={image.description}
                    className="gallery-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
