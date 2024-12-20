// import React from 'react';
// import { useParams } from 'react-router-dom';

// const RowDetailsPage: React.FC = () => {
//   const { id } = useParams();

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h2>Row Details</h2>
//       <p>You are viewing details for row ID: {id}</p>
//     </div>
//   );
// };

// export default RowDetailsPage;


import React from "react";
import { useLocation } from "react-router-dom";

// Define the type for Artwork
interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

// Type for location state
interface LocationState {
  selectedRows?: Artwork[]; // selectedRows will be optional
}

const RowDetailsPage: React.FC = () => {
  // UseLocation hook with a type assertion for location.state
  const location = useLocation();
  const selectedRows: Artwork[] = (location.state as LocationState)?.selectedRows || [];

  return (
    <div>
      <h2>Row Details</h2>
      {selectedRows.length > 0 ? (
        <ul>
          {selectedRows.map((row) => (
            <li key={row.id}>
              <h3>{row.title}</h3>
              <p>{row.place_of_origin}</p>
              <p>{row.artist_display}</p>
              <p>{row.inscriptions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No rows selected.</p>
      )}
    </div>
  );
};

export default RowDetailsPage;
