"use client";
import * as React from "react";
import { mergeRefs } from "@/hooks/use-merged-ref";
import { cn } from "str-merge";

interface UseTypingWords {
  placeholders: string[];
  duration?: {
    /** Pause between words @default 1000 */
    break?: number;
    /** Typing speed @default 200 */
    typing?: number;
    /** Erase speed @default 100 */
    deleting?: number;
    /** Pause before deleting @default 1000 */
    pauseBeforeDelete?: number;
  };
}
export type TypingWordsType = UseTypingWords & {
  el?: React.ElementType;
  withCursor?: boolean;
} & Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    "style" | "children"
  > & { style?: React.CSSProperties & { [key: string]: any } };

export function useTypingWords({ duration, placeholders }: UseTypingWords) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    let animationId: NodeJS.Timeout | null = null;

    const getRandomDelayBetween = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const setTextContent = (element: HTMLElement, text: string) => {
      element.textContent = text;
    };

    // Function to type text sequentially
    const animateTextTyping = (
      currentText: string[],
      remainingText: string[],
      element: HTMLElement,
      onAnimationEnd: () => void
    ) => {
      if (!remainingText.length) {
        onAnimationEnd();
        return;
      }
      currentText.push(remainingText.shift() ?? "");
      animationId = setTimeout(
        () => {
          setTextContent(element, currentText.join(""));
          animateTextTyping(
            currentText,
            remainingText,
            element,
            onAnimationEnd
          );
        },
        getRandomDelayBetween(duration?.typing || 200, duration?.typing || 200)
      );
    };

    // Function to delete text sequentially (reverse typing)
    const animateTextDeleting = (
      currentText: string[],
      element: HTMLElement,
      onAnimationEnd: () => void
    ) => {
      if (!currentText.length) {
        onAnimationEnd();
        return;
      }
      currentText.pop();
      animationId = setTimeout(
        () => {
          setTextContent(element, currentText.join(""));
          animateTextDeleting(currentText, element, onAnimationEnd);
        },
        getRandomDelayBetween(
          duration?.deleting || 100,
          duration?.deleting || 100
        )
      );
    };

    const animatePlaceholder = (
      element: HTMLElement,
      placeholder: string,
      onAnimationEnd: () => void
    ) => {
      const currentText: string[] = [];
      const remainingText = placeholder.split("");

      // The process of typing then pausing before deleting
      animateTextTyping(currentText, remainingText, element, () => {
        animationId = setTimeout(
          () => {
            animateTextDeleting(currentText, element, onAnimationEnd);
          },
          duration?.pauseBeforeDelete || 1000 // Pause before starting to erase
        );
      });
    };

    const startAnimation = (index: number) => {
      const element = ref.current;
      if (!element) return;
      const nextIndex = (index + 1) % placeholders.length;
      animatePlaceholder(element, placeholders[index], () => {
        animationId = setTimeout(
          () => startAnimation(nextIndex),
          duration?.break || 1000
        );
      });
    };

    startAnimation(0);

    return () => {
      if (animationId) {
        clearTimeout(animationId);
      }
    };
  }, [duration, placeholders]);

  return ref;
}

export const TypingWords = React.forwardRef<HTMLElement, TypingWordsType>(
  function (_props, ref) {
    const {
      el = "div",
      placeholders,
      duration,
      suppressHydrationWarning = true,
      withCursor,
      className,
      ...props
    } = _props;
    const typingRef = useTypingWords({ placeholders, duration });
    const Root = el as React.ElementType;
    return (
      <Root
        {...{
          ref: mergeRefs(typingRef, ref),
          suppressHydrationWarning,
          "data-anim": "TypingWords",
          className: cn(
            {
              "relative [display:ruby-text] after:content-[''] after:relative after:block after:-bottom-1 after:overflow-hidden after:bg-transparent after:border-solid after:h-[--cursor-h,20px] after:[border-right:var(--cursor-w,0.15rem)_solid_var(--cursor-color,#e34ba9)] after:animate-cursor-bar":
                withCursor
            },
            className
          ),
          ...props
        }}
      />
    );
  }
);
TypingWords.displayName = "TypingWords";
