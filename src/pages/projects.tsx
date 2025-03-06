import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  previewImage: string;
  images: string[];
  longDescription: string;
}

const projects: Project[] = [
  {
    title: "the network",
    description: "a comprehensive analysis of user behavior and engagement patterns",
    previewImage: "/media/projects/project2/1.gif",
    images: [
      "/media/projects/project2/2.mp4"
    ],
    longDescription: "the network is a community built specifically to network. we have incredibly big names there, and is made to help, and connect creators and businesses alike."
  },
  {
    title: "case study",
    description: "a modern social networking platform built with next.js",
    previewImage: "/media/projects/project1/1.gif",
    images: [
      "/media/projects/project1/2.png",
      "/media/projects/project1/3.png"
    ],
    longDescription: "i took on a creator to scale up his channels... i did not realize how much. we begun in late November, and i began coaching him. i was critiquing his content, scripts, editing, and soon enough, he went from $5k/month to almost $75k/month. this was insane, because it was my FIRST ever client. we worked on two channels together for a single month."
  },
  {
    title: "snapstart",
    description: "a rapid prototyping tool for web applications",
    previewImage: "/media/projects/project3/1.gif",
    images: [
      "/media/projects/project3/1.gif"
    ],
    longDescription: "this is a program for creators to apply for the MSN Start and Snapchat Snapshow programs respectively."
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextImage = () => {
    if (selectedProject) {
      setDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
    }
  };

  const previousImage = () => {
    if (selectedProject) {
      setDirection(-1);
      setCurrentImageIndex((prev) => (prev - 1 + selectedProject.images.length) % selectedProject.images.length);
    }
  };

  const isVideo = (path: string) => path.endsWith('.mp4') || path.endsWith('.webm');

  return (
    <section className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className={`sticky top-0 z-10 py-4 transition-all duration-300 ${
            isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
          }`}>
            <h1 className="text-4xl font-bold">what i've done</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group ${
                  "relative cursor-pointer"
                }`}
                onClick={() => {
                  setSelectedProject(project);
                  setCurrentImageIndex(0);
                }}
              >
                <div className={`relative w-full aspect-square overflow-hidden rounded-xl border border-gray-800/50 hover:border-gray-700 transition-colors duration-300`}>
                  <Image
                    src={project.previewImage}
                    alt={project.title}
                    fill
                    className="object-contain transform group-hover:scale-105 transition-transform duration-300 p-2"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900/80 backdrop-blur-md rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800/50"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    ✕
                  </button>
                </div>
                
                {/* Media Carousel */}
                <div className="relative mb-6">
                  <div className="relative w-full h-96 rounded-lg overflow-hidden bg-gray-800/50">
                    <AnimatePresence mode="wait">
                      {isVideo(selectedProject.images[currentImageIndex]) ? (
                        <motion.video
                          key={currentImageIndex}
                          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          src={selectedProject.images[currentImageIndex]}
                          className="w-full h-full object-contain"
                          controls
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={selectedProject.images[currentImageIndex]}
                            alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {selectedProject.images.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          previousImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 border border-white/10"
                      >
                        ←
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 border border-white/10"
                      >
                        →
                      </motion.button>
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
                        {selectedProject.images.map((_, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentImageIndex(index);
                            }}
                            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                              index === currentImageIndex ? 'bg-white scale-125' : 'bg-gray-400 hover:bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
} 