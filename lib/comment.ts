// new add

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {/
    // Fetch comments from the database (replace this with your actual logic)
    const comments = await fetchCommentsFromDatabase();

    // Send a success response with the comments
    res.status(200).json(comments);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchCommentsFromDatabase() {
  // Implement logic to fetch comments from the database
  // For demonstration purposes, return dummy data
  return [
    { id: 1, text: 'This is a comment' },
    { id: 2, text: 'Another comment' },
  ];
}
