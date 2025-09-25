"use client";
import { createContext, useState, useEffect } from "react";

const FlashMessage = createContext();

export function FlashMessageProvider({ children }) {
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    if (flashMessage) {
      const timer = setTimeout(() => {
        setFlashMessage(null);
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [flashMessage]);

  return <FlashMessage.Provider value={{ flashMessage, setFlashMessage }}>{children}</FlashMessage.Provider>;
}

export default FlashMessage;
