import React from "react";
import { Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AccountHeader = () => {
  const history = useHistory();

  return (
    <Col>
      <h1>Profile</h1>
      <p>Manage your profile information</p>
      <Button
        variant="dark"
        onClick={() => history.push("/profile")}
        className="mx-3 mt-3"
      >
        Update Account Info
      </Button>
      <Button
        onClick={() => history.push("/post-editor")}
        className="mx-3 mt-3"
        variant="dark"
      >
        Create New Post
      </Button>
      <Button
        variant="dark"
        onClick={() => history.push(`/myblogs`)}
        className="mx-3 mt-3"
      >
        View Blog
      </Button>
    </Col>
  );
};
export default AccountHeader;
