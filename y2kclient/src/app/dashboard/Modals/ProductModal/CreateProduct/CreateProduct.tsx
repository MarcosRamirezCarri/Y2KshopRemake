'use client'
import React, { useState } from 'react';
import Product from '@/helpers/Types';
import validateProduct from '@/helpers/Validators/validatorProducts';
import createProduct from '@/lib/actions/ProductActions/createProduct';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const CreateModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave }) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: '',
    images: [],
    price: 0,
    colors: [],
    clasification: '',
    description: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    images: '',
    price: '',
    clasification: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSave = () => {
    createProduct(product);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Product</h2>
        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          type="text"
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          type="text"
          name="images"
          placeholder="Images (comma separated)"
          value={product.images.join(',')}
          onChange={e => handleChange({ ...e, target: { ...e.target, name: 'images', value: e.target.value.split(',') } })}
        />
        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />
        <input
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          type="text"
          name="clasification"
          placeholder="Clasification"
          value={product.clasification}
          onChange={handleChange}
        />
        <textarea
          className="w-full mb-3 p-2 border border-gray-300 rounded"
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSave}>Save</button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;