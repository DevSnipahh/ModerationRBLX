import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ModerationQueue() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    // Fetch moderation queue data from backend
    axios.get('https://script.google.com/macros/s/AKfycbxJrEF8u-Muyqc85ffPKpOI4Lw9udcOtANMjoRQq6HKNcaEcak_CW9k3Dcf6opeZsz0/exec').then((response) => {
      setQueue(response.data);
    });
  }, []);

  const handleAction = (id, action) => {
    axios.post('https://script.google.com/macros/s/AKfycbxJrEF8u-Muyqc85ffPKpOI4Lw9udcOtANMjoRQq6HKNcaEcak_CW9k3Dcf6opeZsz0/exec', {
      id,
      action,
    }).then(() => {
      // Optionally update the queue state to remove processed items
      setQueue(queue.filter(request => request.id !== id));
    });
  };

  return (
    <div className="moderation-queue">
      <h2>Moderation Queue</h2>
      {queue.length > 0 ? (
        queue.map((request) => (
          <div key={request.id} className="queue-item">
            <img src={request.imageLink} alt="User submission" />
            <p>{request.username}</p>
            <button onClick={() => handleAction(request.id, 'accept')}>Accept</button>
            <button onClick={() => handleAction(request.id, 'decline')}>Decline</button>
          </div>
        ))
      ) : (
        <p>No pending requests</p>
      )}
    </div>
  );
}

export default ModerationQueue;
