import mongoose, { Schema, model, models } from 'mongoose';

const PlayerSchema = new Schema({
  name: String,
  college: String,
  position: String,
  conference: String,
  mascot: String,
  colors: [String],
  region: String,
  collegeInitial: String,
});

const Player = models.Player || model("Player", PlayerSchema);

export default Player;