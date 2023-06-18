import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseString } from 'xml2js';
import { Header } from '../components/shared/Header';
import { getEpisodes, getPodcastById } from '../services/api';


const DetailPodcastPage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [podcast, setPodcast] = useState()
    const { podcastId } = useParams();

    useEffect(() => {
        const getDataPodcasts = async () => {
            try {

                const res = await getPodcastById(podcastId)

                const { trackName, artistName, artworkUrl100, feedUrl } = res.results[0];
                const xmlData = await getEpisodes(feedUrl)


                parseString(xmlData, (error, result) => {
                    if (error) {
                        console.error(error);
                    } else {
                        const episodesData = result.rss.channel[0].item;
                        setEpisodes(episodesData);
                    }
                });
            } catch (error) {
                console.log(error)
            }
        }

        getDataPodcasts()
    }, [])

    console.log(episodes)
    return (
        <div className="container">
            <Header />
        </div>
    );
};

export default DetailPodcastPage;