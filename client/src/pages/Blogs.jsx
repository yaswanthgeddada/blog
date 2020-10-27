import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

import axios from "axios";

const Blogs = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    axios
      .get(`/api/posts/`, { withCredentials: true })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Row>
        <Col className="text-center mt-5">
          <h1 className="mt-5 mb-5">All blogs</h1>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex flex-wrap justify-content-center">
          {posts &&
            posts
              .map((post) => {
                return (
                  <Card
                    key={post._id}
                    className="mt-5 mx-5"
                    bg="dark"
                    style={{ width: "300px", borderRadius: "20px" }}
                  >
                    <Card.Header className="text-center">
                      <Card.Title
                        style={{ fontSize: "1.5rem", color: "white" }}
                        as={Link}
                        to={`/post/${post._id}`}
                      >
                        {post.title}
                      </Card.Title>
                      <Card.Subtitle
                        style={{
                          fontSize: ".9rem",
                          fontWeight: "400",
                          color: "white",
                        }}
                        className="pt-3 text-left"
                      >
                        <b>posted on:</b>{" "}
                        {moment(post.createdAt).format("MMM Do YYYY, h:mm a")}
                        <br />
                        <b>last edited:</b>{" "}
                        {moment(post.updatedAt).format("MMM Do YYYY, h:mm a")}
                      </Card.Subtitle>
                    </Card.Header>
                    <Card.Body
                      style={{ whiteSpace: "pre-wrap", color: "white" }}
                    >
                      {post.content.slice(0, 200)}
                      {post.content.length > 200 && "..."}
                    </Card.Body>
                    <Button
                      as={Link}
                      to={`/post/${post._id}`}
                      variant="primary"
                      style={{borderRadius: "20px" }}
                    >
                      Comment
                    </Button>
                    <Card.Footer
                      className="text-center"
                      style={{ color: "white" }}
                    >
                      by: {post.username}
                    </Card.Footer>
                  </Card>
                  // <Card
                  //   key={post._id}
                  //   bg="dark"
                  //   className="mx-3 mb-5 all-blogs-card"
                  // >
                  //   <Card.Header className="text-center">
                  //     <Card.Title
                  //       as={Link}
                  //       to={`/post/${post._id}`}
                  //       style={{ fontSize: "1.5rem", color: "white" }}
                  //     >
                  //       {post.title}
                  //     </Card.Title>
                  //   </Card.Header>
                  //   <Card.Body
                  //     style={{ whiteSpace: "pre-wrap", color: "white" }}
                  //   >
                  //     {post.content}
                  //   </Card.Body>
                  //   <Button
                  //     as={Link}
                  //     to={`/post/${post._id}`}
                  //     variant="primary"
                  //   >
                  //     Comment
                  //   </Button>
                  //   <Card.Footer
                  //     className="text-center"
                  //     style={{ color: "white" }}
                  //   >
                  //     by: {post.username}
                  //   </Card.Footer>
                  // </Card>
                );
              })
              .reverse()}
        </Col>
      </Row>
    </>
  );
};
export default Blogs;
