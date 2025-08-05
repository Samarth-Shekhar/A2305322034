import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Tooltip,
} from '@mui/material';

const Statistics = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = localStorage.getItem('appLogs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 600,
          textAlign: 'center',
          color: 'text.primary',
        }}
      >
        📊 Application Logs
      </Typography>

      {logs.length === 0 ? (
        <Typography align="center" color="text.secondary">
          No logs recorded yet.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.main' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}>Time</TableCell>
                <TableCell sx={{ color: '#fff' }}>Type</TableCell>
                <TableCell sx={{ color: '#fff' }}>Message</TableCell>
                <TableCell sx={{ color: '#fff' }}>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(log.time).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontWeight={600}
                      color={
                        log.type === 'ERROR'
                          ? 'error.main'
                          : log.type === 'WARN'
                          ? 'warning.main'
                          : 'success.main'
                      }
                    >
                      {log.type}
                    </Typography>
                  </TableCell>
                  <TableCell>{log.message}</TableCell>
                  <TableCell>
                    <Tooltip title={JSON.stringify(log.data, null, 2)}>
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {JSON.stringify(log.data)}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Statistics;
