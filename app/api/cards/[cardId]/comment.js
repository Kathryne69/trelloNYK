// pages/api/comments.js

import prisma from '../../../lib/prisma'; // Import Prisma client

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const comments = await prisma.comment.findMany(); // Fetch comments from database
      res.status(200).json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const { comment } = req.body;
      const newComment = await prisma.comment.create({ 
        data: { 
          text: comment.text,
          userId: comment.userId,
          entityId: comment.entityId,
          entityType: comment.entityType,
        } 
      }); // Save new comment to database
      res.status(201).json(newComment);
    } catch (error) {
      console.error('Error saving comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
