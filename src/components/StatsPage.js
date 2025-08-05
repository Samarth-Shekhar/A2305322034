import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const dummyData = [
  {
    original: 'https://example.com',
    short: 'https://short.ly/abcde',
    clicks: 5,
    createdAt: '2025-08-05T10:00:00Z',
  },
  {
    original: 'https://openai.com',
    short: 'https://short.ly/xyz12',
    clicks: 2,
    createdAt: '2025-08-04T14:00:00Z',
  },
];

const StatsPage = () => {
  return (
    <List>
      {dummyData.map((url, index) => (
        <ListItem key={index} divider>
          <ListItemText
            primary={`${url.short} — ${url.clicks} clicks`}
            secondary={`Original: ${url.original} | Created: ${new Date(url.createdAt).toLocaleString()}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default StatsPage;
