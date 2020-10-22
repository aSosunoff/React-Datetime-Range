import { useEffect } from "react";

export default function useAddListener(
  eventName,
  handler,
  isAddListener = true
) {
  useEffect(() => {
    isAddListener && document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [eventName, handler, isAddListener]);
}
