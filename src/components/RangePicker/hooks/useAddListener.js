import { useEffect } from "react";

export default function useAddListener(eventName, handler) {
  useEffect(() => {
    document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [eventName, handler]);
}
