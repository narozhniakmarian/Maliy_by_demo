import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import "./ProductCard.css";

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
      className="showcase-carousel__image-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="showcase-carousel__image-left">
        <div
          className="showcase-carousel__image"
          style={{ backgroundImage: `url(${data.image})` }}
        ></div>
      </div>
      <div className="showcase-carousel__image-right">
        <div
          className="showcase-carousel__image"
          style={{ backgroundImage: `url(${data.image})` }}
        ></div>
      </div>
      <p>{data.title}</p>
      <div className="content">
        <div className="metaRow">
          <h3 className="title">"title"</h3>
          <div className="chips">
            {dimensions && <span className="chip">{dimensions}</span>}
            {weight && <span className="chip">{weight}</span>}
            {colors && <span className="chip">{colors}</span>}
          </div>
        </div>

        {data.description && <p className="description">{data.description}</p>}
        <div className="priceRow">
          <span className="price">${data.price.toFixed(2)}</span>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="star">
                ★
              </span>
            ))}
          </div>
        </div>
        <button onClick={() => onAddToCart(data)} className="cartButton">
          <ShoppingCart className="cartIcon" /> В кошик
        </button>
      </div>
    </div>
  );
}
