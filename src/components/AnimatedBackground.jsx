import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = React.memo(() => {
  const canvasRef = useRef(null);
  const workerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Check for OffscreenCanvas support
    const supportsOffscreenCanvas = typeof OffscreenCanvas !== 'undefined' && canvas.transferControlToOffscreen;
    
    if (supportsOffscreenCanvas) {
      // Use Web Worker with OffscreenCanvas for better performance
      console.log('Using OffscreenCanvas with Web Worker for optimal performance');
      
      try {
        const offscreen = canvas.transferControlToOffscreen();
        const worker = new Worker(new URL('../workers/particleWorker.js', import.meta.url), { type: 'module' });
        workerRef.current = worker;
        
        const sendInit = () => {
          worker.postMessage({
            type: 'init',
            data: {
              canvas: offscreen,
              width: window.innerWidth,
              height: window.innerHeight,
              particleCount: 25
            }
          }, [offscreen]);
        };
        
        sendInit();
        
        // Handle resize
        let resizeTimeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            worker.postMessage({
              type: 'resize',
              data: {
                width: window.innerWidth,
                height: window.innerHeight,
                particleCount: 25
              }
            });
          }, 250);
        };
        
        window.addEventListener('resize', handleResize);
        
        return () => {
          worker.postMessage({ type: 'stop' });
          worker.terminate();
          window.removeEventListener('resize', handleResize);
          clearTimeout(resizeTimeout);
        };
      } catch (error) {
        console.log('OffscreenCanvas failed, falling back to main thread:', error);
      }
    }
    
    // Fallback: Traditional canvas rendering on main thread
    console.log('Using traditional canvas rendering on main thread');
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = 25;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 209, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    // Throttle resize events for better performance
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
        createParticles();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00FFD1]/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#00FFD1]/5 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 100, 0]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FFD1]/5 rounded-full blur-[150px]"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;