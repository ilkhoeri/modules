import { useIsomorphicEffect } from "@/resource/docs";

export function useDocumentTitle(title: string) {
  useIsomorphicEffect(() => {
    if (typeof title === "string" && title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
}
