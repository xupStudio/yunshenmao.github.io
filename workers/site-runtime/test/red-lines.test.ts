import { describe, expect, it } from "vitest";
import { matchedRedLine } from "../src/red-lines";

describe("matchedRedLine", () => {
  it.each(["請幫忙捐款", "匯款到戶頭", "懇請大家幫幫忙", "需要 3000 元"])(
    "blocks fundraising language: %s",
    (message) => {
      expect(matchedRedLine(message)).not.toBeNull();
    },
  );

  it.each(["今天有 80 隻貓", "飼料是 K36", "小花今天有精神了"])(
    "keeps ordinary journal language: %s",
    (message) => {
      expect(matchedRedLine(message)).toBeNull();
    },
  );
});
