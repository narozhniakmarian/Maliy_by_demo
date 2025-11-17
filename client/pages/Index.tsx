import { useState, useEffect } from "react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProductsSection from "@/components/ProductsSection/ProductsSection";
import GallerySection from "@/components/GallerySection/GallerySection";
import CartModal from "@/components/CartModal/CartModal";
import Footer from "@/components/Footer/Footer";
import { useCart } from "@/hooks/useCart";

export default function Index() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalPrice,
  } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddToCart = (product: Parameters<typeof addItem>[0]) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SEO />
      <div className="bg-background text-foreground">
        <Header
          cartCount={items.length}
          onCartClick={() => setIsCartOpen(true)}
        />

        <main>
          <HeroSection />
          <AboutSection />
          <ProductsSection onAddToCart={handleAddToCart} />
          <GallerySection />
        </main>

        <Footer />

        <CartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
        />
      </div>
    </>
  );
}
