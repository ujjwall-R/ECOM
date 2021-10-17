import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// read JSON data
const postsData = require("./_posts.json");

export default function Blog() {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname); // result: '/secondpage'
    console.log(location.search); // result: '?query=abc'
    console.log(location.state); // result: 'some_value'
  }, [location]);
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
      <button>Logout</button>
    </>
  );
}
