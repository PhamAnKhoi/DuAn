import React, { useState } from 'react';
import axios from 'axios';

function CreateCourse() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [views, setViews] = useState('');
  const [status, setStatus] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [videoDemo, setVideoDemo] = useState(null);
  const [message, setMessage] = useState('');

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('views', views);
    formData.append('status', status);
    formData.append('thumbnail', thumbnail);
    formData.append('video_demo', videoDemo);

    try {
      const response = await axios.post('http://api.course-selling.id.vn/api/course/create', formData);
      const { data } = response.data;
      setMessage(data.message);
      // Xử lý dữ liệu trả về nếu cần thiết
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Create Course</h3>
      <form onSubmit={handleCreateCourse}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label>Views:</label>
          <input type="number" value={views} onChange={(e) => setViews(e.target.value)} />
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <div>
          <label>Thumbnail:</label>
          <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
        </div>
        <div>
          <label>Video Demo:</label>
          <input type="file" onChange={(e) => setVideoDemo(e.target.files[0])} />
        </div>
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default CreateCourse;