import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    technologies: { type: [String], required: true },
    initialRole: { type: String, enum: ['noob', 'pro'], required: true },
    roles: { type: [String], required: true },
    startedAsSuperBeginner: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const User = model('User', UserSchema);

export default User;
