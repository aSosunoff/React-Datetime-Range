import { useCallback, useState } from "react";

export default function useFocus() {
  const [isFocus, setFocusHandler] = useState(false);

  const setFocus = useCallback(() => setFocusHandler(true), []);
  const setBlur = useCallback(() => setFocusHandler(false), []);

  return {
    isFocus,
    setFocus,
    setBlur,
  };
}
