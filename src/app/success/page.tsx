'use client';

import React from 'react';

const Page = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#1f1c2c] to-[#928DAB] flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-10 rounded-2xl max-w-xl text-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          🎉 Subscription Successful!
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8">
          Congratulations! You’ve unlocked premium features.
        </p>
        <div className="text-white text-sm opacity-70">
          Thank you for subscribing. Explore all the new features now.
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="confetti"></div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1.2s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .confetti::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: url('https://cdn.jsdelivr.net/gh/prittt/confetti-background/confetti.svg');
          background-size: cover;
          opacity: 0.05;
          animation: float 10s linear infinite;
        }

        @keyframes float {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 -100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
