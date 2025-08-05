import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, CircularProgress } from '@mui/material';

const Redirect = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('shortenedUrls');
    let urls = stored ? JSON.parse(stored) : [];

    const urlIndex = urls.findIndex(u => u.short.endsWith(code));

    if (urlIndex !== -1) {
      urls[urlIndex].clicks += 1;
      localStorage.setItem('shortenedUrls', JSON.stringify(urls));

      setTimeout(() => {
        window.location.href = urls[urlIndex].original;
      }, 1500);
    } else {
      setTimeout(() => navigate('/'), 2000);
    }
  }, [code, navigate]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      minHeight="60vh"
    >
      <CircularProgress sx={{ mb: 2 }} />
      <Typography variant="h5" color="text.primary">
        Redirecting to original URL...
      </Typography>
    </Box>
  );
};

export default Redirect;
