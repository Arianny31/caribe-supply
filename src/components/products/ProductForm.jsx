import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

export default function ProductForm({ open, onClose, onSave }) {
  const [product, setProduct] = useState({ name: '', price: '', image: '', category: '', description: '' });

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!product.name) return;
    onSave({ ...product, price: Number(product.price) || 0 });
    setProduct({ name: '', price: '', image: '', category: '', description: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Registrar nuevo producto</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Nombre" fullWidth margin="dense" value={product.name} onChange={handleChange} />
        <TextField name="price" label="Precio" type="number" fullWidth margin="dense" value={product.price} onChange={handleChange} />
        <TextField name="image" label="Imagen (URL)" fullWidth margin="dense" value={product.image} onChange={handleChange} />
        <TextField name="category" label="Categoría" fullWidth margin="dense" value={product.category} onChange={handleChange} />
        <TextField name="description" label="Descripción" fullWidth margin="dense" multiline rows={2} value={product.description} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
