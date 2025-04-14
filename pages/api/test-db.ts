import dbConnect from '@/lib/dbConnect';
import Player from '@/models/Player';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Insert a test player (only once!)
  if (req.method === 'POST') {
    const player = await Player.create({
      name: 'Keith McLeod',
      college: 'Bowling Green',
      draftYear: 2003,
      draftPick: 'Undrafted',
      team: 'Utah Jazz',
      position: 'PG',
    });
    return res.status(201).json(player);
  }

  // Fetch all players
  const players = await Player.find({});
  res.status(200).json(players);
}