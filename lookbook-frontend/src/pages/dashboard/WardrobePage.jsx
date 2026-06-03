import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import { useLocation } from 'react-router-dom';

const WardrobePage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: '',
    type: '',
    style: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const location = useLocation();
  const fromStyle = location.state?.fromStyle || 'casual';

  // Fetch wardrobe items
  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/wardrobe');
      setItems(res.data);
    } catch (err) {
      console.error('Failed to fetch wardrobe:', err);
      alert('Error fetching wardrobe items.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Upload new clothing item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.type || !newItem.style || !imageFile) {
      alert('Please fill all fields and choose an image!');
      return;
    }

    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('type', newItem.type);
    formData.append('style', newItem.style);
    formData.append('image', imageFile);

    try {
      const res = await axios.post(
        'http://localhost:5000/api/wardrobe/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setItems((prev) => [...prev, res.data]);
      setNewItem({ name: '', type: '', style: '' });
      setImageFile(null);
      e.target.reset();
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Image upload failed.');
    }
  };

  // Delete clothing item
  const deleteItem = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/wardrobe/${id}`);
      fetchItems(); // refresh list
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete item.');
    }
  };

  return (
    <div style={{ paddingBottom: '80px', textAlign: 'center' }}>
      <BackButton to={`/style/${fromStyle}`} />

      <h3>📤 Upload Clothing</h3>
      <form
        onSubmit={handleSubmit}
        style={{
          margin: '0 auto 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '300px'
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Item name"
          value={newItem.name}
          onChange={handleChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} required />
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
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Upload
        </button>
      </form>

      <h3>👗 Wardrobe Items</h3>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center'
        }}
      >
        {items.length === 0 ? (
          <p>No items in your wardrobe yet.</p>
        ) : (
          items.map((item) => (
            <div
              key={item._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                width: '160px',
                textAlign: 'center'
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: '100%', borderRadius: '8px' }}
              />
              <p><b>{item.name}</b></p>
              <p>{item.type} | {item.style}</p>
              <button
                onClick={() => deleteItem(item._id)}
                style={{
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WardrobePage;


//1st one
// src/pages/dashboard/WardrobePage.jsx
// import React, { useEffect, useState } from 'react';
// import { getWardrobe } from '../../services/wardrobeAPI';
// import BackButton from '../../components/BackButton';
// import { useLocation } from 'react-router-dom';

// const WardrobePage = () => {
//   const [items, setItems] = useState([]);
//   const [newItem, setNewItem] = useState({
//     name: '',
//     type: '',
//     style: ''
//   });
//   const [imageFile, setImageFile] = useState(null);

//   const location = useLocation();
//   const fromStyle = location.state?.fromStyle || 'casual';

//   useEffect(() => {
//     const fetchItems = async () => {
//       const data = await getWardrobe();
//       setItems(data);
//     };
//     fetchItems();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewItem(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!newItem.name || !newItem.type || !newItem.style || !imageFile) {
//       alert('Please fill all fields and choose an image!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', newItem.name);
//     formData.append('type', newItem.type);
//     formData.append('style', newItem.style);
//     formData.append('image', imageFile); // 👈 the actual image file

//     try {
//       const res = await fetch('http://localhost:5000/api/wardrobe/upload', {
//         method: 'POST',
//         body: formData
//       });
//       const added = await res.json();
//       setItems(prev => [...prev, added]);
//       setNewItem({ name: '', type: '', style: '' });
//       setImageFile(null);
//       e.target.reset(); // clear the form visually
//     } catch (err) {
//       console.error('Upload failed:', err);
//       alert('Image upload failed.');
//     }
//   };

//   return (
//     <div style={{ paddingBottom: '80px' }}>
//       <BackButton to={`/style/${fromStyle}`} />

//       <h3>📤 Upload Clothing</h3>
//       <form onSubmit={handleSubmit} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Item name"
//           value={newItem.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           required
//         />
//         <select name="type" value={newItem.type} onChange={handleChange} required>
//           <option value="">Select type</option>
//           <option value="topwear">Topwear</option>
//           <option value="bottomwear">Bottomwear</option>
//           <option value="footwear">Footwear</option>
//           <option value="jewelry">Jewelry</option>
//         </select>
//         <select name="style" value={newItem.style} onChange={handleChange} required>
//           <option value="">Select style</option>
//           <option value="casual">Casual</option>
//           <option value="formal">Formal</option>
//           <option value="party">Party</option>
//           <option value="ethnic">Ethnic</option>
//         </select>
//         <button type="submit">Upload</button>
//       </form>

//       <h3>👗 Wardrobe Items</h3>
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
//         {items.map(item => (
//           <div key={item._id} style={{ border: '1px solid #ccc', padding: 10, width: 160 }}>
//             <img src={item.imageUrl} alt={item.name} style={{ width: '100%' }} />
//             <p>{item.name}</p>
//             <p>{item.type} | {item.style}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WardrobePage;
