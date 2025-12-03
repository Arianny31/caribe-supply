import React, { useContext } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { CartContext } from '../../context/CartContext';

export default function CartSnackbar() {
  const { alert, setAlert } = useContext(CartContext);
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setAlert({ ...alert, open: false });
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
}
