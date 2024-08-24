import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import ModerationQueue from './components/ModerationQueue';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/moderation-queue" element={<ModerationQueue />} />
      </Routes>
    </Router>
  );
}

export default App;
