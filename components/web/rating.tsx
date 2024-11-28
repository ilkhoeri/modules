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
      totalStars = 5,
      rating = 0,
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
        }}>
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
            data-rating={index + 1 <= isRating ? "active" : undefined}>
            <svg
              viewBox="0 0 576 512"
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
              }}>
              <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
            </svg>
          </span>
        ))}
      </div>
    );
  }
);
