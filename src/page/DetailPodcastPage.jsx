import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { parseString } from 'xml2js';
import { Header } from '../components/shared/Header';
import { getEpisodes, getPodcastById } from '../services/api';
import Table from '../components/Table/Table';
import CardDetails from '../components/CardDetails/CardDetails';


const DetailPodcastPage = () => {
    const [episodes, setEpisodes] = useState([]);
    const [detailsCard, setDetailsCard] = useState({
        img: '',
        nameSong: '',
    })
    const { podcastId } = useParams();

    useEffect(() => {
        const storeDataEpisodes = localStorage.getItem(`dataEpisode_${podcastId}`);
        const storedDetails = localStorage.getItem(`podcastDetails_${podcastId}`);
        const twentyFourHoursInMs = 24 * 60 * 60 * 1000;


        if (storeDataEpisodes && storedDetails) {
            const { img, nameSong } = JSON.parse(storedDetails);
            const { lastExecution, data } = JSON.parse(storeDataEpisodes);
            const elapsedTime = Date.now() - lastExecution;

            if (elapsedTime <= twentyFourHoursInMs) {
                setEpisodes(data);
                setDetailsCard({
                    img,
                    nameSong
                });
                return;
            }
        }

        const getDataPodcasts = async () => {
            try {

                const res = await getPodcastById(podcastId)

                const { trackName, artworkUrl600, feedUrl } = res.results[0];
                const detailsData = {
                    img: artworkUrl600,
                    nameSong: trackName
                };

                if (
                    JSON.stringify(detailsData) !== storedDetails ||
                    !storeDataEpisodes ||
                    Date.now() - JSON.parse(storeDataEpisodes).lastExecution > twentyFourHoursInMs
                ) {
                    setDetailsCard(detailsData);
                    localStorage.setItem(`podcastDetails_${podcastId}`, JSON.stringify(detailsData));
                }

                const xmlData = await getEpisodes(feedUrl)


                parseString(xmlData, (error, result) => {
                    if (error) {
                        console.error(error);
                    } else {
                        const episodesData = result.rss.channel[0].item;
                        if (
                            JSON.stringify(episodesData) !== storeDataEpisodes ||
                            !storedDetails ||
                            Date.now() - JSON.parse(storeDataEpisodes).lastExecution > twentyFourHoursInMs
                        ) {
                            setEpisodes(episodesData);
                            localStorage.setItem(`dataEpisode_${podcastId}`, JSON.stringify({
                                lastExecution: Date.now(),
                                data: episodesData
                            }));
                        }
                    }
                });

            } catch (error) {
                console.log(error)
            }
        }

        getDataPodcasts();


    }, [podcastId])


    return (
        <div className="container">
            <Header />
            <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-4 mb-4">
                    <CardDetails detailsCard={detailsCard} />
                </div>
                <div className="col-12 col-lg-8">
                    <div className="card text-start mb-4">
                        <strong><h2>Episodes: {episodes?.length}</h2></strong>
                    </div>
                    <div className="card mb-5">
                        <Table episodes={episodes} podcastId={podcastId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPodcastPage;