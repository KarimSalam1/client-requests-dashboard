import { Schema, model } from 'mongoose';

export const STATUSES = ['New', 'In Progress', 'Done'] as const;
export type Status = (typeof STATUSES)[number];

const requestSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: { type: String, enum: STATUSES, default: 'New' },
  },
  { timestamps: true }
);

export const RequestModel = model('Request', requestSchema);
