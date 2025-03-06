import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import DiscordWidget from '../components/DiscordWidget';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  previewImage: string;
  images: string[];
}

const projects: Project[] = [
  {
    title: "the network",
    description: "a comprehensive analysis of user behavior and engagement patterns",
    longDescription: "the network is a community built specifically to network. we have incredibly big names there, and is made to help, and connect creators and businesses alike.",
    previewImage: "/media/projects/project2/1.gif",
    images: ["/media/projects/project2/2.mp4"]
  },
  {
    title: "case study",
    description: "a modern social networking platform built with next.js",
    longDescription: "i took on a creator to scale up his channels... i did not realize how much. we begun in late November, and i began coaching him. i was critiquing his content, scripts, editing, and soon enough, he went from $5k/month to almost $75k/month. this was insane, because it was my FIRST ever client. we worked on two channels together for a single month.",
    previewImage: "/media/projects/project1/1.gif",
    images: ["/media/projects/project1/2.png", "/media/projects/project1/3.png"]
  },
  {
    title: "snapstart",
    description: "a rapid prototyping tool for web applications",
    longDescription: "this is a program for creators to apply for the MSN Start and Snapchat Snapshow programs respectively.",
    previewImage: "/media/projects/project3/1.gif",
    images: ["/media/projects/project3/1.gif"]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
          >
            what i've done
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                  <Image
                    src={project.previewImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-white text-xl font-semibold block">{project.title}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedProject && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <motion.h2 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-bold"
                >
                  {selectedProject.title}
                </motion.h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                {selectedProject.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    {image.endsWith('.mp4') ? (
                      <video
                        src={image}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={image}
                        alt={`${selectedProject.title} image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
                <p className="text-gray-300">{selectedProject.longDescription}</p>
                {selectedProject.title === "the network" && (
                  <div className="mt-6">
                    <DiscordWidget />
                  </div>
                )}
                {selectedProject.title === "snapstart" && (
                  <div className="flex flex-col items-center space-y-4 mt-6">
                    <a 
                      href="https://discord.gg/snapstart"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full max-w-xs"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center space-x-2 relative z-10">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                          <span className="text-sm font-medium">join</span>
                        </div>
                      </motion.button>
                    </a>

                    <a 
                      href="https://forms.gle/sc6TVs65DHRDWLC3A"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full max-w-xs"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white rounded-xl shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center space-x-2 relative z-10">
                          <Image
                            src="/logos/snapchat_logo.png"
                            alt="Snapchat"
                            width={32}
                            height={32}
                            className="w-8 h-8 object-contain"
                          />
                          <span className="text-sm font-medium">Apply for Snapshows</span>
                        </div>
                      </motion.button>
                    </a>

                    <a 
                      href="https://forms.gle/MCrfxafNUKzmecCVA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full max-w-xs"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center space-x-2 relative z-10">
                          <Image
                            src="/logos/msn_logo.png"
                            alt="MSN"
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain"
                          />
                          <span className="text-sm font-medium">Apply for MSN Start</span>
                        </div>
                      </motion.button>
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
} 