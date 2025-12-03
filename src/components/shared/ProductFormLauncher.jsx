import React, { useState, useEffect } from 'react';
import ProductForm from '../products/ProductForm';

export default function ProductFormLauncher() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const openListener = () => setOpen(true);
    window.addEventListener('open-product-form', openListener);
    return () => window.removeEventListener('open-product-form', openListener);
  }, []);

  const handleSave = (product) => {
    const existing = JSON.parse(localStorage.getItem('customProducts') || '[]');
    existing.push(product);
    localStorage.setItem('customProducts', JSON.stringify(existing));
    window.dispatchEvent(new CustomEvent('products-updated'));
  };

  return <ProductForm open={open} onClose={() => setOpen(false)} onSave={handleSave} />;
}
