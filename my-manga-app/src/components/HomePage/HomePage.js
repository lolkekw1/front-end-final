import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../../actions/mangaActions.ts';
import './HomePage.css';

const HomePage = () => {
  const [mangaList, setMangaList] = useState([]);
  const [filteredMangaList, setFilteredMangaList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetch('/manga.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMangaList(data);
        setFilteredMangaList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching manga data:', error);
        setError('Не удалось загрузить данные о манге.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = mangaList.filter(manga =>
      manga.Title && typeof manga.Title === 'string' && manga.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (minDate || maxDate) {
      results = results.filter(manga => {
        const publishedDate = new Date(manga.Published);
        const minPublishedDate = minDate ? new Date(minDate) : new Date(-8640000000000000); // Use very early date if no minDate
        const maxPublishedDate = maxDate ? new Date(maxDate) : new Date(8640000000000000); // Use very late date if no maxDate
        return publishedDate >= minPublishedDate && publishedDate <= maxPublishedDate;
      });
    }
    if (minScore || maxScore) {
      results = results.filter(manga =>
        manga.Score && (!minScore || parseFloat(manga.Score) >= parseFloat(minScore)) && (!maxScore || parseFloat(manga.Score) <= parseFloat(maxScore))
      );
    }
    setFilteredMangaList(results);
    setCurrentPage(1); // Возвращаем пользователя на первую страницу после поиска
  }, [searchTerm, minDate, maxDate, minScore, maxScore, mangaList]);

  const handleAddToFavorites = (manga) => {
    dispatch(addToFavorites(manga));
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMangaList.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredMangaList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button 
          key={number} 
          onClick={() => handleClick(number)} 
          className={currentPage === number ? "button-pagination active" : "button-pagination"}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  return (
    <div className="homepage">
      <h1>Манга</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Поиск по названию..."
        className="search-bar"
      />
      <input
        type="date"
        value={minDate}
        onChange={(e) => setMinDate(e.target.value)}
        placeholder="От даты..."
        className="search-bar"
      />
      <input
        type="date"
        value={maxDate}
        onChange={(e) => setMaxDate(e.target.value)}
        placeholder="До даты..."
        className="search-bar"
      />
      <input
        type="number"
        value={minScore}
        onChange={(e) => setMinScore(e.target.value)}
        placeholder="Минимальный рейтинг..."
        className="search-bar"
      />
      <input
        type="number"
        value={maxScore}
        onChange={(e) => setMaxScore(e.target.value)}
        placeholder="Максимальный рейтинг..."
        className="search-bar"
      />
      <div className="manga-list">
        {currentItems.map((manga, index) => (
          <div key={index} className="manga-card">
            <h2>{manga.Title}</h2>
            <p>Рейтинг: {manga.Rank}</p>
            <button onClick={() => handleAddToFavorites(manga)}>Добавить в избранное</button>
            <p>Тип: {manga.Type}</p>
            <p>Томов: {manga.Volumes}</p>
            <p>Опубликовано: {manga.Published}</p>
            <p>Прочитали: {manga.Members}</p>
            <p>Оценка: {manga.Score}</p>
            <a href={manga.page_url}>Ссылка на MyAnimeList</a>
            <div>
              <img src={manga.image_url} alt={`Обложка манги ${manga.Title}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          className="button-pagination"
          onClick={handlePrevbtn}
          disabled={currentPage === pageNumbers[0]}
        >
          Prev
        </button>
        {renderPageNumbers}
        <button 
          className="button-pagination"
          onClick={handleNextbtn}
          disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
