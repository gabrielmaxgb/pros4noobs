import { Schema, model, InferSchemaType, Types } from 'mongoose';

const PasswordRecoverySchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: 'User' },
    nonce: { type: String, required: true },
    usedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const PasswordRecoveryRecord = model('PasswordRecovery', PasswordRecoverySchema);
type PasswordRecovery = InferSchemaType<typeof PasswordRecoverySchema> & { _id: Types.ObjectId };

export { PasswordRecoveryRecord, PasswordRecovery };