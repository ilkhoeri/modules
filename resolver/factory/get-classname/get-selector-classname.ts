import { Variant } from "str-merge";

interface GetSelectorClassNameInput {
  selector: string;
  classes: (variant?: Variant<{ selector: { [key: string]: string } }>) => string;
  unstyled: boolean | undefined;
}

export function getSelectorClassName({ selector, classes, unstyled }: GetSelectorClassNameInput) {
  return unstyled ? undefined : classes({ selector });
}
