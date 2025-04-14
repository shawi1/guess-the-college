import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Player from '@/models/Player';

const hintOrder = ['conference', 'mascot', 'colors', 'region', 'collegeInitial'];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { playerName, guess, attempt } = req.body;

  console.log("Incoming payload:", req.body);

  if (!playerName || !guess || typeof attempt !== 'number') {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const player = await Player.findOne({ name: playerName });

  if (!player) {
    return res.status(404).json({ message: 'Player not found' });
  }

  const isCorrect = guess.trim().toLowerCase() === player.college.trim().toLowerCase();
  const hintKey = hintOrder[attempt]; // 0-based

  return res.status(200).json({
    correct: isCorrect,
    hint: !isCorrect && hintKey ? { [hintKey]: player[hintKey] } : null,
  });
}