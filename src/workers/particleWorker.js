// Particle Worker - Handles all particle rendering off the main thread
let canvas = null;
let ctx = null;
let particles = [];
let animationId = null;
let width = 0;
let height = 0;

const createParticles = (particleCount = 25) => {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
};

const drawParticles = () => {
  if (!ctx) return;
  
  ctx.clearRect(0, 0, width, height);
  
  particles.forEach((particle) => {
    // Update position
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    // Wrap around edges
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;

    // Draw particle
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 209, ${particle.opacity})`;
    ctx.fill();
  });

  animationId = requestAnimationFrame(drawParticles);
};

// Handle messages from main thread
self.onmessage = (e) => {
  const { type, data } = e.data;

  switch (type) {
    case 'init':
      canvas = data.canvas;
      ctx = canvas.getContext('2d');
      width = data.width;
      height = data.height;
      createParticles(data.particleCount || 25);
      drawParticles();
      self.postMessage({ type: 'ready' });
      break;

    case 'resize':
      width = data.width;
      height = data.height;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
      createParticles(data.particleCount || 25);
      break;

    case 'stop':
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      break;

    default:
      break;
  }
};
