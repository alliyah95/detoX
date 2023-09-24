const API_ENDPOINT = "http://127.0.0.1:8000/api/v1/detect";

/**
 * Sends the tweet content to the detoX API for hate speech detection.
 * @param content - The ttext content of the tweet to be sent for hate speech detection.
 * @returns 1 if the text is identified as hate speech, otherwise 0.
 */
const sendTweetToServer = async (content: string) => {
    const response = await fetch(`${API_ENDPOINT}?content=${content}`);
    const data = await response.json();
    return data.result;
};

export { sendTweetToServer };
