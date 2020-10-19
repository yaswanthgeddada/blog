import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
const PostPreview = ({ userID }) => {
  const { currentUser } = useContext(AppContext);
  const history = useHistory();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);
  const deletePost = (id) => {
    window.confirm("Are you sure you want to delete this post permanently?") &&
      axios
        .delete(`/api/posts/${id}`)
        .then(({ data }) => {
          setLoading(true);
        })
        .catch((err) => console.log(err))
        .finally(setLoading(false));
  };
  useEffect(() => {
    axios
      .get(`/api/users/${userID || currentUser?._id}/posts`)
      .then(({ data }) => {
        setPosts(data);
      })
      .catch((err) => console.log(err));
  }, [userID, loading, currentUser]);
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {posts
        ?.map((post) => {
          return (
            <Card
              key={post._id}
              className="mt-5 mx-5"
              bg="dark"
              style={{ width: "300px" }}
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
              <Card.Body style={{ whiteSpace: "pre-wrap", color: "white" }}>
                {post.content.slice(0, 200)}
                {post.content.length > 200 && "..."}
              </Card.Body>
              <Card.Footer>
                {!userID && currentUser && (
                  <>
                    <Button
                      onClick={() => history.push(`/post-editor/${post._id}`)}
                      className="mx-1 edit-btn"
                      variant="primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deletePost(post._id)}
                      className="mx-1 delete-btn"
                      variant="primary"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </Card.Footer>
            </Card>
          );
        })
        .reverse()}
    </div>
  );
};
export default PostPreview;
