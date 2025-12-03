import React, { useState, useEffect, useContext } from 'react';
import { fetchProducts } from '../services/api/catalogAPI';
import { AppContext } from '../context/AppContext';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/shared/ProductCard';
import ProductFormLauncher from '../components/shared/ProductFormLauncher';

const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { /* keep AppContext if used elsewhere */ } = useContext(AppContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts().then((res) => {
      const custom = JSON.parse(localStorage.getItem('customProducts') || '[]');
      setProducts([...res, ...custom]);
    }).finally(() => setLoading(false));

    const onUpdated = () => {
      // reload custom products only to avoid refetching API
      setProducts(prev => {
        // try to keep API products at front; if you prefer fetch again, replace with fetchProducts()
        const apiPart = prev.filter(p => p && p.id);
        const custom = JSON.parse(localStorage.getItem('customProducts') || '[]');
        return [...apiPart, ...custom];
      });
    };
    window.addEventListener('products-updated', onUpdated);
    return () => window.removeEventListener('products-updated', onUpdated);
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Nuestros Productos</h2>
      <ProductFormLauncher />
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {products.map((product, i) => (
            <ProductCard
              key={product.id || `custom-${i}`}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
