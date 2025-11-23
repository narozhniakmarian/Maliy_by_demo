import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, FreeMode, Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./ProductsSection.css";
import ProductCard from "../ProductCard/ProductCard";
import { CartItem } from "@/hooks/useCart";
import SwiperCore from "swiper";
import { Pagination, Autoplay } from "swiper/modules";
import fetchStore from "@/lib/api/fetchStore/fetchStore";

SwiperCore.use([Pagination, Mousewheel]);

interface Product {
  _id: string;
  title: string;
  description?: string;
  price: number;
  image?: string;
}

interface ProductsSectionProps {
  onAddToCart: (product: CartItem) => void;
}

export default function ProductsSection({ onAddToCart }: ProductsSectionProps) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetchStore();

        console.log("loadProduct :", res.data);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const video = document.querySelector("video");
    if (video) video.playbackRate = 2;
  }, []);

  return (
    <section className="showcase">
      <h2 className="showcase__header">
        Hoodie <span>Mantle</span>
      </h2>

      <div className="showcase__content-wrapper">
        <div className="showcase__content">
          <div className="showcase-carousel">
            <Swiper
              loop
              slidesPerView={3}
              speed={800}
              grabCursor={true}
              simulateTouch={true}
              centeredSlides={true}
              slideToClickedSlide={true}
              modules={[Navigation, Mousewheel, FreeMode, Scrollbar, Autoplay]}
              className="carousel"
            >
              {products.map((product) => (
                <SwiperSlide
                  key={product._id}
                  className="showcase-carousel__item"
                >
                  <ProductCard
                    data={product}
                    onAddToCart={() =>
                      onAddToCart({
                        id: product._id,
                        price: product.price,
                        title: product.title,
                        quantity: 1,
                      })
                    }
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* <div className="showcase-navigation">
              <div className="showcase-navigation__next">→</div>
            </div> */}
          </div>
        </div>
      </div>

      <video
        src="https://res.cloudinary.com/dg8q6nv9s/video/upload/v1763773119/smoke-background-optimized_jc0ikt.mp4"
        className="showcase__video"
        autoPlay
        loop
        muted
      ></video>
    </section>
  );
}
