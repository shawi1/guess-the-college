import mongoose, { Schema, model, models } from 'mongoose';

const PlayerSchema = new Schema({
  name: String,
  college: String,
  draftYear: Number,
  draftPick: String,
  team: String,
  position: String,
});

const Player = models.Player || model("Player", PlayerSchema);

export default Player;