import React, { useState } from "react";
import axios from "axios";

function DeletePost({ postId }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      if (!isConfirmed) {
        setIsConfirmed(true);
        return;
      }

      const response = await axios.post(
        `http://api.course-selling.id.vn/api/post/delete/${postId}`
      );

      if (response.data.status) {
        setIsDeleted(true);
      } else {
        setError("Failed to delete the post");
      }
    } catch (error) {
      setError("Failed to delete the post. Please try again later.");
    }
  };

  if (isDeleted) {
    return <p>The post has been deleted successfully.</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {isConfirmed ? (
        <>
          <p>Are you sure you want to delete this post?</p>
          <button onClick={handleDelete}>Yes, delete it</button>
        </>
      ) : (
        <button onClick={handleDelete}>Delete Post</button>
      )}
    </div>
  );
}

export default DeletePost;