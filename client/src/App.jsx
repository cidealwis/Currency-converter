import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, MenuItem, Box } from '@mui/material';
import axios from 'axios';

const currencyOptions = ['AUD', 'USD', 'EUR', 'GBP', 'JPY']; 

function App() {
  const [amount, setAmount] = useState(350);
  const [sourceCurrency, setSourceCurrency] = useState('AUD');
  const [targetCurrency, setTargetCurrency] = useState('USD');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); 
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('http://localhost:5000/api/convert', {
        params: {
          date,
          amount,
          sourceCurrency,
          targetCurrency
        }
      });

      setConvertedAmount(response.data.convertedAmount);
    } catch (error) {
      setError('Error converting currency.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Currency Converter
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Source Currency"
              value={sourceCurrency}
              onChange={(e) => setSourceCurrency(e.target.value)}
            >
              {currencyOptions.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Target Currency"
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
            >
              {currencyOptions.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleConvert}
          sx={{ mt: 3 }}
        >
          {loading ? 'Converting...' : 'Convert Currency'}
        </Button>

        {convertedAmount !== null && (
          <Typography variant="h6" sx={{ mt: 3 }}>
            Converted Amount: {convertedAmount} {targetCurrency}
          </Typography>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 3 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default App;
