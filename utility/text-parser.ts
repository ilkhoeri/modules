function toUpper(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function toLower(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1).toLowerCase();
}

export function transform(
  transform: "uppercase" | "capitalize-first" | "capitalize" | "lowercase",
  text: string | undefined
): string {
  const str = text ?? "---";

  switch (transform) {
    case "uppercase":
      return str
        .split("-")
        .map(word => word.toUpperCase())
        .join(" ");

    case "capitalize-first":
      return toUpper(
        str
          .split(" ")
          .map(word => toUpper(word.replace(/-/g, " ")))
          .join(" ")
      );

    case "capitalize":
      return str
        .split("-")
        .map(word => toUpper(word))
        .join(" ");

    case "lowercase":
      return str
        .split(" ")
        .map(word => toLower(word))
        .join(" ");
  }
}

export function truncate(word: string, max?: number): string {
  const maxLength = max || 30;
  let slicedWords = word;
  if (slicedWords.length > maxLength) {
    const lastSpaceIndex = slicedWords.lastIndexOf(" ", maxLength);
    slicedWords = slicedWords.substring(0, lastSpaceIndex) + "...";
  }
  return slicedWords;
}

function removePunctuation(str: string): string {
  return str.replace(/[.,'"+[\]{}]/g, "").replace(/[^-=!?\w\s]/g, "");
}

function combineConsecutiveHyphens(str: string): string {
  return str.replace(/-+/g, "-");
}

export function lowerCasePunctuation(str: string): string {
  const words = str.split(" ");
  const lowerCase = words.map(word => toLower(word));
  const withoutPunctuation = lowerCase.map(lower => removePunctuation(lower));
  const punctuationLess = withoutPunctuation.join("-");
  return combineConsecutiveHyphens(punctuationLess);
}

export function sanitizedWord(str: string | undefined): string {
  const string = str ?? "[]{}<>/";
  const w = string.replace(/\s/g, "-");
  const sntz = w.replace(/[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+=]/g, "");
  const final = sntz.replace(/-{2,}/g, "-");
  return sanitizedWord(final);
}

export function sanitizedName(str: string | undefined): string {
  const string = str ?? ")*&^^(";
  const replaced = string.toLowerCase();
  const sanitized = replaced
    .replace(/[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+=]/g, "")
    .replace(/\s{2,}/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/-\s/g, "-")
    .replace(/\s-/g, "-");
  return sanitized;
}

export function sanitizedToParams(str: string | undefined): string {
  const string = str ?? ")*&^^(";
  const replaced = string.toLowerCase().replace(/\s/g, "-");
  const sanitized = replaced.replace(
    /[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!_+=]/g,
    ""
  );
  const final = sanitized.replace(/-{2,}/g, "-");
  return final;
}

// Function to sanitize URL-friendly parameters to the original title format
export function desanitizeFromParams(param: string): string {
  return param
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .replace(/_/g, " ");
}

export function desanitizeParams(sanitizedTitle: string): string {
  // Replace '-' with a space and capitalize the first word of each word (except common conjunctions)
  const commonWords = ["dan", "dari", "ke", "di", "yang", "untuk"];
  return sanitizedTitle
    .split("-")
    .map(word =>
      commonWords.includes(word)
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

export function sanitizedToTag(str: string | undefined): string {
  const string = str ?? ")*&^^(";
  const replaced = string.replace(/\s/g, "_");
  const sanitized = replaced.replace(
    /[<'|">[\]{}?/,.`\\%^&~:;*()+$#@!+=]/g,
    ""
  );
  const final = sanitized.replace(/-{2,}/g, "_").replace(/_{2,}/g, "_");
  return final;
}

export function compareWords(
  word1: string | undefined | null,
  word2: string | undefined | null
): boolean {
  if (!word1 || !word2) return false;
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, "")
      .trim();
  const normalizedWord1 = normalize(word1);
  const normalizedWord2 = normalize(word2);
  return normalizedWord1 === normalizedWord2;
}

export function getFirstString(name: string) {
  const nameParts = name.split(/\s|[-~]/);
  const firstName = nameParts[0];
  return firstName;
}

export function camelToKebab(
  words: string,
  { kebab = "hyphens" }: { kebab?: "underscores" | "hyphens" } = {}
): string {
  if (words === undefined) return "";

  let kebabCase: string = "$1$2";
  if (kebab === "underscores") kebabCase = "$1_$2";
  if (kebab === "hyphens") kebabCase = "$1-$2";
  return words.replace(/([a-z])([A-Z])/g, kebabCase).toLowerCase();
}

export function kebabToCamelCase(words: string): string {
  return words.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

export function toPascalCase(words: string) {
  return words
    .split("-") // Splitting strings based on hyphens
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Change the first letter of each word to uppercase
    .join(""); // Rejoin words without hyphens
}

export function formatedProgress(input: string | undefined) {
  // Check if a string consists only of numbers using regex
  if (!input) return null;
  if (/^\d+$/.test(input)) {
    return `${input}`; // Add % if all characters are numbers
  }
  return input; // If it contains letters, return the string as is.
}

export function splitWordsToArray(words: string) {
  // Breaking sentences into arrays of words
  const wordsArray = words.split(" ");

  // Convert an array of words to an array of objects
  return wordsArray.map(word => ({
    text: word
  }));
}

// Function to convert type to JSON-like string
export function typeToJson<T extends object>(example: T): string {
  const typeRepresentation = JSON.stringify(
    Object.keys(example).reduce(
      (acc, key) => {
        acc[key] = typeof (example as any)[key];
        return acc;
      },
      {} as Record<string, string>
    ),
    null,
    2
  );

  return typeRepresentation;
}

export const htmlCharacterEntities = [
  { char: "<", entity: "&lt;" },
  { char: ">", entity: "&gt;" },
  { char: "&", entity: "&amp;" },
  { char: '"', entity: "&quot;" },
  { char: "'", entity: "&apos;" },
  { char: "{", entity: "&#123;" },
  { char: "}", entity: "&#125;" },
  { char: "[", entity: "&#91;" },
  { char: "]", entity: "&#93;" },
  { char: "(", entity: "&#40;" },
  { char: ")", entity: "&#41;" },
  { char: "#", entity: "&#35;" },
  { char: "%", entity: "&#37;" },
  { char: "+", entity: "&#43;" },
  { char: "=", entity: "&#61;" },
  { char: "`", entity: "&#96;" },
  { char: "~", entity: "&#126;" },
  { char: "/", entity: "&#47;" },
  { char: "\\", entity: "&#92;" },
  { char: "^", entity: "&#94;" },
  { char: "|", entity: "&#124;" },
  { char: ":", entity: "&#58;" },
  { char: ";", entity: "&#59;" },
  { char: ",", entity: "&#44;" },
  { char: ".", entity: "&#46;" },
  { char: "?", entity: "&#63;" },
  { char: "!", entity: "&#33;" },
  { char: "@", entity: "&#64;" },
  { char: "$", entity: "&#36;" },
  { char: "*", entity: "&#42;" },
  { char: "_", entity: "&#95;" },
  { char: "-", entity: "&#45;" },
  { char: " ", entity: "&nbsp;" }
];
