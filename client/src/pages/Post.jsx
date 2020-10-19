import React, { useEffect, useState } from "react";
import Comments from "../components/Comments";
import { Row, Col, Card, Container } from "react-bootstrap";
import axios from "axios";

const Post = ({ match }) => {
  const { id } = match.params;
  const [post, setPost] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (post) {
      axios
        .get(`/api/users/${post.user}`, { withCredentials: true })
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [post]);

  return (
    <>
      <Container className="container d-flex mt-5 flex-column mb-5 align-items-center justify-content-center fullscreen">
        <Row>
          <Col className="text-center mt-5">
            <h1>{post?.title}</h1>
            <h5 className="pt-2">
              A blog by {user?.username}
              {/* <Link to={`/user/${user?._id}`}>{user?.username}</Link> */}
            </h5>
          </Col>
        </Row>
        <Row className="mt-3 mb-5">
          <Col>
            <Card bg="dark" className="post-card">
              <Card.Header></Card.Header>
              <Card.Body style={{ whiteSpace: "pre-wrap", color: "white" }}>
                <strong>{post?.content}</strong>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
        </Row>
        <Comments postID={id} />
      </Container>
    </>
  );
};
export default Post;
