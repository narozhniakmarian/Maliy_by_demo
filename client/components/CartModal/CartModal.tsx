import { useState } from "react";
import { toast } from "sonner";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { CartItem } from "@/hooks/useCart";
import css from "./CartModal.module.css";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

// Санітація введення
function sanitizeInput(input: string): string {
  const div = document.createElement("div");
  div.textContent = input;
  return div.innerHTML.trim();
}

export default function CartModal({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const orderNumber = `ORD-${Date.now()}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const sanitizedName = sanitizeInput(formData.name);
      const sanitizedPhone = sanitizeInput(formData.phone);
      const sanitizedComment = sanitizeInput(formData.comment);

      const orderDetails = items
        .map(
          (item) =>
            `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`,
        )
        .join("\n");

      const message = `🎣 НОВЕ ЗАМОВЛЕННЯ: ${orderNumber}\n\n📋 Позиції:\n${orderDetails}\n\n💰 Разом: $${totalPrice.toFixed(
        2,
      )}\n\n👤 Клієнт:\nІм’я: ${sanitizedName}\nТелефон: ${sanitizedPhone}\n${
        sanitizedComment ? `Коментар: ${sanitizedComment}` : ""
      }`;

      console.log("Order submitted:", message);
      toast.success(
        "Замовлення надіслано! Ми зв’яжемось з вами найближчим часом.",
      );

      setFormData({ name: "", phone: "", comment: "" });
      onClearCart();
      onClose();
    } catch (error) {
      toast.error("Помилка надсилання замовлення. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <div className={css.header}>
          <h2 className={css.title}>Ваш кошик</h2>
          <button
            onClick={onClose}
            className={css.closeButton}
            aria-label="Закрити"
          >
            <X className={css.icon} />
          </button>
        </div>

        <div className={css.content}>
          {/* Ліва частина — товари */}
          <div>
            <h3 className={css.sectionTitle}>Позиції</h3>
            <div className={css.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={css.item}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className={css.itemImage}
                    />
                  )}
                  <div className={css.itemDetails}>
                    <h4 className={css.itemName}>{item.name}</h4>
                    <p className={css.itemPrice}>${item.price.toFixed(2)}</p>
                    <div className={css.quantityControls}>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className={css.quantityButton}
                        aria-label="Зменшити кількість"
                      >
                        <Minus className={css.iconSmall} />
                      </button>
                      <span className={css.quantity}>{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className={css.quantityButton}
                        aria-label="Збільшити кількість"
                      >
                        <Plus className={css.iconSmall} />
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className={css.removeButton}
                        aria-label="Видалити товар"
                      >
                        <Trash2 className={css.iconSmall} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={css.summary}>
              <p className={css.orderNumber}>
                Номер замовлення: <span>{orderNumber}</span>
              </p>
              <div className={css.total}>
                Разом: {totalPrice.toFixed(2)} грн
              </div>
            </div>
          </div>

          {/* Права частина — форма */}
          <div>
            <h3 className={css.sectionTitle}>Контактна інформація</h3>
            <form onSubmit={handleSubmit} className={css.form}>
              <div>
                <label className={css.label}>Ім’я та прізвище *</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={css.input}
                  placeholder="Іван Непереможний"
                />
              </div>

              <div>
                <label className={css.label}>Телефон *</label>
                <input
                  type="tel"
                  required
                  maxLength={20}
                  pattern="^\+?[0-9\s\-\(\)]{7,20}$"
                  title="Введіть коректний номер телефону"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={css.input}
                  placeholder="+38 (099) 000-0000"
                />
              </div>

              <div>
                <label className={css.label}>Коментар</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  className={css.textarea}
                  rows={4}
                  maxLength={300}
                  placeholder="Коментарі та побажання..."
                />
              </div>

              <div className={css.hints}>
                <p>
                  Це індивідуальне замовлення — просто заповніть форму, і наш
                  менеджер зв’яжеться з вами для уточнення деталей.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={css.submitButton}
              >
                {isSubmitting ? "Надсилаємо..." : "Надіслати замовлення"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
