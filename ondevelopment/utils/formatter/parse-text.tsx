import React from "react";

export function parseText(text: string): string[] {
  const strongPattern = /\*(.*?)\*/g;
  const italicPattern = /_(.*?)_/g;

  let parts: any[] = [];
  let lastIndex = 0;

  // Mengganti teks yang dibungkus dengan *
  text.replace(strongPattern, (match, p1, offset) => {
    parts.push(text.slice(lastIndex, offset));
    parts.push(<strong key={offset}>{p1}</strong>);
    lastIndex = offset + match.length;
    return match;
  });

  // Menambahkan sisa teks setelah penggantian terakhir
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // Mengganti teks yang dibungkus dengan _ pada hasil penggantian pertama
  parts = parts
    .map((part, index) => {
      if (typeof part === "string") {
        let innerParts: any[] = [];
        let innerLastIndex = 0;

        part.replace(italicPattern, (match, p1, offset) => {
          innerParts.push(part.slice(innerLastIndex, offset));
          innerParts.push(<i key={offset}>{p1}</i>);
          innerLastIndex = offset + match.length;
          return match;
        });

        if (innerLastIndex < part.length) {
          innerParts.push(part.slice(innerLastIndex));
        }

        return innerParts.length > 0 ? innerParts : part;
      }
      return part;
    })
    .flat();

  // return parts;
  return parts;
}

export function processParseText(n: string): React.JSX.Element[] {
  return parseText(n).map((part, index) => <React.Fragment key={index}>{part}</React.Fragment>);
}
