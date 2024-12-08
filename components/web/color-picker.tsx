"use client";
import * as React from "react";
import { useDidUpdate } from "@/hooks/use-did-update";
import { useUncontrolled } from "@/hooks/use-uncontrolled";
import { mergeRefs, useMergedRef } from "@/hooks/use-merged-ref";
import { clampUseMovePosition, useMove, UseMovePosition } from "@/hooks/use-move";
import { cn, cvx, Variant, VariantsType } from "str-merge";
import { useClipboard } from "@/hooks/use-clipboard";
import { rem } from "@/modules/utility";

const classes = cvx({
  variants: {
    selector: {
      wrapper:
        "grid w-[--cp-width] items-center justify-center p-px [--cp-body-spacing:12px] [--cp-box-round:0.35rem] [--cp-preview-round:calc(var(--cp-box-round)/1.5)] [--cp-preview-size:2.625rem] [--cp-saturation-height:9rem] [--cp-swatch-size:14.286%] [--cp-thumb-size:1rem] [--cp-width:15rem] [&:where([data-full-width])]:w-full",
      body: "flex pt-[calc(var(--cp-body-spacing)/2)]",
      sliders: "flex-1 grid grid-flow-row [&:not(:only-child)]:mr-2",
      slider:
        "relative mx-[calc(var(--cp-thumb-size)/2)] h-[calc(var(--cp-thumb-size)+2px)] select-none outline-0 [&+&]:mt-1.5 [&:where([data-focus-ring='always'])]:focus-visible:[&_[data-cp=thumb]]:[outline:2px_solid_hsl(var(--constructive))]",
      sliderOverlay:
        "absolute inset-y-0 inset-x-[calc(var(--cp-thumb-size)*-1/2-calc(.0625rem*1))] rounded-full",
      thumb:
        "absolute left-[calc(var(--thumb-x-offset)-var(--cp-thumb-size)/2)] top-[calc(var(--thumb-y-offset)-var(--cp-thumb-size)/2)] size-[--cp-thumb-size] overflow-hidden rounded-full border-2 border-solid border-white [box-shadow:0_0_1px_rgba(0,0,0,0.6)]",
      saturation:
        "h-[--cp-saturation-height] w-[--cp-width] rounded-[--cp-box-round] relative border overflow-hidden",
      saturationOverlay:
        "absolute size-full rounded-[--cp-box-round] inset-[calc((var(--cp-thumb-size)*-1)/(2-1px))]",
      swatches:
        "mt-[5px] grid [grid-template-columns:repeat(var(--per-inline),minmax(0,1fr))] gap-[.250rem]",
      swatch:
        "m-2 size-[unset] min-h-0 min-w-0 flex-[0_0_calc(var(--cp-swatch-size)-0.25rem)] cursor-pointer pb-[calc(var(--cp-swatch-size)-0.25rem)]",
      preview:
        "size-[--cp-preview-size] relative aspect-square rounded-[--cp-preview-round] border appearance-none block",
      alphaOverlay: "absolute inset-0 rounded-[--cp-preview-round]",
      shadowOverlay:
        "absolute z-1 inset-0 size-full rounded-[--cp-preview-round]",
      colorOverlay: "absolute size-full inset-0 rounded-[--cp-preview-round]",
      childrenOverlay:
        "absolute size-full z-2 flex items-center justify-center rounded-[--cp-preview-round]"
    }
  }
});

