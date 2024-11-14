import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "CHATBOT",
    url: "https://docs.google.com/presentation/d/17wO0OWtegtLq3Q0CnxPM8SqcuujmRkd4ozEtvI2LYlE/edit?usp=sharing",
    image: "projects/wawatmos.jpg",
    description: "In today's digital world, businesses increasingly turn to chatbot for enhanced customer interaction 24/7 support",
  },
  {
    title: "FIVEM",
    url: "https://docs.google.com/presentation/d/17Hc2WrewF6VuEAD7061DpjFG0hqPS4IsyJNb24Uqr9U/edit?usp=sharing",
    image: "projects/baking.jpg",
    description: "i specialize in developing and enhancing FiveM servers that bring Grand Theft Auto V to life in entirely new ways",
  },
  {
    title: "GAME DEV",
    url: "https://docs.google.com/presentation/d/1GERa-C3jmL37WzKME4bFLfvaiCkuFmBDxDo58VzQH3Y/edit?usp=sharing",
    image: "projects/avatar.jpg",
    description: "Bringing idea to life through engaging and interactive experience.",
  },
  {
    title: "ROBLOX GAME",
    url: "htps://docs.google.com/presentation/d/10zVBBoTUsCfZ2jxdnA3Se7y1S1QSiriixp0qfJhZ4i0/edit?usp=sharing",
    image: "projects/kanagame.jpg",
    description: "As a roblox game developer, i bring imaginative worlds and engaging gameplay to life",
  },
  {
    title: "CRASH GAME",
    url: "https://docs.google.com/presentation/d/1tnkiqEItgyifU64iTRtWL9p8AAgW2Jvxe1KFuaW7KX0/edit?usp=sharing",
    image: "projects/loader.jpg",
    description: "Whether you are looking to lauch a crash game as a standalone or integration it within a larger platform.",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
