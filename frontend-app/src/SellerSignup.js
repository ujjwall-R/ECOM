import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SellerSignup() {
  const [inputs, setInputs] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/sellers", inputs).then(
      (res) => {
        history.push({
          pathname: "/me",
          state: res.data,
        });
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={inputs.email || ""}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          name="password"
          value={inputs.password || ""}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
    </form>
  );
}
