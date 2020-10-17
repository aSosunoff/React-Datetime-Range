import { useEffect } from "react";

export default function useAddListener(event, handler, isAddListener) {
  useEffect(() => {
    isAddListener && document.addEventListener(event, handler);

    return () => {
      document.removeEventListener(event, handler);
    };
  });
}
