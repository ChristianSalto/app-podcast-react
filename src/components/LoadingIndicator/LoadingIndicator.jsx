import React from 'react';

const LoadingIndicator = ({ visible }) => {

    if (!visible) {
        return null;
    }

    return (
        <div className="spinner-grow text-primary spinner-grow-sm" role="status">
            <span className="visually-hidden">Cargando...</span>
        </div>
    );
};

export default LoadingIndicator;