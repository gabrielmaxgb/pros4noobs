import { Schema, model } from 'mongoose';

const GeneralConfigurationSchema = new Schema({
  key: { type: String, required: true },
  value: { type: String, required: true },
}, { timestamps: true });

const GeneralConfiguration = model('GeneralConfiguration', GeneralConfigurationSchema);

export default GeneralConfiguration;
