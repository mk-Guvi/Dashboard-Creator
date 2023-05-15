import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request is for the signup route
  if (req.url !== '/api/signup') {
    // Return an invalid HTTP request response for other routes
    res.status(400).json({ message: 'Invalid HTTP request' });
  }
}
