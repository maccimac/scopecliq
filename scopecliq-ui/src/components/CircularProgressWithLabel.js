import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
  {value, color="#E7E7E7"}
) {
    const circularProgressStyle = {
        strokeWidth: '12px',
        color: color,
        
        // boxShadow: 'inset 0 0 0 16px springgreen'
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
        {/* <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >{`${Math.round(value)}%`}</Typography> */}
      </Box>
    </Box>
  );
}

export default function CircularWithValueLabel({value}) {
  const [progress, setProgress] = React.useState(10);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

  return <CircularProgressWithLabel value={value} />;
}