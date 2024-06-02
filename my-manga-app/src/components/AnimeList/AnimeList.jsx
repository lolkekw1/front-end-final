import React, { useState, useEffect } from 'react';
import useGetAnimeList from './useGetAnimeList.ts';
import './AnimeList.css';

function AnimeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [animesPerPage] = useState(10); // количество аниме на страницу
  const [animeData, setAnimeData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, status } = useGetAnimeList('anime', currentPage, animesPerPage, searchTerm);

  useEffect(() => {
    if (status === 'success') {
      setAnimeData(data.data);
      setTotalPages(data.pagination.last_visible_page || 0);
    }
  }, [data, status]);

  const handleNextbtn = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevbtn = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const renderAnimeInfo = () => {
    return animeData.map(anime => (
      <div key={anime.mal_id} className="card">
        <h3>{anime.title}</h3>
        <img src={anime.images.jpg.image_url} alt={`Cover for ${anime.title}`} className="anime-img" />
        <p>{anime.synopsis}</p>
      </div>
    ));
  };

  const renderPagination = () => {
    const maxPage = Math.ceil(totalPages / 10);
    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(maxPage, currentPage + 5);

    return (
      <div className="pagination">
        <button onClick={handlePrevbtn} disabled={currentPage === 1}>
          Prev
        </button>
        {[...Array(endPage - startPage + 1)].map((_, index) => {
          const pageNumber = startPage + index;
          return (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              disabled={currentPage === pageNumber}
              style={{ fontWeight: currentPage === pageNumber ? 'bold' : 'normal' }}
            >
              {pageNumber}
            </button>
          );
        })}
        <button onClick={handleNextbtn} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="anime-list-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {renderAnimeInfo()}
      {renderPagination()}
    </div>
  );
}

export default AnimeList;