const bg = cvx({
  variants: {
    bg: {
      rectangles:
        "0 0 / .5rem .5rem linear-gradient(45deg, hsl(var(--muted)) 25%, transparent 25%), 0 0.25rem / .5rem .5rem linear-gradient(-45deg, hsl(var(--muted)) 25%, transparent 25%), 0.25rem -0.25rem / .5rem .5rem linear-gradient(45deg, transparent 75%, hsl(var(--muted)) 75%), -0.25rem 0 / .5rem .5rem linear-gradient(-45deg, hsl(var(--background)) 75%, hsl(var(--muted)) 75%)",
      copy: "transparent center no-repeat url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgYXJpYS1oaWRkZW49InRydWUiIGhlaWdodD0iMTZweCIgd2lkdGg9IjE2cHgiPjxwYXRoIGQ9Ik03IDdtMCAyLjY2N2EyLjY2NyAyLjY2NyAwIDAgMSAyLjY2NyAtMi42NjdoOC42NjZhMi42NjcgMi42NjcgMCAwIDEgMi42NjcgMi42Njd2OC42NjZhMi42NjcgMi42NjcgMCAwIDEgLTIuNjY3IDIuNjY3aC04LjY2NmEyLjY2NyAyLjY2NyAwIDAgMSAtMi42NjcgLTIuNjY3eiI+PC9wYXRoPjxwYXRoIGQ9Ik00LjAxMiAxNi43MzdhMi4wMDUgMi4wMDUgMCAwIDEgLTEuMDEyIC0xLjczN3YtMTBjMCAtMS4xIC45IC0yIDIgLTJoMTBjLjc1IDAgMS4xNTggLjM4NSAxLjUgMSI+PC9wYXRoPjwvc3ZnPg==)",
      "has-copied":
        "transparent center no-repeat url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBzdHJva2U9IiM3NTc1NzUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgYXJpYS1oaWRkZW49InRydWUiIGhlaWdodD0iMTZweCIgd2lkdGg9IjE2cHgiPjxwYXRoIGQ9Ik01IDEybDUgNWwxMCAtMTAiPjwvcGF0aD48L3N2Zz4=)"
    },
    shadow: {
      overlay:
        "hsl(var(--background)) 0 0 0 calc(.075rem * 1) inset,hsl(var(--muted)) 0 0 calc(.25rem * 1) inset"
    },
    has: {
      copy: "cursor-pointer transition-transform active:scale-[.96] before:absolute before:z-9 before:flex before:size-full before:items-center before:justify-center before:content-[''] hover:before:[background:--cp-copy] data-[clipboard=success]:before:[background:--cp-has-copied]"
    }
  }
});

export type ColorFormat = "hex" | "hexa" | "rgba" | "rgb" | "hsl" | "hsla";

export interface HsvaColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

export interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface HslaColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface CSSProperties extends React.CSSProperties {
  [key: string]: any;
}
export type ComponentProps<
  T extends React.ElementType,
  Exclude extends string = never
> = Omit<React.ComponentPropsWithoutRef<T>, "style" | Exclude> & {
  style?: CSSProperties;
};

export type Selector = (
  variant?: Variant<{
    selector: Record<
      NonNullable<VariantsType<typeof classes>["selector"]>,
      string
    >;
  }>
) => string;

interface GetStyles {
  className?: string;
  style?: CSSProperties;
  "data-cp":
    | NonNullable<VariantsType<typeof classes>["selector"]>
    | (string & {});
}

function getStyles<T extends VariantsType<typeof classes>["selector"]>(
  selector: NonNullable<T>,
  options?: { className?: string; style?: CSSProperties }
): GetStyles {
  return {
    "data-cp": cn(selector),
    className: cn(classes({ selector }), options?.className),
    style: { ...options?.style }
  };
}

type CtxProps = {
  stylesNames?: NonNullable<VariantsType<typeof classes>["selector"]>;
  /**
  getStyles?: <T extends VariantsType<typeof classes>["selector"]>(
    selector: NonNullable<T>,
    options?: { className?: string; style?: CSSProperties }
  ) => {
    className?: string;
    style?: CSSProperties;
  };
  */
};

interface ProviderProps {
  children: React.ReactNode;
}

const Ctx = React.createContext<CtxProps | undefined>(undefined);

