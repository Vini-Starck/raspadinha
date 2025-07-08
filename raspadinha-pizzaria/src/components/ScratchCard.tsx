import { useRef, useEffect, useState } from 'react';

const PRIZES = [
  { label: '5% OFF', code: 'PIZZA5' },
  { label: '10% OFF', code: 'PIZZA10' },
  { label: '15% OFF', code: 'PIZZA15' },
  { label: 'Refrigerante Grátis', code: 'REFRIGRATIS' },
  { label: 'Pizza Grátis 🍕', code: 'PIZZAGRATIS' }, // raro
];

// Tipo para as partículas
interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
}

function getRandomPrize() {
  const roll = Math.random();
  if (roll < 0.5) return PRIZES[0];       // 50% chance 5%
  if (roll < 0.8) return PRIZES[1];       // 30% chance 10%
  if (roll < 0.95) return PRIZES[2];      // 15% chance 15%
  if (roll < 0.995) return PRIZES[3];     // 4.5% chance refrigerante
  return PRIZES[4];                       // 0.5% chance pizza grátis
}

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null); // Referência para o canvas de partículas
  const [isComplete, setIsComplete] = useState(false);
  const [prize] = useState(() => getRandomPrize());
  const particlesRef = useRef<Particle[]>([]); // Use Ref para armazenar partículas

  // Função para emitir partículas adiciona direto na ref
  const emitParticles = (x: number, y: number) => {
    const newParticles = Array.from({ length: 1 }).map(() => ({
      x,
      y,
      size: Math.random() * 14 + 10,
      alpha: 1,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    }));
    particlesRef.current.push(...newParticles); // Usando a ref para armazenar as partículas
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = '/scratch.png';
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    let isDrawing = false;

    const startDraw = () => { isDrawing = true; };
    const endDraw = () => {
      isDrawing = false;
      checkProgress();
    };

    const draw = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing || !ctx || !canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = (e instanceof TouchEvent ? e.touches[0].clientX : (e as MouseEvent).clientX) - rect.left;
        const y = (e instanceof TouchEvent ? e.touches[0].clientY : (e as MouseEvent).clientY) - rect.top;

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const scaledX = x * scaleX;
        const scaledY = y * scaleY;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(scaledX, scaledY, 20, 0, Math.PI * 2);
        ctx.fill();

        emitParticles(scaledX, scaledY); // Agora emitindo no local certo
    };



    const checkProgress = () => {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      for (let i = 3; i < imgData.data.length; i += 4) {
        if (imgData.data[i] < 128) transparent++;
      }

      const percent = (transparent / (canvas.width * canvas.height)) * 100;

      if (percent > 45 && !isComplete) {
        setIsComplete(true);
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 👈 limpa tudo
        setTimeout(() => {
          alert(`🎉 Prêmio: ${prize.label} — Código: ${prize.code}`);
        }, 300);
      }
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchstart', startDraw);
    canvas.addEventListener('touchend', endDraw);
    canvas.addEventListener('touchmove', draw);

    return () => {
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mouseup', endDraw);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('touchstart', startDraw);
      canvas.removeEventListener('touchend', endDraw);
      canvas.removeEventListener('touchmove', draw);
    };
  }, [isComplete, prize]);

  // Render das partículas direto no canvas, atualizando frame a frame
  useEffect(() => {
    const particlesCanvas = particlesCanvasRef.current;
  const mainCanvas = canvasRef.current;
  if (!particlesCanvas || !mainCanvas) return;

  const ctx = particlesCanvas.getContext('2d');
  if (!ctx) return;

  // Corrigir aqui 👇
  const rect = mainCanvas.getBoundingClientRect();
  particlesCanvas.width = rect.width;
  particlesCanvas.height = rect.height;



    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0); // Filtra as partículas

      particlesRef.current.forEach((p: Particle) => { // Tipando p corretamente
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        ctx.globalAlpha = p.alpha;
        ctx.font = `${p.size}px serif`;
        ctx.fillText('🍕', p.x, p.y);
      });

      ctx.globalAlpha = 0,5;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-72 h-72 mx-auto flex items-center justify-center">
      {isComplete && (
        <div
          className="absolute inset-0 z-0 bg-white rounded-lg flex flex-col items-center justify-center animate-fade-in"
        >
          <span className="text-2xl font-bold text-green-700">{prize.code}</span>
          <span className="text-sm text-gray-500 mt-1">{prize.label}</span>
        </div>
      )}

        <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="rounded-full border shadow z-10 block"
        />

        <canvas
            ref={particlesCanvasRef}
            width={300}
            height={300}
            className="absolute inset-0 z-20 pointer-events-none rounded-full"
        />
    </div>
  );
}
