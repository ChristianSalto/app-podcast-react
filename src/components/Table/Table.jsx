import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Table = (episodes) => {
    const { episodes: nestedEpisodes } = episodes
    const titleEpisode = nestedEpisodes.map(nestedEpisode => nestedEpisode.title.join())
    const enclosures = nestedEpisodes.map((nestedEpisode) => nestedEpisode.enclosure)
    const descriptions = nestedEpisodes.map((nestedEpisode) => nestedEpisode.description)
    const linkEpisode = enclosures.map(item => {
        return item ? item[0]["$"].url : ""
    })

    const datePodcast = nestedEpisodes.map((nestedEpisode) => {
        const dateStr = nestedEpisode.pubDate.join();
        const date = new Date(dateStr);
        return date.toLocaleDateString("es-ES");
    })

    const durationPodcast = nestedEpisodes.map((nestedEpisode) => nestedEpisode["itunes:duration"] ? nestedEpisode["itunes:duration"].join() : "")
    const { podcastId } = useParams();


    const payload = {
        descriptions,
        linkEpisode,
        titleEpisode
    }

    return (
        <div className='table-container'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className='text-start'>Title</th>
                        <th scope="col">Date</th>
                        <th scope="col">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {titleEpisode.map((title, index) => (
                        <tr key={index}>
                            <th scope="row" className='text-start'>
                                <Link key={index} to={`/podcast/${podcastId}/episode/${index}`} state={payload}>
                                    {title.match(/Episode \d+ \| ["“]([^"”]+)["”]/) ? title.match(/Episode \d+ \| ["“]([^"”]+)["”]/)[1] : title}
                                </Link>
                            </th>
                            <td>{datePodcast[index]}</td>
                            <td>{durationPodcast[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;