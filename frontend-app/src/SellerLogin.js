import axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function SellerLogin() {
  const [inputs, setInputs] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);
    axios.post("http://localhost:5000/sellers/login", inputs).then(
      (res) => {
        history.push({
          pathname: "/me",
          state: res.data,
        });
        console.log(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
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
