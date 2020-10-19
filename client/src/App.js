import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import SignUp from "./pages/SignUp";
import Blogs from "./pages/Blogs";
import MyBlogs from "./pages/MyBlogs";
import SecureRoute from "./routes/SecureRoute";
import PostForm from "./pages/PostForm";

import Post from "./pages/Post";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
  return (
    <AppContextProvider>
      <Router>
        <Navigation />
        <Switch>
          <SecureRoute exact path="/myblogs" component={MyBlogs} />
          <SecureRoute exact path="/post-editor" component={PostForm} />
          <SecureRoute exact path="/post-editor/:id" component={PostForm} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/post/:id" component={Post} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </AppContextProvider>
  );
}

export default App;
