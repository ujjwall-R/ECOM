import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

// read JSON data
const postsData = require("./_posts.json");

export default function Blog() {
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state); // result: 'some_value'
  }, [location]);

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/sellers/logout", location.state, {
        headers: { Authorization: `Bearer ${location.state.token}` },
      })
      .then(
        (res) => {
          history.push("/");
        },
        (err) => {
          console.log(err);
        }
      );
  };
  return (
    <>
      <h1>Dashboard</h1>
      <div>
        Username:{location.state.seller.username}
        <br />
        Email:{location.state.seller.email}
        <br />
      </div>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
