import React, { useState } from "react";
import axios from "axios";
import "./HomePageComponent.css"
import Footer from "./FooterComponent";

export default function HomePageComponent() {
    const [inputText, setInputText] = useState("");
    const [prediction, setPrediction] = useState("");
    const [sentences, setSentences] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Sending POST request to the backend
          const result = await axios.post("http://localhost:5000/predict", {
            text: inputText
          });
          // Update the response state with the server's response
          console.log(result);
          setPrediction(result.data.prediction);
          setSentences(result.data.text);

        } catch (error) {
          console.error("Error while sending text to the server:", error);
        }
    };
  
    return (
        <div className="homeBlock">
            <div className="container">
            <h1>Abuse Detection System</h1>
            <div className="input-box">
                <h2>Enter Text:</h2>
                <form onSubmit={handleSubmit}>
                <textarea
                    rows="5"
                    placeholder="Enter your text here..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <br />
                <button type="submit">Submit</button>
                </form>
            </div>

            {prediction && (
                <div className="output-box">
                    <h2>Result:  {prediction}</h2>
                    <p>Abusive sentences: {sentences}</p>
                </div>
            )}
        </div>
        <Footer />
    </div>
    );
};
  