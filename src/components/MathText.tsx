"use client";

import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface MathTextProps {
  text?: string;
  math?: string;
  block?: boolean;
}

export default function MathText({
  text,
  math,
  block = false,
}: MathTextProps) {
  if (math) {
    if (block) {
      return <BlockMath math={math} />;
    }
    return <InlineMath math={math} />;
  }

  if (!text) return null;

  // Split by inline math \(...\) and block math \[...\]
  const regex = /(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/g;
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("\\(") && part.endsWith("\\)")) {
          return <InlineMath key={i} math={part.slice(2, -2)} />;
        } else if (part.startsWith("\\[") && part.endsWith("\\]")) {
          return <BlockMath key={i} math={part.slice(2, -2)} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}