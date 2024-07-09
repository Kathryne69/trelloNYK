"use client";

import { useEffect, useState } from "react";
import axios from "axios";

// Define a TypeScript interface for the comment object
interface Comment {
  id: number;
  text: string;
}

export const Activity = () => {
  const [comments, setComments] = useState<Comment[]>([]); // Specify Comment[] type

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get<Comment[]>("/api/comments"); // Specify Comment[] type for axios.get
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  return (
    <div>
      <h1>Comments</h1>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};
