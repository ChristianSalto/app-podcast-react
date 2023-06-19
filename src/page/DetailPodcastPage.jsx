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
        const getDataPodcasts = async () => {
            try {

                const res = await getPodcastById(podcastId)
                console.log(res)

                const { trackName, artworkUrl600, feedUrl } = res.results[0];
                setDetailsCard({
                    img: artworkUrl600,
                    nameSong: trackName
                })

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

    return (
        <div className="container">
            <Header />
            <div className="row d-flex justify-content-between">
                <div className="col-4">
                    <CardDetails detailsCard={detailsCard} />
                </div>
                <div className="col-8">
                    <div className="card">
                        <Table />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPodcastPage;