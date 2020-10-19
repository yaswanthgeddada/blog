import React from "react";
import "../App.css";
import AccountHeader from "../components/AccountHeader";
import { Row, Col } from "react-bootstrap";
import UpdateInfoForm from "../components/UpdateInfoForm";
const Profile = () => {
  return (
    <div className="profile">
      <Row className="text-center mt-5 profile">
        <AccountHeader />
      </Row>
      <Row className="d-flex mt-5 mb-5 justify-content-center">
        <Col xs={5}>
          <UpdateInfoForm />
        </Col>
      </Row>
    </div>
  );
};
export default Profile;
