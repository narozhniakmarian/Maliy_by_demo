import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ProductCard/ProductCard";
import { CartItem } from "@/hooks/useCart";
import css from "./ProductsSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import { Mousewheel, EffectCoverflow } from "swiper/modules";
import fetchStore from "@/lib/api/fetchStore/fetchStore";
import type { ProductData } from "../ProductCard/ProductCard";

SwiperCore.use([Pagination, Mousewheel]);

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  // description?: string;
}

interface ProductsSectionProps {
  onAddToCart: (product: CartItem) => void;
}

export default function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  // const [products, setProducts] = useState([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const maxVisibleDots = 5;
  const totalSlides = products.length;
  const swiperRef = useRef<any>(null);
  const getVisibleDots = () => {
    const start = Math.max(0, activeIndex - Math.floor(maxVisibleDots / 2));
    const end = Math.min(totalSlides, start + maxVisibleDots);
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchStore();
        // Normalize API data to match ProductCard.ProductData shape
        const normalized = (res.data || []).map((p: any) => ({
          _id: p._id,
          title: p.title || p.name || "",
          description: p.description || "",
          price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
          // API may return an array of images — take the first one
          image: Array.isArray(p.image) ? p.image[0] || "" : p.image || "",
          length: p.length,
          height: p.height,
          width: p.width,
          weight: p.weight,
          // API may return colors as array — join to single string for the card
          colors: Array.isArray(p.colors)
            ? p.colors.join(", ")
            : p.colors || "",
        }));

        setProducts(normalized);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const shadows = document.querySelectorAll(
        ".swiper-slide-shadow-left, .swiper-slide-shadow-right, .swiper-slide-shadow-coverflow",
      );
      shadows.forEach((el) => {
        el.setAttribute(
          "style",
          "background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0)); border-radius: 18px;",
        );
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="products" className={css.productsSection}>
      <div className="container">
        <div className={css.header}>
          <span className={css.label}>Наша колекція</span>
          <h2 className={css.title}>Наш топ</h2>
          <p className={css.description}>
            Шановний клієнте, якщо Ви бажаєте зробити індивідуальне замовлення,
            можна це зробити по телефону, або телеграм.
          </p>
        </div>
        {/* Swiper-слайдер */}
        <Swiper
          loop={true}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          initialSlide={1}
          centeredSlides={true}
          grabCursor={true}
          spaceBetween={20}
          speed={800}
          pagination={false}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          // pagination={{
          //   clickable: true,
          //   renderCustom: (swiper, current, total) => {
          //     const maxVisible = 5;
          //     const start = Math.max(0, current - Math.floor(maxVisible / 2));
          //     const end = Math.min(total, start + maxVisible);

          //     let bullets = "";
          //     for (let i = start; i < end; i++) {
          //       bullets += `<span class="custom-bullet ${i === current ? "active" : ""}" data-index="${i}"></span>`;
          //     }
          //     return `<div class="custom-pagination">${bullets}</div>`;
          //   },
          // }}
          // mousewheel={{ thresholdDelta: 30 }}
          // autoplay={{ delay: 3000, disableOnInteraction: false }}
          effect="coverflow"
          modules={[Pagination, Mousewheel, Autoplay, EffectCoverflow]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onClick={(swiper) => swiper.slideTo(swiper.clickedIndex)}
          className={css.swiper}
        >
          <div className={css.customPagination}>
            {getVisibleDots().map((i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`${css.dot} ${i === activeIndex ? css.activeDot : css.inactiveDot}`}
              />
            ))}
          </div>
          {products.map((product) => (
            <SwiperSlide key={product._id} className={css.swiperSlide}>
              <ProductCard
                data={product}
                onAddToCart={() =>
                  onAddToCart({
                    id: product._id,
                    name: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                }
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={css.customPagination}>
          {getVisibleDots().map((i) => (
            <button
              key={i}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              className={`${css.dot} ${i === activeIndex ? css.activeDot : css.inactiveDot}`}
            />
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
}
