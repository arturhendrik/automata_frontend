import backendEndpoint from "config";

const postRequest = async (data, requestEndPoint) => {
    try {
        const response = await fetch(`${backendEndpoint}/${requestEndPoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const newData = await response.json();
        return newData;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export default postRequest;
