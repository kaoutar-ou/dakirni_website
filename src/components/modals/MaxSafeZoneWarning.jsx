import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MaxSafeZoneWarning = ({openMaxWarning, handleCloseMaxWarning}) => {

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      {/* <Button variant="outlined" onClick={handleMaxWarning}>
        Open success snackbar
      </Button> */}
      <Snackbar open={openMaxWarning} autoHideDuration={6000} onClose={handleCloseMaxWarning}>
        <Alert onClose={handleCloseMaxWarning} severity="warning" sx={{ width: "100%" }}>
          You can't add more than three safe zones
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default MaxSafeZoneWarning;