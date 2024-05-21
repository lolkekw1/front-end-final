import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './ProfilePage.css';

const ProfilePage = () => {
  const userInfo = useSelector(state => state.user.userInfo);
  const favorites = useSelector(state => state.manga.favorites);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userInfo ? userInfo.name : '');
  const [email, setEmail] = useState(userInfo ? userInfo.email : '');
  const [bio, setBio] = useState(userInfo ? userInfo.bio : '');

  const saveProfile = () => {
    dispatch(updateUser({ name, email, bio }));
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <h1>Профиль пользователя</h1>
      {editing ? (
        <div className="profile-form">
          <label>
            Имя:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Биография:
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
          <button onClick={saveProfile}>Сохранить</button>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Имя:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Биография:</strong> {bio}</p>
          <button onClick={() => setEditing(true)}>Редактировать</button>
        </div>
      )}

      <div className="favorites">
        <h2>Избранные манги</h2>
        <ul>
          {favorites.map((manga, index) => (
            <li key={index}>
              <p><strong>Название:</strong> {manga.title}</p>
              <p><strong>Автор:</strong> {manga.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
