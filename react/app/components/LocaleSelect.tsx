"use client";

import { useCallback } from "react";

export function LocaleSelect() {
  const onChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    document.getElementById("swap-widget")?.setAttribute("locale", e.target.value);
  }, []);

  return (
    <select className="locale-select" aria-label="Language" onChange={onChange} defaultValue="en-US">
      <option value="en-US">EN</option>
      <option value="zh-CN">中文</option>
      <option value="zh-TW">繁體</option>
      <option value="ja-JP">日本語</option>
      <option value="ko-KR">한국어</option>
    </select>
  );
}
