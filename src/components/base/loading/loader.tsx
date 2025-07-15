/* eslint-disable react/no-array-index-key */
'use client';

import { motion } from 'motion/react';

interface IProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  showText?: boolean;
  className?: string;
}

export default function Loader({ size = 'md', text = 'LOADING', showText = true, className = '' }: Readonly<IProps>) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
      <div className={`relative ${sizeClasses[size]}`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="50" cy="50" r="35" fill="#00ffff" opacity="0.1">
            <animate attributeName="r" values="35;45;35" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.1;0.3;0.1" dur="2s" repeatCount="indefinite" />
          </circle>

          <polygon points="50,25 60,40 40,40" fill="#ff00ff" filter="url(#glow)" opacity="0.8" transform="rotate(0 50 50)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 50 50;360 50 50"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </polygon>
          <polygon points="50,25 60,40 40,40" fill="#00ffff" filter="url(#glow)" opacity="0.8" transform="rotate(120 50 50)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="120 50 50;480 50 50"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </polygon>
          <polygon points="50,25 60,40 40,40" fill="#00ff00" filter="url(#glow)" opacity="0.8" transform="rotate(240 50 50)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="240 50 50;600 50 50"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </polygon>
        </svg>

        {[...Array.from({ length: 6 })].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [-6, 6, -6],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5 + i * 0.1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut',
            }}
          />
        ))}

        <motion.div
          className="absolute inset-0 border border-cyan-400/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {showText && (
        <motion.div
          className={`font-mono font-bold text-cyan-400 tracking-wider ${textSizeClasses[size]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text.split('').map((char, i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: 'easeInOut',
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
