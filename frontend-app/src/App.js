import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import SellerLogin from "./SellerLogin";
import SellerSignup from "./SellerSignup";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Body />
      </div>
    </BrowserRouter>
  );
}
