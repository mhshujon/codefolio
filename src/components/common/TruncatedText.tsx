import { useState, useRef, useLayoutEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type TruncatedTextProps = {
    text: string;
    maxLines?: number;
};

export default function TruncatedText({ text, maxLines = 2 }: TruncatedTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useLayoutEffect(() => {
        const checkTruncation = () => {
            const element = textRef.current;
            if (!element) return;

            // Get line height and total height
            const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
            const maxHeight = lineHeight * maxLines;

            // Check if content exceeds max height
            setIsTruncated(element.scrollHeight > maxHeight);
        };

        checkTruncation();

        // Recheck on window resize
        window.addEventListener('resize', checkTruncation);
        return () => window.removeEventListener('resize', checkTruncation);
    }, [text, maxLines]);

    return (
        <div className="relative">
            <p
                ref={textRef}
                className={`text-gray-600 ${
                    !isExpanded ? `line-clamp-${maxLines}` : ''
                }`}
            >
                {text}
            </p>
            {isTruncated && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 mt-1"
                >
                    {isExpanded ? (
                        <>Show Less <ChevronUp size={16} /></>
                    ) : (
                        <>Read More <ChevronDown size={16} /></>
                    )}
                </button>
            )}
        </div>
    );
}