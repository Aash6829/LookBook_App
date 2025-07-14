import React, { useEffect, useState } from 'react';
import { getWardrobe, addClothingItem } from '../../services/wardrobeAPI';
import BackButton from '../../components/BackButton';

const WardrobePage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    imageUrl: '',
    type: '',
    style: ''
  });

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getWardrobe();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.imageUrl || !newItem.type || !newItem.style) {
      alert('Please fill all fields!');
      return;
    }

    const added = await addClothingItem(newItem);
    setItems(prev => [...prev, added]);
    setNewItem({ name: '', imageUrl: '', type: '', style: '' });
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      <BackButton />

      <h3>➕ Add to Wardrobe</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input type="text" name="name" placeholder="Item name" value={newItem.name} onChange={handleChange} required />
        <input type="url" name="imageUrl" placeholder="Image URL" value={newItem.imageUrl} onChange={handleChange} required />
        <select name="type" value={newItem.type} onChange={handleChange} required>
          <option value="">Select type</option>
          <option value="topwear">Topwear</option>
          <option value="bottomwear">Bottomwear</option>
          <option value="footwear">Footwear</option>
          <option value="jewelry">Jewelry</option>
        </select>
        <select name="style" value={newItem.style} onChange={handleChange} required>
          <option value="">Select style</option>
          <option value="casual">Casual</option>
          <option value="formal">Formal</option>
          <option value="party">Party</option>
          <option value="ethnic">Ethnic</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <h3>👗 Wardrobe Items</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {items.map(item => (
          <div key={item._id} style={{ border: '1px solid #ccc', padding: 10, width: 160 }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '100%' }} />
            <p>{item.name}</p>
            <p>{item.type} | {item.style}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WardrobePage;
