import React from 'react';
import './App.css';
import TransmissionConsole from './components/TransmissionConsole';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1 className="title">Exactly As Seen — Transmission Console</h1>
        <p className="subtitle">Live simulated transmissions · immersive UI · realistic audio effects</p>
      </header>

      <main>
        <TransmissionConsole />
      </main>

      <footer className="app-footer">© Exactly As Seen</footer>
    </div>
  );
}

export default App;
