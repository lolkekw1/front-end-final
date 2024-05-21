import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './Header.css';
import { logout } from '../../actions/userActions.ts';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.user.userInfo);

  const goToHome = () => {
    navigate('/');
  };

  const goToCatalog = () => {
    navigate('/catalog');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return React.createElement(
    'header',
    { className: 'App-header' },
    React.createElement('img', { src: logo, className: 'App-logo', alt: 'logo', onClick: goToHome }),
    React.createElement(
      'nav',
      null,
      React.createElement(
        'ul',
        null,
        React.createElement(
          'li',
          null,
          React.createElement('button', { className: 'link-button', onClick: goToCatalog }, 'Каталог')
        ),
        userInfo ? (
          React.createElement(
            'li',
            null,
            React.createElement('button', { className: 'link-button', onClick: goToProfile }, `Профиль ${userInfo.name}`)
          )
        ) : (
          React.createElement(
            React.Fragment,
            null,
            React.createElement(
              'li',
              null,
              React.createElement('button', { className: 'link-button', onClick: goToLogin }, 'Вход')
            ),
            React.createElement(
              'li',
              null,
              React.createElement('button', { className: 'link-button', onClick: goToRegister }, 'Регистрация')
            )
          )
        ),
        userInfo && React.createElement(
          'li',
          null,
          React.createElement('button', { className: 'link-button', onClick: handleLogout }, 'Выход')
        )
      )
    )
  );
};

export default Header;
