"use client";
import * as React from "react";
import { cn } from "str-merge";

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
type StylesNames<T extends string> = {
  classNames?: Partial<Record<T, string>>;
  styles?: Partial<Record<T, CSSProperties>>;
  style?: CSSProperties;
  unstyled?: boolean;
};

type RatingStarsProps = StylesNames<"wrap" | "span" | "icon"> & {
  /** Total number of stars */
  totalStars?: number;
  /** Initial rating */
  rating?: number;
  /** Callback to receive ratings from users */
  onRatingChange?: (rating: number) => void;
  /** If `true`, the star can be clicked to give a rating. */
  interactive?: boolean;
} & Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "children"
  >;

export const RatingStars = React.forwardRef<HTMLDivElement, RatingStarsProps>(
  function RatingStars(
    {
      rating = 0,
      totalStars = 5,
      onRatingChange,
      className,
      classNames,
      style,
      styles,
      unstyled,
      ...props
    },
    ref
  ) {
    const [isRating, setIsRating] = React.useState(rating);
    const handleRating = (rate: number) => {
      const newRating = rate === isRating ? rate - 1 : rate;
      setIsRating(newRating);
      if (onRatingChange) onRatingChange(newRating);
    };

    return (
      <div
        {...{
          ref,
          className: cn(
            { "flex flex-row flex-nowrap items-center gap-1": !unstyled },
            className,
            classNames?.wrap
          ),
          style: { ...style, ...styles?.wrap },
          ...props
        }}
      >
        {[...Array(totalStars)].map((_, index) => (
          <span
            key={index}
            {...{
              className: cn(
                {
                  "cursor-pointer fill-[#666] [--sz-stars:1.25rem] data-[rating=active]:fill-[#ffa621]":
                    !unstyled
                },
                classNames?.span
              ),
              style: styles?.span
            }}
            onClick={() => handleRating(index + 1)}
            data-rating={index + 1 <= isRating ? "active" : undefined}
          >
            <svg
              viewBox="0 0 24 24"
              stroke="none"
              xmlns="http://www.w3.org/2000/svg"
              {...{
                className: cn(
                  {
                    "size-[--sz-stars] max-h-[--sz-stars] min-h-[--sz-stars] min-w-[--sz-stars] max-w-[--sz-stars] [transition:fill_0.3s_ease]":
                      !unstyled
                  },
                  classNames?.icon
                ),
                style: styles?.icon
              }}
            >
              <path d="m22.94,9.39c-.15-.48-.57-.83-1.07-.9l-5.98-.88-2.68-5.49c-.22-.46-.69-.75-1.2-.75,0,0,0,0,0,0s0,0,0,0c-.51,0-.97.29-1.2.75l-2.68,5.49-5.98.88c-.5.07-.92.42-1.07.9-.15.48-.03,1,.33,1.36l4.34,4.28-1.02,6.05c-.08.5.12,1,.54,1.3.41.29.96.33,1.41.1l5.34-2.84,5.34,2.84c.45.24,1,.2,1.41-.1.41-.29.62-.8.54-1.3l-1.02-6.05,4.34-4.28c.36-.35.48-.88.33-1.36Z" />
            </svg>
          </span>
        ))}
      </div>
    );
  }
);
