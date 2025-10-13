"use client";
import { createContext, useState, useEffect } from "react";

const FlashMessageContext = createContext();

export function FlashMessageProvider({ children }) {
  const [flashMessage, setFlashMessage] = useState(null);

  return (
    <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage }}>
      {children}
      {flashMessage && (
        <div id="flash-message" className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="border-body-light bg-light m-6 w-full max-w-md rounded border p-6">
            <ul>
              {Object.values(flashMessage).map((msg, i) => (
                <li className="mb-1" key={i}>
                  * {msg}
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <button onClick={() => setFlashMessage(null)} className="btn-primary-orange">
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </FlashMessageContext.Provider>
  );
}

export { FlashMessageContext };
export default FlashMessageProvider;
