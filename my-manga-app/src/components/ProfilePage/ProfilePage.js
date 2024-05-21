import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../actions/userActions.ts'; // Не нужно импортировать updateUser
import './ProfilePage.css'; // Импортируем стили

const ProfilePage = () => {
  // Получаем данные о пользователе из Redux store
  const userInfo = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  // Состояния для редактирования профиля
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userInfo ? userInfo.name : '');
  const [email, setEmail] = useState(userInfo ? userInfo.email : '');
  const [bio, setBio] = useState(userInfo ? userInfo.bio : '');

  // Функция для сохранения изменений профиля
  const saveProfile = () => {
    // Отправляем обновленные данные пользователя в Redux store
    dispatch(updateUser({ name, email, bio }));
    setEditing(false); // Завершаем редактирование
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
    </div>
  );
};

export default ProfilePage;
