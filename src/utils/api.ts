const API_ENDPOINT = "http://127.0.0.1:8000/api/v1/fake_detect";

const sendTweetToServer = async (content: string) => {
    try {
        const response = await fetch(`${API_ENDPOINT}?content=${content}`);
        const data = await response.json();
        return data.result;
    } catch (error) {}
};

export { sendTweetToServer };
