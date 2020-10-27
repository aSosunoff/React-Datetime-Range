import { useEffect } from "react";

export default function useAddListener(element, eventName, handler) {
  useEffect(() => {
    if (element) {
      element.addEventListener(eventName, handler);
    }

    return () => {
      if (element) {
        element.removeEventListener(eventName, handler);
      }
    };
  }, [element, eventName, handler]);
}
