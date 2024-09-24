import React, { useState } from "react";
import axios from "axios";
import "./ChatInterface.css";
import logo from "../components/Logos/DevonLogo.png"; // Adjust the path based on your actual structure


const ChatInterface = () => {
  const [name, setName] = useState("Select Name");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [height, setHeight] = useState("auto");

  const names = ["Ajinkya", "Pavan", "Ankush", "Sherin", "Jafer", "Nishanth", "Sai"];

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const result = await axios.get(` https://insightsapi.azurewebsites.net/api/Feedback?name=${name}`);
      setResponse(result.data);
    } catch (error) {
      setResponse(`No Summary Found !!!`);
    } finally {
      setLoading(false);
      setHeight("auto");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "Select Name") {
      setResponse("Please select a valid Name.");
      return;
    }
    fetchSummary();
  };

  return (
    <div className="chat-interface" style={{ height }}>
      <img src={logo} alt="DevOn" className="logo"/>
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        response && <div className="response-bubble" dangerouslySetInnerHTML={{ __html: response }}></div>
      )}
      <form onSubmit={handleSubmit} className="chat-form">
        <div className="input-group">
          <label className="input-label">Select an employee to generate profile:</label>
          <select
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="dropdown"
          >
            <option disabled>Select Name</option>
            {names.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button type="submit" className="submit-button">
            Get Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
