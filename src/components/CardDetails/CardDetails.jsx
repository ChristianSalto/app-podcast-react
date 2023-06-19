import React from 'react';
import './cardDetails.scss'

const CardDetails = ({detailsCard}) => {
    const { img, nameSong } = detailsCard;

    return (
        <div className="card card-details">
            <div className='card-details__header'>
                <img className='card-details__img' src={img} alt="" />
            </div>
            <div className='card-details__body'>
                <span>Song:</span>
                <p>{nameSong}</p>
            </div>
            <div className='card-details__footer'>
                <p><span>Description:</span></p>
                <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.
                    Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500,
                    cuando un impresor (N. del T. persona que se dedica a la imprenta)
                    desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
            </div>
        </div>
    );
};

export default CardDetails;