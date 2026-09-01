// Roadmap tarihleri için Intl yeter; tarih paketi eklenmiyor.
// Formatter modül seviyesinde bir kez kurulur, her çağrıda yeniden değil.
const monthYear = new Intl.DateTimeFormat("tr-TR", {
  month: "long",
  year: "numeric",
});

export function formatMonthYear(date: Date): string {
  return monthYear.format(date);
}

export function formatDateRange(start: Date, end: Date | null): string {
  const from = formatMonthYear(start);
  return end ? `${from} — ${formatMonthYear(end)}` : `${from} — devam ediyor`;
}
