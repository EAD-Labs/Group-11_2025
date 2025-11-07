// src/chrome.d.ts



declare global {
  const chrome: {
    runtime: {
      sendMessage: (extensionId: string, message: any, callback?: (response: any) => void) => void;
    };
  };
}

export {};