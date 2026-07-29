export const RED_LINE_PATTERNS = [
  /捐款/,
  /捐助/,
  /捐贈/,
  /募款/,
  /勸募/,
  /樂捐/,
  /善款/,
  /匯款/,
  /戶頭/,
  /轉帳/,
  /抵稅/,
  /收據/,
  /懇請/,
  /拜託拜託/,
  /乞求/,
  /乞丐/,
  /幫幫/,
  /請大家幫/,
  /善心菩薩/,
  /善友/,
  /沒有收入/,
  /没有收入/,
  /變貧戶/,
  /吃泡麵/,
  /[\d一二三四五六七八九十百千兩]+\s*(萬|塊|千|元)/,
  /(?<![A-Za-z])\d{3,}(?![個隻天週年月位貓狗匹頭次])/,
] as const;

export function matchedRedLine(message: string): string | null {
  for (const pattern of RED_LINE_PATTERNS) {
    const match = message.match(pattern);
    if (match) return match[0];
  }
  return null;
}
