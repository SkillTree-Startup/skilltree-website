import React, { useState } from "react";
import emailValidator from "email-validator";
import "./BetaTest.css";

const BetaTest: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("Yes");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValidator.validate(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    const formActionUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSfC3cffiwCUqmdoIQhg5VFIWJ7J4k8wr75DuQ6mDANwbf9j8g/formResponse";

    const formData = new FormData();
    formData.append("entry.54944481", firstName);
    formData.append("entry.932744665", lastName);
    formData.append("entry.1954724458", email);
    formData.append("entry.1653876590", feedback);

    fetch(formActionUrl, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
      .then(() => {
        alert("Form submitted successfully!");
        setFirstName("");
        setLastName("");
        setEmail("");
        setFeedback("Yes");
      })
      .catch((err) => console.error("Form submission error:", err));
  };

  return (
    <div className="beta-test-container">
      <h2>Beta Test Signup</h2>
      <form onSubmit={handleSubmit} className="beta-test-form">
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <label>
          Are you willing to give feedback?
          <select value={feedback} onChange={(e) => setFeedback(e.target.value)}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BetaTest;