import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = React.memo(() => {
  const canvasRef = useRef(null);
  const [isLowPerformance, setIsLowPerformance] = useState(null); // null = detecting, true = low perf, false = high perf

  useEffect(() => {
    // GPU Detection: Check for integrated/low-end GPUs
    const detectGPU = async () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (gl) {
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            
            console.log('GPU Detected:', renderer, vendor);
            
            // High-end mobile GPUs that can handle animations
            const isHighEndMobile = /Mali-G[6-9][0-9]|Adreno.*[6-8][0-9]{2}|Apple GPU/i.test(renderer);
            
            // Low-end GPUs that should disable animations
            const isLowEndDesktop = /Intel.*HD|Intel.*UHD.*[2-6][0-9]{2}|AMD.*Vega.*[0-9]{1,2}\s*Graphics/i.test(renderer);
            const isLowEndMobile = /Mali-[4-5][0-9]{2}|Mali-T|Adreno.*[2-5][0-9]{2}/i.test(renderer);
            
            const shouldDisable = (isLowEndDesktop || isLowEndMobile) && !isHighEndMobile;
            
            console.log('Performance Assessment:', {
              isHighEndMobile,
              isLowEndDesktop,
              isLowEndMobile,
              animationsDisabled: shouldDisable
            });
            
            setIsLowPerformance(shouldDisable);
            return shouldDisable;
          }
        }
        setIsLowPerformance(false);
        return false;
      } catch (error) {
        console.log('GPU detection failed, enabling animations by default');
        setIsLowPerformance(false);
        return false;
      }
    };
    
    const initAnimation = async () => {
      const isLowPerf = await detectGPU();
      
      // Don't run animations if low performance GPU detected
      if (isLowPerf) {
        console.log('Low performance GPU detected, animations disabled');
        return;
      }
      
      const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      // More particles since we removed expensive connection calculations
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

        // Draw particle only (connections removed for performance)
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
    };
    
    initAnimation();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Particle Canvas - Hidden on low performance devices */}
      {!isLowPerformance && <canvas ref={canvasRef} className="absolute inset-0" />}

      {/* Gradient Orbs - Simpler animations on low performance devices */}
      <motion.div
        animate={!isLowPerformance ? {
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00FFD1]/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={!isLowPerformance ? {
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 0.8, 1]
        } : {}}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#00FFD1]/5 rounded-full blur-[100px]"
      />
      <motion.div
        animate={!isLowPerformance ? {
          x: [0, 50, 0],
          y: [0, 100, 0]
        } : {}}
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