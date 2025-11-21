import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import css from "./ProductCard.module.css";

export interface ProductData {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  length?: number;
  height?: number;
  width?: number;
  weight?: number;
  colors?: string;
}

interface ProductCardProps {
  data: ProductData;
  onAddToCart: (product: ProductData) => void;
}

export default function ProductCard({ data, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={data._id}
      className={css.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={data.image}
        alt={data.title}
        className={`${css.image} ${isHovered ? css.imageZoom : ""}`}
      />

      <div className={css.content}>
        <h3 className={css.title}>{data.title}</h3>
        <div className={css.parametrs}>
          {data.length && <p className={css.length}>{data.length} мм</p>}
          {data.height && <p className={css.height}>{data.height} мм</p>}
          {data.width && <p className={css.width}>{data.width} мм</p>}
          {data.weight && <p className={css.weight}>{data.weight} г</p>}
          {data.colors && <p className={css.colors}>{data.colors}</p>}
        </div>

        {data.description && (
          <p className={css.description}>{data.description}</p>
        )}
        <div className={css.priceRow}>
          <span className={css.price}>${data.price.toFixed(2)}</span>
          <div className={css.stars}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={css.star}>
                ★
              </span>
            ))}
          </div>
        </div>
        <button onClick={() => onAddToCart(data)} className={css.cartButton}>
          <ShoppingCart className={css.cartIcon} /> В кошик
        </button>
      </div>
    </div>
  );
}
