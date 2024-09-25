import mongoose from 'mongoose';

const conversionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  sourceCurrency: { type: String, required: true },
  targetCurrency: { type: String, required: true },
  convertedAmount: { type: Number, required: true },
  date: { type: String, required: true }
});

const Conversion = mongoose.model('Conversion', conversionSchema);

export default Conversion;
