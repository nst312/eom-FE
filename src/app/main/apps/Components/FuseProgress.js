import { Box, CircularProgress } from '@mui/material';

function FuseProgress() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center p-24">
        <div className="flex-col">
          <div>
            <Box>
              <CircularProgress />
            </Box>
          </div>
          <div>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FuseProgress;
