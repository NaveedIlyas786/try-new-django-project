import React from "react";
import "./ParticlesAnimation.css"
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";



const  ParticlesAnimation=({numberOfCircles,CircleSizeMin,CircleSizeMax})=> {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  });


  return (
   
    <Particles
      className="myparticles"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fps_limit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            // onClick: {
            //   enable: true,
            //   mode: "push",
            // },
          },
          modes: {
            repulse: {
              distance: 180,
              duration: 0.3,
            },
            // push:{
            //   quantity:2
            // }
          },
        },
        particles: {
          color: {
            value: "#A0A09B",
          },
          links: {
            color: "#A0A09B",
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          shape: {
            type: "circle",
            options: {
              color: "blue",
            },
          },
          size: {
            value: { min: CircleSizeMin, max: CircleSizeMax },
          },
          number: {
            value:numberOfCircles,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: {
              default: "bounce",
            },
            speed: 2,
          },
          opacity: {
            value: 0.4,
          },
          collisions: {
            enable: true,
          },
        },
      }}
    />
  );
}

export default ParticlesAnimation;
