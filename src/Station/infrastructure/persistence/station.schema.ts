import { Schema, Document } from 'mongoose';

export const StationSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  obcn: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  status: { type: String, required: true },
});

export interface StationDocument extends Document {
  id: string;
  name: string;
  obcn: string;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
}
