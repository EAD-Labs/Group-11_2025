const getWarningState = (): Promise<{value: boolean, videoId: string}> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["warning"], (result) => {
      resolve(result.warning || {value: false, videoId: ""});
    });
  });
};


const setWarningState = ({warning, videoId}: {warning: boolean, videoId: string}) => {
  chrome.storage.local.set({warning:{value: warning, videoId: videoId}});
};

export { getWarningState, setWarningState };