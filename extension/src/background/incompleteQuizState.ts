

const saveIncompleteQuizState = (state: string[]) => {
  chrome.storage.local.set({ incompleteQuizState: state });
};

const getIncompleteQuizState = (): Promise<string[]> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["incompleteQuizState"], (result) => {
      resolve(result.incompleteQuizState || []);
    });
  });
};


export { saveIncompleteQuizState, getIncompleteQuizState };