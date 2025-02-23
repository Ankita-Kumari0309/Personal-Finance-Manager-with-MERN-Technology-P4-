import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles'; // Import the loadFull function

const Header = () => {
  const particlesInit = useCallback(async (engine) => {
    // Correct initialization with the engine
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit} // Attach the particlesInit function
      options={{
        particles: {
          // Configure your particle options here
        },
      }}
    />
  );
};

export default Header;
