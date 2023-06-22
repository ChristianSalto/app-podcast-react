import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Header } from '../components/shared/Header';
import CardDetails from '../components/CardDetails/CardDetails';
import ReactAudioPlayer from 'react-audio-player';

const EpisodePodcastPage = () => {
    const { podcastId, episodeId } = useParams();
    const { state } = useLocation();
    const { linkEpisode, descriptions, titleEpisode } = state

    const detailsCard = JSON.parse(localStorage.getItem(`podcastDetails_${podcastId}`))

    return (
        <div>
            <div className="container">
                <Header />
                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-4 mb-4">
                        <CardDetails detailsCard={detailsCard} />
                    </div>
                    <div className="col-12 col-lg-8">
                        <div className="card">
                            <h2>{titleEpisode[episodeId]}</h2>
                            <p>
                                {descriptions[episodeId]}
                            </p>
                            <ReactAudioPlayer
                                src={linkEpisode[episodeId]}
                                autoPlay
                                controls
                                style={{ width: '100%', marginTop: '20px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EpisodePodcastPage;