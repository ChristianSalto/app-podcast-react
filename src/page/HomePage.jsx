import React, { useEffect, useState } from 'react';
import { Header } from '../components/shared/Header';
import { getToppodcasts } from '../services/api';
import { Card } from '../components/Card/Card';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [dataPodcasts, setDataPodcasts] = useState()
  const [filter, setFilter] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);
  const [visiblePodcasts, setVisiblePodcasts] = useState(20);
  const podcastsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('podcastData');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setDataPodcasts(parsedData);
        } else {
          await fetchPodcasts();
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchPodcasts();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    if (filter) {
      setIsFiltering(true);
      setTimeout(() => {
        setIsFiltering(false);
      }, 1000);
    }
  }, [filter]);
  
  const fetchPodcasts = async () => {
    try {
      const response = await getToppodcasts();
      const { entry } = response.data.feed;
      setDataPodcasts(entry);
      localStorage.setItem('podcastData', JSON.stringify(entry));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setIsFiltering(true);
  };

  const filteredPodcasts = dataPodcasts?.filter((data) => {
    const title = data.title.label.toLowerCase();
    const author = data["im:artist"].label.toLowerCase();
    const filterValue = filter.toLowerCase();

    return title.includes(filterValue) || author.includes(filterValue);
  });

  const podcastsToDisplay = filter ? filteredPodcasts : dataPodcasts;
  const isEmpty = podcastsToDisplay?.length === 0;
  const visiblePodcastsData = podcastsToDisplay?.slice(0, visiblePodcasts);

  const handleShowMore = () => {
    setVisiblePodcasts(visiblePodcasts + podcastsPerPage);
  };


  return (
    <div className="container">
      <Header />
      <div className='row mb-5 d-flex align-items-center'>
        <div className="col-8 text-end">
          <span className="badge text-bg-primary p-2">{podcastsToDisplay?.length}</span>
        </div>
        <div className="col-4">
          <input className="form-control" type="text" placeholder="Filter podcasts..." aria-label="Filter podcasts" value={filter}
            onChange={handleFilterChange} />
        </div>
      </div>
      {isEmpty && !isFiltering ? (
        <div className="text-center">No podcasts found.</div>
      ) : (
        <div className="grid-container mb-4">
          {visiblePodcastsData?.map((data, index) => (
            <Link key={index} to={`/podcast/${data.id.attributes["im:id"]}`}>
              <Card key={index} img={data["im:image"][0]} title={data.title.label} author={data["im:artist"].label} />
            </Link>
          ))}
        </div>
      )}
      {visiblePodcasts < podcastsToDisplay?.length && (
        <div className="text-center mt-3 mb-3">
          <button className="btn btn-light text-primary" onClick={handleShowMore}>
            Ver más
          </button>
        </div>
      )}
      {isFiltering && (
        <div className="d-flex justify-content-center align-items-center vh-50">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;