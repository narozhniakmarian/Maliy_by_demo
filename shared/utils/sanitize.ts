// shared/utils/sanitize.ts

/**
 * Видаляє потенційно небезпечні HTML-теги та скрипти
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script.*?>.*?<\/script>/gi, "") // видаляє <script>...</script>
    .replace(/<[^>]+>/g, "") // видаляє всі HTML-теги
    .replace(/&[a-z]+;/gi, "") // видаляє HTML-ентіті
    .trim();
}

/**
 * Обмежує довжину рядка і санітайзить
 */
export function sanitizeAndTrim(input: string, maxLength = 200): string {
  return sanitizeInput(input).slice(0, maxLength);
}

/*🧠 Як використовувати
🔹 У бекенді (controllersProduct.ts)
import { sanitizeInput } from "@shared/utils/sanitize";

const cleanTitle = sanitizeInput(req.body.title);


🔹 У фронті (ProductForm.tsx)
import { sanitizeAndTrim } from "@shared/utils/sanitize";

const safeDescription = sanitizeAndTrim(userInput.description, 500);




*/
