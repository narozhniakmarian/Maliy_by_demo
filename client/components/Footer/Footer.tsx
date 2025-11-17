import { FaBeer } from "react-icons/fa";
import css from "./Footer.module.css";
import WaveCanvas from "./WaveCanvas";
import { SiInstagram, SiTelegram, SiTicktick, SiTiktok } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className={css.footer}>
      <WaveCanvas />
      <div className="container">
        <div className={css.grid}>
          {/* Brand */}
          <div>
            <h3 className={css.brand}>Maliy</h3>
            <p className={css.description}>
              Ручне виготовлення воблерів оригінальної формиб кольору та бойовим
              маскуванням
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={css.heading}>Швидкі посилання</h4>
            <ul className={css.linkList}>
              <li>
                <a href="#" className={css.link}>
                  Головна
                </a>
              </li>
              <li>
                <a href="#products" className={css.link}>
                  Товари
                </a>
              </li>
              <li>
                <a href="#about" className={css.link}>
                  Про нас
                </a>
              </li>
              <li>
                <a href="#gallery" className={css.link}>
                  Галерея фото
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className={css.heading}>Підтримка</h4>
            <ul className={css.linkList}>
              <li>
                <a href="#" className={css.link}>
                  Сонтакт
                </a>
              </li>
              <li>
                <a href="#" className={css.link}>
                  Інфо довідка
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className={css.heading}>Підписка</h4>
            <div className={css.socialIcons}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className={css.socialButton}
                aria-label="Instagram"
              >
                <SiInstagram className={css.icon} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className={css.socialButton}
                aria-label="TikTok"
              >
                <SiTiktok className={css.icon} />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className={css.socialButton}
                aria-label="Telegram"
              >
                <SiTelegram className={css.icon} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={css.bottom}>
          <p>&copy; {currentYear} Malyi - Креативні фоблери.</p>
          <div className={css.bottomLinks}>
            <a href="#" className={css.link}>
              Privacy Policy
            </a>
            <a href="#" className={css.link}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
