import React, { useState, useEffect } from 'react';
import ShortenerForm from '../components/ShortenerForm';
import URLCard from '../components/URLCard';
import {
  Typography,
  Box,
  Fade,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { logEvent } from '../utils/logger'; 

const Home = () => {
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('shortenedUrls');
    if (saved) {
      const parsed = JSON.parse(saved);
      const active = parsed.filter(url => !url.expiry || new Date(url.expiry) > new Date());
      setShortenedUrls(active);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(shortenedUrls));
  }, [shortenedUrls]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const filtered = shortenedUrls.filter(url => !url.expiry || new Date(url.expiry) > now);

      const expired = shortenedUrls.filter(url => url.expiry && new Date(url.expiry) <= now);
      if (expired.length > 0) {
        logEvent('info', 'Auto-deleting expired URLs', expired);
      }

      if (filtered.length !== shortenedUrls.length) {
        setShortenedUrls(filtered);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [shortenedUrls]);

  const handleShorten = (url, expiryOption) => {
    if (shortenedUrls.length >= 5) {
      alert('Limit reached: Max 5 URLs.');
      return;
    }

    let expiryTime = null;
    switch (expiryOption) {
      case '1m':
        expiryTime = new Date(Date.now() + 60000);
        break;
      case '5m':
        expiryTime = new Date(Date.now() + 5 * 60000);
        break;
      case '1h':
        expiryTime = new Date(Date.now() + 60 * 60000);
        break;
      case 'never':
      default:
        expiryTime = null;
    }

    const shortCode = Math.random().toString(36).substring(2, 7);
    const newEntry = {
      original: url,
      short: `https://short.ly/${shortCode}`,
      createdAt: new Date().toISOString(),
      clicks: 0,
      expiry: expiryTime ? expiryTime.toISOString() : null,
    };

    logEvent('info', 'Shortened new URL', newEntry); 

    setShortenedUrls([newEntry, ...shortenedUrls]);
  };

  const handleDelete = (short) => {
    logEvent('warn', 'Deleted a short URL', { short });
    setShortenedUrls(shortenedUrls.filter(url => url.short !== short));
  };

  const filteredUrls = shortenedUrls.filter(
    url =>
      url.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.short.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          mb: 4,
          fontWeight: 600,
          fontSize: { xs: '2rem', md: '2.8rem' },
          textAlign: 'center',
          color: 'text.primary'
        }}
      >
        🚀 Smart URL Shortener
      </Typography>

      <ShortenerForm onShorten={handleShorten} />

      {/* 🔍 Search Input */}
      <Box my={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search URLs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Render Filtered URLs */}
      {filteredUrls.map((url, idx) => (
        <Fade in={true} timeout={500} key={idx}>
          <Box>
            <URLCard data={url} onDelete={handleDelete} />
          </Box>
        </Fade>
      ))}
    </Box>
  );
};

export default Home;
