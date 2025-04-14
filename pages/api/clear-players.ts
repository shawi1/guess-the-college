import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Player from '@/models/Player';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  await Player.deleteMany({});
  res.status(200).json({ message: 'All players removed.' });
}