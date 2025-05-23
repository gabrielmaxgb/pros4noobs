import { Schema, model, InferSchemaType, Types } from 'mongoose';
import { IUserModel } from '~/shared/user';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    technologies: { type: [String], required: true },
    initialRole: { type: String, enum: ['noob', 'pro'], required: true },
    roles: { type: [String], required: true },
    startedAsSuperBeginner: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const UserRecord = model('User', UserSchema);
type User = InferSchemaType<typeof UserSchema> & { _id: Types.ObjectId };

const userToModel = (user: User): IUserModel => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  technologies: user.technologies,
  initialRole: user.initialRole,
  startedAsSuperBeginner: user.startedAsSuperBeginner,
  roles: user.roles.map((role: string) => role as 'noob' | 'pro'),
});

export { UserRecord, User, userToModel };
