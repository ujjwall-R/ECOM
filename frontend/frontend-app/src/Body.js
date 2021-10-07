import React from "react";
import { Route, Switch } from "react-router";
import About from "./About";
import Blog from "./Blog";
import Contact from "./Contact";
import Post from "./Post";
import SellerLogin from "./SellerLogin";
import SellerSignup from "./SellerSignup";

export default function Body() {
  return (
    <Switch>
      <Route path="/" exact component={Blog} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/post/:slug" component={Post} />{" "}
      <Route path="/SellerLogin" component={SellerLogin} />{" "}
      <Route path="/SellerSignup" component={SellerSignup} />{" "}
      {/* what's :slug? You'll learn it */}
    </Switch>
  );
}
