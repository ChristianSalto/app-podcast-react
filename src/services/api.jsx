import axios from 'axios';
const URL = 'https://itunes.apple.com/';
const PROXY_URL = 'http://localhost:3001/podcast?';

export const getToppodcasts = () => {
  return axios.get(`${URL}us/rss/toppodcasts/limit=100/genre=1310/json`).then(response => {
    return response;
  }).catch(error => {
    const data = error.response
    return data;
  });
};

export const getPodcastById = (podcastId = null) => {
  return axios.get(`${PROXY_URL}podcastId=${podcastId}`).then(response => {
    return response.data;
  }).catch(error => {
    const data = error.response
    return data;
  });
};


export const getEpisodes = (url = null) => {
  return axios.get(`${url}`).then(response => {
    return response.data;
  }).catch(error => {
    const data = error.response
    return data;
  });
};