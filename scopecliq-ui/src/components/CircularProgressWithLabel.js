import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
  {value, color="#E7E7E7"}
) {
    const circularProgressStyle = {
        strokeWidth: '12px',
        color: color,
      };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex'}}>
      <CircularProgress variant="determinate" value={value} 
        style={circularProgressStyle}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className='sq-label'>
            {`${Math.round(value)}%`}

        </div>
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel({value}) {
  const [progress, setProgress] = React.useState(10);
  return <CircularProgressWithLabel value={value} />;
}