function ColorPickerProvider(Root: ProviderProps) {
  const { children } = Root;
  const value = {};
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useColorPickerContext = () => {
  const ctx = React.useContext(Ctx);
  if (!ctx) {
    throw new Error("useTooltip must be wrap an <TooltipProvider>");
  }
  return ctx;
};

export interface __ColorPickerProps {
  value?: string;
  format?: ColorFormat;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onChangeEnd?: (value: string) => void;
  withPicker?: boolean;
  swatches?: string[];
  swatchesPerRow?: number;
  onColorSwatchClick?: (color: string) => void;
  focusable?: boolean;
  size?: string & {};
  alphaLabel?: string;
  hueLabel?: string;
  saturationLabel?: string;
  unstyled?: boolean;
  withShadow?: boolean;
  withClipboard?: boolean;
}
type ColorPickerProps = __ColorPickerProps &
  ComponentProps<"div", "onChange" | "value" | "defaultValue"> & {};

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  function ColorPicker(_props, ref) {
    const {
      className,
      style,
      format,
      value,
      size,
      hueLabel,
      onChange,
      alphaLabel,
      focusable,
      swatches,
      withPicker,
      onChangeEnd,
      defaultValue,
      withClipboard,
      saturationLabel,
      withShadow = true,
      swatchesPerRow = 7,
      onColorSwatchClick,
      ...props
    } = _props;

    const formatRef = React.useRef(format);
    const valueRef = React.useRef<string>();
    const scrubTimeoutRef = React.useRef<number>(-1);
    const isScrubbingRef = React.useRef(false);
    const withAlpha =
      format === "hexa" || format === "rgba" || format === "hsla";

    const [_value, setValue, controlled] = useUncontrolled({
      value,
      defaultValue,
      finalValue: "#FFFFFF",
      onChange
    });

    const [parsed, setParsed] = React.useState<HsvaColor>(parseColor(_value));

    const startScrubbing = () => {
      window.clearTimeout(scrubTimeoutRef.current);
      isScrubbingRef.current = true;
    };

    const stopScrubbing = () => {
      window.clearTimeout(scrubTimeoutRef.current);
      scrubTimeoutRef.current = window.setTimeout(() => {
        isScrubbingRef.current = false;
      }, 200);
    };

    const handleChange = (color: Partial<HsvaColor>) => {
      setParsed(current => {
        const next = { ...current, ...color };
        valueRef.current = convertHsvaTo(formatRef.current!, next);
        return next;
      });
      setValue(valueRef.current!);
    };

    useDidUpdate(() => {
      if (isColorValid(value!) && !isScrubbingRef.current) {
        setParsed(parseColor(value!));
      }
    }, [value]);

    useDidUpdate(() => {
      formatRef.current = format;
      setValue(convertHsvaTo(format!, parsed));
    }, [format]);

    const copy = useClipboard({ timeout: 1000 });

    return (
      <ColorPickerProvider>
        <div
          {...{
            ref,
            ...getStyles("wrapper", { className, style }),
            ...props
          }}
        >
          {withPicker && (
            <>
              <Saturation
                value={parsed}
                onChange={handleChange}
                onChangeEnd={({ s, v }) =>
                  onChangeEnd?.(
                    convertHsvaTo(formatRef.current!, {
                      ...parsed,
                      s: s!,
                      v: v!
                    })
                  )
                }
                color={_value}
                focusable={focusable}
                saturationLabel={saturationLabel}
                onScrubStart={startScrubbing}
                onScrubEnd={stopScrubbing}
              />

              <div {...getStyles("body")}>
                <div {...getStyles("sliders")}>
                  <HueSlider
                    value={parsed.h}
                    onChange={h => handleChange({ h })}
                    onChangeEnd={h =>
                      onChangeEnd?.(
                        convertHsvaTo(formatRef.current!, { ...parsed, h })
                      )
                    }
                    size={size}
                    focusable={focusable}
                    aria-label={hueLabel}
                    onScrubStart={startScrubbing}
                    onScrubEnd={stopScrubbing}
                  />

                  {withAlpha && (
                    <AlphaSlider
                      value={parsed.a}
                      onChange={a => handleChange({ a })}
                      onChangeEnd={a => {
                        onChangeEnd?.(
                          convertHsvaTo(formatRef.current!, { ...parsed, a })
                        );
                      }}
                      color={convertHsvaTo("hex", parsed)}
                      focusable={focusable}
                      aria-label={alphaLabel}
                      onScrubStart={startScrubbing}
                      onScrubEnd={stopScrubbing}
                    />
                  )}
                </div>

                {withAlpha && (
                  <ColorSwatch
                    {...{
                      color: _value,
                      withShadow,
                      ...getStyles("preview", {
                        className: cn(withClipboard && bg({ has: "copy" })),
                        style: {
                          "--cp-copy": bg({ bg: "copy" }),
                          "--cp-has-copied": bg({ bg: "has-copied" })
                        }
                      }),
                      "data-clipboard": withClipboard
                        ? copy.copied
                          ? "success"
                          : ""
                        : undefined,
                      onClick: () => {
                        if (withClipboard) copy.copy(_value);
                      }
                    }}
                  />
                )}
              </div>
            </>
          )}

          {Array.isArray(swatches) && (
            <Swatches
              {...{
                data: swatches,
                withShadow,
                focusable,
                setValue,
                swatchesPerRow,
                onChangeEnd: color => {
                  const convertedColor = convertHsvaTo(
                    format!,
                    parseColor(color)
                  );
                  onColorSwatchClick?.(convertedColor);
                  onChangeEnd?.(convertedColor);
                  if (!controlled) {
                    setParsed(parseColor(color));
                  }
                }
              }}
            />
          )}
        </div>
      </ColorPickerProvider>
    );
  }
);
ColorPicker.displayName = "ColorPicker/ColorPicker";

