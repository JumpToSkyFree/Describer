import { useCallback, useEffect, useState } from "react";

export interface MediaQuery {
  query: string;
  onChange?: (event: MediaQueryListEvent) => void;
}

export default function useMediaQuery(query: MediaQuery) {
  const [matches, setMatches] = useState<boolean | null>(null);

  const onChange = useCallback(
    (ev: MediaQueryListEvent) => {
      setMatches(ev.matches);
      if (query.onChange) query.onChange(ev);
    },
    [query]
  );

  useEffect(() => {
    const result = window.matchMedia(query.query);

    setMatches(result.matches);

    result.addEventListener("change", onChange);

    return () => {
      if (query.onChange && result)
        result.removeEventListener("change", onChange);
    };
  }, [query, onChange]);

  return matches;
}
