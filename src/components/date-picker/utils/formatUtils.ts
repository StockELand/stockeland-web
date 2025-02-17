/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 */
export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * ISO 형식 (YYYY-MM-DDTHH:mm:ss.sssZ)에서 YYYY-MM-DD로 변환
 */
export function formatISODate(isoString: string): string {
  return isoString.split("T")[0];
}

export function formatLocalDate(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatISOToFullDate(date: string): string {
  return date.replace("T", " ").slice(0, -5);
}
