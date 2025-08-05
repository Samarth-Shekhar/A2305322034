import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';

const URLCard = ({ data, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.short);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (!data.expiry) return;

    const interval = setInterval(() => {
      const diff = new Date(data.expiry) - new Date();
      if (diff <= 0) {
        clearInterval(interval);
        return;
      }
      const seconds = Math.floor(diff / 1000);
      setRemainingTime(`${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [data.expiry]);

  return (
    <Card
      elevation={2}
      sx={{
        my: 2,
        borderRadius: 2,
        transition: '0.3s ease',
        bgcolor: 'background.paper',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="body1" color="text.primary">
            <strong>Original:</strong> {data.original}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography
              variant="body1"
              color="primary.main"
              component="a"
              href={data.short.replace('https://short.ly/', '/short/')}
              sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              <strong>Short:</strong> {data.short}
            </Typography>
            <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
              <IconButton onClick={handleCopy} size="small">
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Created: {new Date(data.createdAt).toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Clicks: {data.clicks}
          </Typography>
          {data.expiry && (
            <Typography variant="body2" color="error">
              Expires in: {remainingTime || 'expired'}
            </Typography>
          )}

          <Stack direction="row" justifyContent="flex-end">
            <Tooltip title="Delete this link">
              <IconButton onClick={() => onDelete(data.short)} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default URLCard;
