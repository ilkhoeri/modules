import React from "react";
import { cn } from "str-merge";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  unstyled?: boolean;
  style?: React.CSSProperties & { [key: string]: any };
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { unstyled, className, spellCheck = false, ...props },
    ref
  ) {
    const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      event.currentTarget.style.height = "auto";
      event.currentTarget.style.height = `${event.currentTarget.scrollHeight + 2}px`;
      if (props.onInput) {
        props.onInput(event);
      }
    };

    return (
      <textarea
        {...{
          ref,
          onInput,
          spellCheck,
          className: cn(
            {
              "flex min-h-20 w-full max-w-full resize-y rounded-md border border-border bg-background p-3 py-2 text-sm leading-snug ring-offset-background scrollbar placeholder:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f81f7] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-base":
                !unstyled
            },
            "[field-sizing:content]",
            className
          ),
          ...props
        }}
      />
    );
  }
);
Textarea.displayName = "Textarea";
