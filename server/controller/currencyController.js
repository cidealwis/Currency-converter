import { convertCurrency } from '../service/currencyService.js';


export const convertCurrencyController = async (req, res) => {
  const { date, amount, sourceCurrency, targetCurrency } = req.query;

  if (!date || !amount || !sourceCurrency || !targetCurrency) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    
    const conversionResult = await convertCurrency(date, amount, sourceCurrency, targetCurrency);
    return res.json(conversionResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
