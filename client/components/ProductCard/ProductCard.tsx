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

  const dimsParts: string[] = [];
  if (data.length) dimsParts.push(`${data.length} мм`);
  if (data.width) dimsParts.push(`${data.width} мм`);
  if (data.height) dimsParts.push(`${data.height} мм`);
  const dimensions = dimsParts.join(" × ");
  const weight = data.weight ? `${data.weight} г` : null;
  const colors = data.colors ? data.colors : null;

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
        <div className={css.metaRow}>
          <h3 className={css.title}>{data.title}</h3>
          <div className={css.chips}>
            {dimensions && <span className={css.chip}>{dimensions}</span>}
            {weight && <span className={css.chip}>{weight}</span>}
            {colors && <span className={css.chip}>{colors}</span>}
          </div>
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
