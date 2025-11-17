import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import css from "./ProductCard.module.css";

interface ProductData {
  id: string;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
}

interface ProductCardProps extends ProductData {
  onAddToCart: (product: ProductData) => void;
  onOpenDetails: (product: ProductData) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  description,
  onAddToCart,
  onOpenDetails,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={css.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={image}
        alt={name}
        className={`${css.image} ${isHovered ? css.imageZoom : ""}`}
      />

      <div className={css.content}>
        <h3 className={css.title}>{name}</h3>

        {description && <p className={css.description}>{description}</p>}

        <div className={css.priceRow}>
          <span className={css.price}>${price.toFixed(2)}</span>
          <div className={css.stars}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={css.star}>
                ★
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onAddToCart({ id, name, price, image, description })}
          className={css.cartButton}
        >
          <ShoppingCart className={css.cartIcon} />В кошик
        </button>
        <button
          onClick={() => onOpenDetails({ id })}
          className={css.buttonDetailis}
        >
          {" "}
          Деталі
        </button>
      </div>
    </div>
  );
}