export interface HueSliderProps
  extends Omit<ColorSliderProps, "maxValue" | "overlays" | "round"> {
  unstyled?: boolean;
}

export const HueSlider = React.forwardRef<HTMLDivElement, HueSliderProps>(
  (_props, ref) => {
    const { value, onChange, onChangeEnd, ...props } = _props;

    return (
      <ColorSlider
        {...{
          ref,
          onChange,
          value,
          onChangeEnd,
          maxValue: 360,
          thumbColor: `hsl(${value}, 100%, 50%)`,
          round: true,
          "data-hue": "",
          overlays: [
            {
              backgroundImage:
                "linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(170,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))"
            },
            {
              boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${rem(
                4
              )} inset`
            }
          ],
          ...props
        }}
      />
    );
  }
);
HueSlider.displayName = "HueSlider/HueSliderColorPicker";

export interface AlphaSliderProps
  extends Omit<ColorSliderProps, "maxValue" | "overlays" | "round"> {
  color: string;
}
export const AlphaSlider = React.forwardRef<HTMLDivElement, AlphaSliderProps>(
  (_props, ref) => {
    const { color, onChange, onChangeEnd, value, ...props } = _props;

    return (
      <ColorSlider
        {...{
          ref,
          value,
          onChange: val => onChange?.(round(val, 2)),
          onChangeEnd: val => onChangeEnd?.(round(val, 2)),
          maxValue: 1,
          round: false,
          "data-alpa": "",
          overlays: [
            {
              background: bg({ bg: "rectangles" })
            },
            {
              backgroundImage: `linear-gradient(90deg, transparent, ${color})`
            },
            {
              boxShadow: `rgba(0, 0, 0, .1) 0 0 0 ${rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${rem(
                4
              )} inset`
            }
          ],
          ...props
        }}
      />
    );
  }
);
AlphaSlider.displayName = "AlphaSlider/ColorPickerAlphaSlider";

interface ColorSliderProps extends ComponentProps<"div", "onChange"> {
  unstyled?: boolean;
  overlays: React.CSSProperties[];
  value: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  focusable?: boolean;
  size?: string & {};
  thumbColor?: string;
  maxValue: number;
  round: boolean;
}

const ColorSlider = React.forwardRef<HTMLDivElement, ColorSliderProps>(
  function ColorSlider(_props, ref) {
    const {
      className,
      style,
      onChange,
      onChangeEnd,
      focusable = true,
      value,
      overlays,
      onScrubStart,
      round,
      onScrubEnd,
      maxValue,
      thumbColor = "transparent",
      ...props
    } = _props;

    const [position, setPosition] = React.useState({
      y: 0,
      x: value / maxValue
    });
    const positionRef = React.useRef(position);
    const getChangeValue = (val: number) =>
      round ? Math.round(val * maxValue) : val * maxValue;
    const { ref: sliderRef } = useMove(
      ({ x, y }) => {
        positionRef.current = { x, y };
        onChange?.(getChangeValue(x));
      },
      {
        onScrubEnd: () => {
          const { x } = positionRef.current;
          onChangeEnd?.(getChangeValue(x));
          onScrubEnd?.();
        },
        onScrubStart
      }
    );

    useDidUpdate(() => {
      setPosition({ y: 0, x: value / maxValue });
    }, [value]);

    const handleArrow = (
      event: React.KeyboardEvent<HTMLDivElement>,
      pos: UseMovePosition
    ) => {
      event.preventDefault();
      const _position = clampUseMovePosition(pos);
      onChange?.(getChangeValue(_position.x));
      onChangeEnd?.(getChangeValue(_position.x));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowRight": {
          handleArrow(event, { x: position.x + 0.05, y: position.y });
          break;
        }
        case "ArrowLeft": {
          handleArrow(event, { x: position.x - 0.05, y: position.y });
          break;
        }
      }
    };

    const layers = overlays.map((overlay, index) => (
      <div key={index} {...getStyles("sliderOverlay", { style: overlay })} />
    ));

    return (
      <div
        {...{
          ref: useMergedRef(sliderRef, ref),
          role: "slider",
          "aria-valuemin": 0,
          "aria-valuenow": value,
          "aria-valuemax": maxValue,
          tabIndex: focusable ? 0 : -1,
          onKeyDown: handleKeyDown,
          ...getStyles("slider", { className, style }),

          ...props
        }}
      >
        {layers}
        <Thumb
          position={position}
          {...getStyles("thumb", {
            style: { top: rem(1), background: thumbColor }
          })}
        />
      </div>
    );
  }
);
ColorSlider.displayName = "ColorSlider/ColorPickerColorSlider";

export interface SaturationProps extends ComponentProps<"div", "onChange"> {
  value: HsvaColor;
  onChange: (color: Partial<HsvaColor>) => void;
  onChangeEnd: (color: Partial<HsvaColor>) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  saturationLabel?: string;
  color: string;
  focusable?: boolean;
}

const Saturation = React.forwardRef<HTMLDivElement, SaturationProps>(
  function Saturation(_props, ref) {
    const {
      className,
      style,
      onChange,
      onChangeEnd,
      value,
      saturationLabel,
      focusable = true,
      color,
      onScrubStart,
      onScrubEnd,
      ...props
    } = _props;

    const [position, setPosition] = React.useState({
      x: value.s / 100,
      y: 1 - value.v / 100
    });
    const positionRef = React.useRef(position);

    const { ref: moveRef } = useMove(
      ({ x, y }) => {
        positionRef.current = { x, y };
        onChange({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
      },
      {
        onScrubEnd: () => {
          const { x, y } = positionRef.current;
          onChangeEnd({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
          onScrubEnd?.();
        },
        onScrubStart
      }
    );

    React.useEffect(() => {
      setPosition({ x: value.s / 100, y: 1 - value.v / 100 });
    }, [value.s, value.v]);

    const handleArrow = (
      event: React.KeyboardEvent<HTMLDivElement>,
      pos: UseMovePosition
    ) => {
      event.preventDefault();
      const _position = clampUseMovePosition(pos);
      onChange({
        s: Math.round(_position.x * 100),
        v: Math.round((1 - _position.y) * 100)
      });
      onChangeEnd({
        s: Math.round(_position.x * 100),
        v: Math.round((1 - _position.y) * 100)
      });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case "ArrowUp": {
          handleArrow(event, { y: position.y - 0.05, x: position.x });
          break;
        }
        case "ArrowDown": {
          handleArrow(event, { y: position.y + 0.05, x: position.x });
          break;
        }
        case "ArrowRight": {
          handleArrow(event, { x: position.x + 0.05, y: position.y });
          break;
        }
        case "ArrowLeft": {
          handleArrow(event, { x: position.x - 0.05, y: position.y });
          break;
        }
      }
    };

    return (
      <div
        {...{
          ref: mergeRefs(moveRef, ref),
          role: "slider",
          "aria-label": saturationLabel,
          "aria-valuenow": position.x,
          "aria-valuetext": convertHsvaTo("rgba", value),
          tabIndex: focusable ? 0 : -1,
          onKeyDown: handleKeyDown,
          ...getStyles("saturation", { className, style }),
          ...props
        }}
      >
        <div
          {...getStyles("saturationOverlay", {
            style: { backgroundColor: `hsl(${value.h}, 100%, 50%)` }
          })}
        />

        <div
          {...getStyles("saturationOverlay", {
            style: {
              backgroundImage: "linear-gradient(90deg, #fff, transparent)"
            }
          })}
        />

        <div
          {...getStyles("saturationOverlay", {
            style: {
              backgroundImage: "linear-gradient(0deg, #000, transparent)"
            }
          })}
        />

        <Thumb
          position={position}
          {...getStyles("thumb", { style: { backgroundColor: color } })}
        />
      </div>
    );
  }
);

export interface ThumbProps extends React.ComponentPropsWithoutRef<"div"> {
  variant?: string;
  position: { x: number; y: number };
}

export const Thumb = React.forwardRef<HTMLDivElement, ThumbProps>(
  ({ position, style, className, ...props }, ref) => (
    <div
      {...{
        ref,
        ...getStyles("thumb", {
          className,
          style: {
            "--thumb-y-offset": `${position.y * 100}%`,
            "--thumb-x-offset": `${position.x * 100}%`,
            ...style
          }
        }),
        ...props
      }}
    />
  )
);
Thumb.displayName = "Thumb/ColorPickerThumb";

export interface SwatchesProps extends ComponentProps<"div"> {
  size?: string | number;
  data: string[];
  withShadow?: boolean;
  swatchesPerRow?: number;
  focusable?: boolean;
  onChangeEnd?: (color: string) => void;
  setValue: (value: string) => void;
}

export const Swatches = React.forwardRef<HTMLDivElement, SwatchesProps>(
  (
    {
      data: colors,
      style,
      setValue,
      className,
      focusable,
      withShadow,
      onChangeEnd,
      swatchesPerRow,
      ...props
    },
    ref
  ) => {
    return (
      <div
        {...{
          ref,
          ...getStyles("swatches", {
            className,
            style: {
              "--per-inline": `${swatchesPerRow}`,
              ...style
            }
          }),
          ...props
        }}
      >
        {colors.map((color, index) => (
          <ColorSwatch
            key={index}
            {...{
              ...getStyles("swatch", {
                className: cn("m-0 transition-transform active:scale-[.96]")
              }),
              color,
              withShadow,
              onClick: () => {
                setValue(color);
                onChangeEnd?.(color);
              },
              "aria-label": color,
              "data-swatch": "",
              tabIndex: focusable ? 0 : -1
            }}
          />
        ))}
      </div>
    );
  }
);
Swatches.displayName = "Swatches/ColorPickerSwatches";

export interface ColorSwatchProps extends ComponentProps<"div"> {
  color: string;
  withShadow?: boolean;
}
const ColorSwatch = React.forwardRef<HTMLDivElement, ColorSwatchProps>(
  function ColorSwatch(_props, ref) {
    const { className, style, color, children, withShadow, ...props } = _props;

    return (
      <div
        {...{
          ref,
          ...getStyles("preview", { className, style }),
          ...props
        }}
      >
        <span
          {...getStyles("alphaOverlay", {
            style: { background: bg({ bg: "rectangles" }) }
          })}
        />
        {withShadow && (
          <span
            {...getStyles("shadowOverlay", {
              style: { boxShadow: bg({ shadow: "overlay" }) }
            })}
          />
        )}
        <span
          {...getStyles("colorOverlay", { style: { backgroundColor: color } })}
        />
        <span {...getStyles("childrenOverlay")}>{children}</span>
      </div>
    );
  }
);

export function round(number: number, digits = 0, base = 10 ** digits) {
  return Math.round(base * number) / base;
}

function hslaToHsva({ h, s, l, a }: HslaColor): HsvaColor {
  const ss = s * ((l < 50 ? l : 100 - l) / 100);

  return {
    h,
    s: ss > 0 ? ((2 * ss) / (l + ss)) * 100 : 0,
    v: l + ss,
    a
  };
}

const angleUnits: Record<string, number> = {
  grad: 360 / 400,
  turn: 360,
  rad: 360 / (Math.PI * 2)
};

export function parseHue(value: string, unit = "deg") {
  return Number(value) * (angleUnits[unit] || 1);
}

const HSL_REGEXP =
  /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;

export function parseHsla(color: string): HsvaColor {
  const match = HSL_REGEXP.exec(color);

  if (!match) {
    return { h: 0, s: 0, v: 0, a: 1 };
  }

  return hslaToHsva({
    h: parseHue(match[1], match[2]),
    s: Number(match[3]),
    l: Number(match[4]),
    a: match[5] === undefined ? 1 : Number(match[5]) / (match[6] ? 100 : 1)
  });
}

function rgbaToHsva({ r, g, b, a }: RgbaColor): HsvaColor {
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);

  const hh = delta
    ? max === r
      ? (g - b) / delta
      : max === g
        ? 2 + (b - r) / delta
        : 4 + (r - g) / delta
    : 0;

  return {
    h: round(60 * (hh < 0 ? hh + 6 : hh), 3),
    s: round(max ? (delta / max) * 100 : 0, 3),
    v: round((max / 255) * 100, 3),
    a
  };
}

export function parseHex(color: string): HsvaColor {
  const hex = color[0] === "#" ? color.slice(1) : color;

  if (hex.length === 3) {
    return rgbaToHsva({
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
      a: 1
    });
  }

  return rgbaToHsva({
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    a: 1
  });
}

export function parseHexa(color: string): HsvaColor {
  const hex = color[0] === "#" ? color.slice(1) : color;

  const roundA = (a: string) => round(parseInt(a, 16) / 255, 3);
  if (hex.length === 4) {
    const withoutOpacity = hex.slice(0, 3);
    const a = roundA(hex[3] + hex[3]);

    const hsvaColor: HsvaColor = { ...parseHex(withoutOpacity), a };
    return hsvaColor;
  }

  const withoutOpacity = hex.slice(0, 6);
  const a = roundA(hex.slice(6, 8));
  const hsvaColor: HsvaColor = { ...parseHex(withoutOpacity), a };
  return hsvaColor;
}

const RGB_REGEXP =
  /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i;

export function parseRgba(color: string): HsvaColor {
  const match = RGB_REGEXP.exec(color);

  if (!match) {
    return { h: 0, s: 0, v: 0, a: 1 };
  }

  return rgbaToHsva({
    r: Number(match[1]) / (match[2] ? 100 / 255 : 1),
    g: Number(match[3]) / (match[4] ? 100 / 255 : 1),
    b: Number(match[5]) / (match[6] ? 100 / 255 : 1),
    a: match[7] === undefined ? 1 : Number(match[7]) / (match[8] ? 100 : 1)
  });
}

const VALIDATION_REGEXP: Record<ColorFormat, RegExp> = {
  hex: /^#?([0-9A-F]{3}){1,2}$/i,
  hexa: /^#?([0-9A-F]{4}){1,2}$/i,
  rgb: /^rgb\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
  rgba: /^rgba\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/i,
  hsl: /hsl\(\s*(\d+)\s*,\s*(\d+(?:\.\d+)?%)\s*,\s*(\d+(?:\.\d+)?%)\)/i,
  hsla: /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/i
};

const PARSE_CONVERTERS: Record<ColorFormat, (color: string) => HsvaColor> = {
  hex: parseHex,
  hexa: parseHexa,
  rgb: parseRgba,
  rgba: parseRgba,
  hsl: parseHsla,
  hsla: parseHsla
};

export function isColorValid(color: string) {
  for (const [, regexp] of Object.entries(VALIDATION_REGEXP)) {
    if (regexp.test(color)) {
      return true;
    }
  }
  return false;
}

export function parseColor(color: string): HsvaColor {
  if (typeof color !== "string") {
    return { h: 0, s: 0, v: 0, a: 1 };
  }

  if (color === "transparent") {
    return { h: 0, s: 0, v: 0, a: 0 };
  }

  const trimmed = color.trim();

  for (const [rule, regexp] of Object.entries(VALIDATION_REGEXP)) {
    if (regexp.test(trimmed)) {
      return PARSE_CONVERTERS[rule as keyof typeof PARSE_CONVERTERS](trimmed);
    }
  }

  return { h: 0, s: 0, v: 0, a: 1 };
}
export function hsvaToRgbaObject({ h, s, v, a }: HsvaColor): RgbaColor {
  const _h = (h / 360) * 6;
  const _s = s / 100;
  const _v = v / 100;

  const hh = Math.floor(_h);
  const l = _v * (1 - _s);
  const c = _v * (1 - (_h - hh) * _s);
  const d = _v * (1 - (1 - _h + hh) * _s);
  const newModule = hh % 6;

  return {
    r: round([_v, c, l, l, d, _v][newModule] * 255),
    g: round([d, _v, _v, c, l, l][newModule] * 255),
    b: round([l, l, d, _v, _v, c][newModule] * 255),
    a: round(a, 2)
  };
}

export function hsvaToRgba(color: HsvaColor, includeAlpha: boolean) {
  const { r, g, b, a } = hsvaToRgbaObject(color);

  if (!includeAlpha) {
    return `rgb(${r}, ${g}, ${b})`;
  }

  return `rgba(${r}, ${g}, ${b}, ${round(a, 2)})`;
}

export function hsvaToHsl({ h, s, v, a }: HsvaColor, includeAlpha: boolean) {
  const hh = ((200 - s) * v) / 100;

  const result = {
    h: Math.round(h),
    s: Math.round(
      hh > 0 && hh < 200
        ? ((s * v) / 100 / (hh <= 100 ? hh : 200 - hh)) * 100
        : 0
    ),
    l: Math.round(hh / 2)
  };

  if (!includeAlpha) {
    return `hsl(${result.h}, ${result.s}%, ${result.l}%)`;
  }

  return `hsla(${result.h}, ${result.s}%, ${result.l}%, ${round(a, 2)})`;
}

function formatHexPart(number: number) {
  const hex = number.toString(16);
  return hex.length < 2 ? `0${hex}` : hex;
}

export function hsvaToHex(color: HsvaColor) {
  const { r, g, b } = hsvaToRgbaObject(color);
  return `#${formatHexPart(r)}${formatHexPart(g)}${formatHexPart(b)}`;
}

export function hsvaToHexa(color: HsvaColor) {
  const a = Math.round(color.a * 255);

  return `${hsvaToHex(color)}${formatHexPart(a)}`;
}

const CONVERTERS: Record<ColorFormat, (color: HsvaColor) => string> = {
  hex: hsvaToHex,
  hexa: color => hsvaToHexa(color),
  rgb: color => hsvaToRgba(color, false),
  rgba: color => hsvaToRgba(color, true),
  hsl: color => hsvaToHsl(color, false),
  hsla: color => hsvaToHsl(color, true)
};

export function convertHsvaTo(format: ColorFormat, color: HsvaColor) {
  if (!color) {
    return "#000000";
  }

  if (!(format in CONVERTERS)) {
    return CONVERTERS.hex(color);
  }

  return CONVERTERS[format](color);
}
