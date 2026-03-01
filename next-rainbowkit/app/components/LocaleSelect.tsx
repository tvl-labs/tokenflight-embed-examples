"use client";

import { useLocale } from "../context/locale";

export function LocaleSelect() {
  const { locale, setLocale } = useLocale();

  return (
    <select
      className="locale-select"
      aria-label="Language"
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
    >
      <option value="en-US">EN</option>
      <option value="zh-CN">中文</option>
      <option value="zh-TW">繁體</option>
      <option value="ja-JP">日本語</option>
      <option value="ko-KR">한국어</option>
    </select>
  );
}
