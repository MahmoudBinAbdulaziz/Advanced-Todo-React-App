// TaskProgressBar.jsx
import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

export default function TaskProgressBar({ completion }) {
  return (
    <Box sx={{ width: '100%', textAlign: 'center', mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        مستوى الإنجاز
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={completion}
            sx={{
              height: 12,
              borderRadius: 6,
              [`& .MuiLinearProgress-bar`]: {
                backgroundColor:
                  completion >= 80
                    ? '#4caf50' // Green
                    : completion >= 50
                    ? '#ffb300' // Yellow
                    : '#f44336', // Red
              },
            }}
          />
        </Box>
        <Typography sx={{ minWidth: 40 }}>{`${completion.toFixed(0)}%`}</Typography>
      </Box>
    </Box>
  );
}
