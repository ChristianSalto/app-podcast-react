import React from 'react';

const Table = () => {
    return (
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Duration</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                </tr>
            </tbody>
        </table>
    );
};

export default Table;