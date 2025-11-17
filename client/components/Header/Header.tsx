import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useCart } from "@/hooks/useCart";
import css from "./Header.module.css";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Products", id: "products" },
    { label: "Gallery", id: "gallery" },
    { label: "Contact", id: "footer" },
  ];

  return (
    <header
      className={`${css.header} ${scrolled ? css.scrolled : css.transparent}`}
    >
      <div className="container">
        <div className={css.SectionContainer}>
          {/* Logo */}
          <div className={css.logo}>Maliy</div>

          {/* Desktop Navigation */}
          <nav className={css.nav}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={css.navItem}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className={css.navButton}>
            <button
              onClick={onCartClick}
              className={css.bag}
              aria-label="Shopping cart"
            >
              <ShoppingCart className={css.shoppingCart} />
              {cartCount > 0 && (
                <span className={css.cartCounter}>{cartCount}</span>
              )}
            </button>

            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={css.menuToggle}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={css.icon} />
              ) : (
                <Menu className={css.icon} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className={css.mobileNav}>
            <div className={css.mobileLayoutContainer}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={css.mobileNavItem}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
