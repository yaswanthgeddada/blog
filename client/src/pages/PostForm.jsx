import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import "../App.css";
import AccountHeader from "../components/AccountHeader";
import swal from "sweetalert";

import { Row, Col, Form, Button, Container } from "react-bootstrap";
import axios from "axios";
const PostForm = ({ match, history }) => {
  const { id } = match.params;
  const { currentUser } = useContext(AppContext);
  const [postData, setPostData] = useState();

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/posts/${id}`, { withCredentials: true })
        .then(({ data }) => {
          setPostData({
            title: data.title,
            content: data.content,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setPostData(null);
    }
  }, []);

  const createPost = () => {
    axios
      .post(`/api/posts`, postData, { withCredentials: true })
      .then(({ data }) => {
        swal("Post created!", { icon: "success" });
        history.push(`/blogs`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePost = () => {
    window.confirm("Are you sure you want to delete this post permanently?") &&
      axios
        .delete(`/api/posts/${id}`)
        .then(({ data }) => {
          swal("Post deleted!", { icon: "success" });
          history.push("/account-posts");
        })
        .catch((err) => console.log(err));
  };

  const editPost = () => {
    axios
      .patch(`/api/posts/${id}`, postData, { withCredentials: true })
      .then(({ data }) => {
        swal("Edit successful!");
        history.push(`/blogs`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    id ? editPost() : createPost();
    form.reset();
  };
  return (
    <>
      <Container className="container d-flex  post flex-column align-items-center justify-content-center fullscreen">
        <Row className="text-center">
          <AccountHeader />
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>{id ? "Edit Blog" : "Create Blog"}</h3>
            <Form onSubmit={handleSubmit} className="account-form mt-4">
              <Form.Group controlId="formGroupPost">
                <Form.Label>FullSend Title</Form.Label>
                <Form.Control
                  className="mb-3"
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  defaultValue={id && postData?.title}
                  type="text"
                  placeholder="Title"
                  name="title"
                />
                <Form.Label>FullSend Content</Form.Label>
                <Form.Control
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  defaultValue={id ? postData?.content : ""}
                  as="textarea"
                  id="fullsendContent"
                  rows="8"
                  placeholder="FullSend..."
                  name="content"
                />
              </Form.Group>
              <Button variant="dark" className="mr-3" type="submit" id="button">
                Submit
              </Button>
              {id && (
                <Button
                  variant="dark"
                  onClick={deletePost}
                  className="delete-btn"
                >
                  Delete Post
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PostForm;
