export type QuizGenerationState = {
    videoId: string;
    chunkNumber: number;
};

const getQuizGenerationState = (): Promise<QuizGenerationState[]> => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get("quizGenerationState", (result) => {
            resolve(result.quizGenerationState || []);
        });
    });
};


const addQuizGenerationState = (state: QuizGenerationState) => {
    chrome.storage.local.get("quizGenerationState", (result) => {
        const quizGenerationState = result.quizGenerationState || [];
        quizGenerationState.push(state);
        chrome.storage.local.set({ quizGenerationState: quizGenerationState });
    });
};



const removeQuizGenerationState = (state: QuizGenerationState) => {
    chrome.storage.local.get("quizGenerationState", (result) => {
        let quizGenerationState = result.quizGenerationState || [];
        quizGenerationState = quizGenerationState.filter((item: QuizGenerationState) => item.videoId !== state.videoId && item.chunkNumber !== state.chunkNumber);
        chrome.storage.local.set({ quizGenerationState: quizGenerationState });
    });
};
export { getQuizGenerationState, addQuizGenerationState, removeQuizGenerationState };