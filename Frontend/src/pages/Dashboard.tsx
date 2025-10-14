import React, { useEffect, useState } from 'react';
import api from '../api';

interface Product {
  id: number;
  price: number;
  nameProduct: string;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard - Productos</h1>
      {products.length === 0 && <p>No hay productos disponibles.</p>}
      <ul>
        {products.map((p) => (
          <li key={p.id} className="mb-4 p-4 border rounded">
            <h2 className="font-semibold">{p.nameProduct}</h2>
            <p>Precio: ${p.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
