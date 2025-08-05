import React, { useState } from 'react';
import {
  TextField,
  Button,
  Stack,
  Alert,
  Paper,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import isURL from 'validator/lib/isURL';

const ShortenerForm = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [expiry, setExpiry] = useState('1m');

  const handleShorten = () => {
    if (!isURL(url)) {
      setError('Invalid URL. Please enter a valid link.');
      return;
    }
    setError('');
    onShorten(url, expiry);
    setUrl('');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom>
        Paste your long URL below 👇
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Enter URL"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
        />
        <FormControl fullWidth>
          <InputLabel>Expiry Time</InputLabel>
          <Select
            value={expiry}
            label="Expiry Time"
            onChange={(e) => setExpiry(e.target.value)}
          >
            <MenuItem value="1m">1 Minute</MenuItem>
            <MenuItem value="5m">5 Minutes</MenuItem>
            <MenuItem value="1h">1 Hour</MenuItem>
            <MenuItem value="never">Never</MenuItem>
          </Select>
        </FormControl>
        {error && <Alert severity="error">{error}</Alert>}
        <Button
          variant="contained"
          size="large"
          onClick={handleShorten}
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            borderRadius: 2,
            py: 1.5,
            fontWeight: 'bold',
          }}
        >
          🔗 Shorten URL
        </Button>
      </Stack>
    </Paper>
  );
};

export default ShortenerForm;
