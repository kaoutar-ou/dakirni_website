import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SetSafeZone = ({handleOpenSet, handleCloseSet, openSet, setSafeZone}) => {
  

  return (
    <div>
      {/* <Button onClick={handleOpenSet}>Open modal</Button> */}
      <Modal
        open={openSet}
        onClose={handleCloseSet}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Confirm Safe Zone ?
            </Typography>
            <Stack spacing={2} direction="row" >
                <Button variant="contained" onClick={setSafeZone}>Confirm</Button>
                <Button variant="contained" onClick={handleCloseSet}>cancel</Button>
            </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default SetSafeZone;