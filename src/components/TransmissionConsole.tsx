import React, { useRef, useEffect, useState } from 'react';
import './TransmissionConsole.css';

// Small helper to create noise buffer
function createNoiseBuffer(ctx: AudioContext, duration = 1) {
  const sampleRate = ctx.sampleRate;
  const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.4;
  return buffer;
}

const TransmissionConsole: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | OscillatorNode | null>(null);
  const noiseRef = useRef<AudioBufferSourceNode | null>(null);
  const [playing, setPlaying] = useState(false);
  const [signal, setSignal] = useState(100);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  useEffect(() => {
    let rafId: number;
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
      analyser.getByteTimeDomainData(dataArray);
      ctx.fillStyle = '#02020a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(0, 255, 200, 0.9)';
      ctx.beginPath();
      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // subtle scanline
      ctx.fillStyle = 'rgba(0,255,200,0.02)';
      for (let i = 0; i < canvas.height; i += 4) {
        ctx.fillRect(0, i, canvas.width, 1);
      }

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => cancelAnimationFrame(rafId);
  }, [playing]);

  const startTransmission = async () => {
    if (playing) return stopTransmission();

    const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
    const audioCtx = new AudioContextClass();
    audioCtxRef.current = audioCtx;

    // create analyser for visualization
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    analyserRef.current = analyser;

    // create a voice-like oscillator (sweeping frequency) to simulate a transmission
    const osc = audioCtx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 220;
    sourceRef.current = osc;

    // gentle bandpass to make it sound like voice over radio
    const band = audioCtx.createBiquadFilter();
    band.type = 'bandpass';
    band.frequency.value = 1200;
    band.Q.value = 1.2;

    // gain envelope
    const gain = audioCtx.createGain();
    gain.gain.value = 0.0;

    // noise source for static
    const noiseBuffer = createNoiseBuffer(audioCtx, 2);
    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    noiseRef.current = noise as AudioBufferSourceNode;
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.value = 0.12;

    // routing
    osc.connect(band);
    band.connect(gain);
    gain.connect(analyser);
    analyser.connect(audioCtx.destination);

    noise.connect(noiseGain);
    noiseGain.connect(analyser);

    // start nodes
    osc.start();
    noise.start();

    // simple envelope to fade in
    gain.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.9, audioCtx.currentTime + 0.4);
    gain.gain.linearRampToValueAtTime(0.6, audioCtx.currentTime + 1.2);

    setPlaying(true);

    // fake signal strength updates
    let s = 80;
    const signalInterval = setInterval(() => {
      s += (Math.random() * 10 - 5);
      s = Math.max(10, Math.min(100, s));
      setSignal(Math.round(s));
    }, 800);

    // stop automatically after a few seconds to simulate end of transmission
    setTimeout(() => {
      stopTransmission();
      clearInterval(signalInterval);
    }, 15000);
  };

  const stopTransmission = () => {
    setPlaying(false);
    try {
      if (sourceRef.current && 'stop' in sourceRef.current) (sourceRef.current as any).stop();
      if (noiseRef.current) noiseRef.current.stop();
      if (audioCtxRef.current) audioCtxRef.current.close();
    } catch (e) {
      // ignore
    }
    audioCtxRef.current = null;
    analyserRef.current = null;
    sourceRef.current = null;
    noiseRef.current = null;
  };

  return (
    <section className="transmission-console">
      <div className="console-left">
        <div className="screen">
          <canvas ref={canvasRef} width={640} height={160} />
          <div className="overlay">RECEIVING...</div>
        </div>

        <div className="controls">
          <button className={`btn ${playing ? 'btn-stop' : 'btn-play'}`} onClick={startTransmission}>
            {playing ? 'Stop' : 'Play Transmission'}
          </button>
          <div className="signal">Signal: <strong>{signal}%</strong></div>
        </div>
      </div>

      <aside className="console-right">
        <div className="telemetry">
          <div className="row"><span className="key">ID</span><span className="val">TR-0001</span></div>
          <div className="row"><span className="key">TIME</span><span className="val">{new Date().toUTCString()}</span></div>
          <div className="row"><span className="key">COORD</span><span className="val">42.360°N, 71.058°W</span></div>
          <div className="row"><span className="key">ENCRYPT</span><span className="val">AES-??</span></div>
        </div>

        <div className="log">
          <div className="log-line">[00:00] Link established</div>
          <div className="log-line">[00:02] Handshake complete</div>
          <div className="log-line">[00:04] Incoming transmission...</div>
        </div>
      </aside>
    </section>
  );
};

export default TransmissionConsole;
