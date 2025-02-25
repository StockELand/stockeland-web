/**
 * 날짜를 YYYY-MM-DD 형식의 문자열로 변환
 */
export function formatDate(date?: Date | null): string | null {
  if (!date) return null;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

export function formatISOToFullDate(date: string): string {
  return date.replace("T", " ").slice(0, -5);
}

export const parseLocalDate = (dateString?: string): Date | null => {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
};
