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

// export const getPodcastById = (idPodcast = null) => {
//   return axios.get(`${URL}lookup?id=${1535809341}`).then(response => {
//     return response;
//   }).catch(error => {
//     const data = error.response
//     return data;
//   });
// };

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

// export const getEpisodeById = (idPodcast = null) => {
//   const allOriginsUrl = 'https://allorigins.win/';
//   const externalUrl = 'https://podcasts.apple.com/us/podcast/apple-events/id1473854035?i=1000479125753';
//   return axios.get(allOriginsUrl + encodeURIComponent(externalUrl)).then(response => {
//     const data = response.data.contents;
//     console.log(data);
//   }).catch(error => {
//     const data = error.response
//     return data;
//   });
// };


//https://podcasts.apple.com/us/podcast/apple-events/id1473854035?i=1000479125753