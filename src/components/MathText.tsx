"use client";

import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface MathTextProps {
    math: string;
    block?: boolean;
}

export default function MathText({
    math,
    block = false,
}: MathTextProps) {
    if (block) {
        return <BlockMath math={math} />;
    }

    return <InlineMath math={math} />;
}