import axios from 'axios';
import Conversion from '../models/conversionModel.js';


export const convertCurrency = async (date, amount, sourceCurrency, targetCurrency) => {
  try {
   
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`);
    
    const rates = response.data.rates;

    const convertedAmount = (amount * rates[targetCurrency]);

    
    const conversionResult = {
      sourceCurrency,
      targetCurrency,
      originalAmount: amount,
      convertedAmount,
      date
    };

  
    const conversion = new Conversion({
      amount,
      sourceCurrency,
      targetCurrency,
      convertedAmount,
      date
    });

    await conversion.save();

    
    return conversionResult;

  } catch (error) {
    throw new Error(`Error fetching or saving exchange rates: ${error.message}`);
  }
};
