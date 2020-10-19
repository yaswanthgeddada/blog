import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button, Container, Form } from "react-bootstrap";
import swal from "sweetalert";
import axios from "axios";
import { useHistory } from "react-router-dom";
const UpdateInfoForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(null);
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const checkPasswords = () => {
    if (
      (formData.password && !formData.confirmPassword) ||
      (!formData.password && formData.confirmPassword) ||
      formData.password !== formData.confirmPassword
    ) {
      return swal("Passwords do not match.");
    }
    if (formData.password.length < 6) {
      return swal("Password must be longer than 6 characters.");
    }
    delete formData.confirmPassword;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    formData?.password && checkPasswords();
    const form = e.target;
    axios
      .patch("/api/users/me", formData)
      .then((response) => {
        setCurrentUser(response.data);
        form.reset();
        swal("Update successful!");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = () => {
    axios
      .delete("/api/users/me")
      .then((response) => {
        setCurrentUser(null);
        sessionStorage.removeItem("user");
        history.push("/login");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <Container>
        <Form className="account-form" onSubmit={handleSubmit}>
          <Form.Group controlId="profileContainer">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              defaultValue={currentUser?.username}
              type="text"
              placeholder="Username"
              name="username"
            />
            <Form.Text className="text-muted">
              Enter your username here.
            </Form.Text>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              defaultValue={currentUser?.email}
              type="email"
              placeholder="Email"
              name="email"
            />
            <Form.Text className="text-muted">
              Enter a valid email address here.
            </Form.Text>
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              type="password"
              placeholder="Password"
              name="password"
            />
            <Form.Text className="text-muted">
              Password must be at least six characters.
            </Form.Text>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              type="password"
              placeholder="Confirm Password"
              name="password"
            />
            <Form.Text className="text-muted">Type password again.</Form.Text>
          </Form.Group>
          <Button variant="dark" type="submit" id="button">
            Submit
          </Button>
          <Button variant="dark" id="deleteButton" onClick={handleDelete}>
            Delete Account
          </Button>
        </Form>
      </Container>
    </div>
  );
};
export default UpdateInfoForm;
