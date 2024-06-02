import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../actions/userActions.ts';
import './ProfilePage.css';

const defaultAvatar = 'https://via.placeholder.com/100';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userInfo ? userInfo.name : '');
  const [email, setEmail] = useState(userInfo ? userInfo.email : '');
  const [bio, setBio] = useState(userInfo ? userInfo.bio : '');
  const [avatar, setAvatar] = useState(userInfo ? userInfo.avatar : defaultAvatar);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setBio(userInfo.bio);
      setAvatar(userInfo.avatar || defaultAvatar);
    }
  }, [userInfo]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    const updatedUser = { name, email, bio };
    if (avatarFile) {
      updatedUser.avatar = avatar;
    }
    dispatch(updateUser(updatedUser));
    setEditing(false);
  };

  return (
    <div className="profile-page">
      <h1>Профиль пользователя</h1>
      <div className="avatar-container">
        <img className="avatar" src={avatar} alt="Аватар" />
        {editing && (
          <div className="avatar-upload">
            <input
              type="file"
              id="avatarUpload"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <label htmlFor="avatarUpload">Загрузить аватар</label>
          </div>
        )}
      </div>
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
