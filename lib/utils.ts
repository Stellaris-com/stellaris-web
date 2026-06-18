import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const ACCENT_COLORS = [
  "#9453ED",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
] as const;

const STOP_WORDS = ["de", "da", "do", "das", "dos", "e"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Deriva a cor ( accent color ) do usuário dentro servidor a partir do id (ex.: "647383g36-333" -> "#4657FF36"). */
export function getUserAccentColor(userId: string): string {
  const hash = [...userId].reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return ACCENT_COLORS[hash % ACCENT_COLORS.length];
}

/** Deriva a sigla do servidor a partir do nome (ex.: "Design Lab" -> "DL"). */
export function deriveAcronym(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter((word) => !STOP_WORDS.includes(word.toLowerCase()));

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/** Formata uma string ISO para uma string com formato de dia, data e hora :
- Hoje às 14:58
- Ontem às 18:21
- 18/06/2026 às 09:10
*/
export function formatDateTime(iso: string): string {
  const date = new Date(iso);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = date.toDateString() === today.toDateString();
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) {
    return `Hoje às ${time}`;
  }

  if (isYesterday) {
    return `Ontem às ${time}`;
  }

  return `${date.toLocaleDateString("pt-BR")} às ${time}`;
}
