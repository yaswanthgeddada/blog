import React from "react";
import "../App.css";
import "../styles/Home.css";
import { Button } from "react-bootstrap/";
import { Link } from "react-router-dom";

const Content = () => {
  return (
    <div id="content">
      <div>
        <h1>
          <strong>FullSend Blog</strong>
        </h1>
        <h5>Share and comment on FULLSENDS</h5>
        <span>
          <Button
            className="btn"
            as={Link}
            to="/signup"
            size="lg"
            variant="dark"
          >
            Signup
          </Button>
        </span>
        <span>
          <Button
            className="btn"
            as={Link}
            to="/login"
            size="lg"
            variant="dark"
          >
            Login
          </Button>
        </span>
        <span>
          <Button
            className="btn"
            as={Link}
            to="/blogs"
            size="lg"
            variant="dark"
          >
            View Blogs
          </Button>
        </span>
        <span>
          <Button
            className="btn"
            as={Link}
            to="/myblogs"
            size="lg"
            variant="dark"
          >
            My blogs
          </Button>
        </span>
        <div>
          <h3>
            <strong>
              What is a{" "}
              <a
                style={{ color: "red" }}
                href="https://www.urbandictionary.com/define.php?term=Full%20Send"
              >
                FullSend?
              </a>
            </strong>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Content;
