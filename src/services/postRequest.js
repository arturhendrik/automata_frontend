import backendEndpoint from "config";

const postRequest = async (data, requestEndPoint, exerciseNumber = null) => {
    try {
        let url = `${backendEndpoint}/${requestEndPoint}`;
        if (exerciseNumber !== null) {
            url += `/${exerciseNumber}`;
        }

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const newData = await response.json();
        return newData;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export default postRequest;
