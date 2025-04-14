import dbConnect from '@/lib/dbConnect';
import Player from '@/models/Player';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const count = await Player.countDocuments();
  const random = Math.floor(Math.random() * count);

  const randomPlayer = await Player.findOne().skip(random);

  if (!randomPlayer) {
    return res.status(404).json({ message: 'No player found.' });
  }

  res.status(200).json(randomPlayer);
}