import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL + "/api";

export const audioHandler = async (inputData, file = null) => {
  try {
    console.log("SERVER HIT", inputData);
    const formData = new FormData();
    if (file) {
      formData.append("audio_file", file); 
    } else {
      formData.append("input_data", inputData.input_data);
    }
    formData.append("input_type", inputData.input_type);
    const response = await axios.post(SERVER_URL + "/transcribe", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(JSON.stringify(response.data.transcript));
    return response.data.transcript;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
};

export const textSummarizer = async (text) => {
  try {
    console.log("text Summary function hit");
    const response = await axios.post(
      SERVER_URL + "/textSummary",
      { text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.summarizedTextPoints;
  } catch (error) {
    return [];
  }
};
