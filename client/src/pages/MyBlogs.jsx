import React from "react";
import "../App.css";
import PostPreview from "../components/PostPreview";
import AccountHeader from "../components/AccountHeader";
import { Row, Col } from "react-bootstrap";
const MyBlogs = () => {
  return (
    <>
      <Row className="text-center myBlogs">
        <AccountHeader />
      </Row>
      <Row className="mt-5 text-center">
        <Col>
          <PostPreview />
        </Col>
      </Row>
    </>
  );
};
export default MyBlogs;
