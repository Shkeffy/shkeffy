import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import type { MouseEvent } from 'react';
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
    description: "a community built for creators",
    longDescription: "the network is a community built specifically to network. we have incredibly big names there, and is made to help, and connect creators and businesses alike.",
    previewImage: "/media/projects/project2/1.gif",
    images: ["/media/projects/project2/2.mp4"]
  },
  {
    title: "case study",
    description: "a case study",
    longDescription: "i took on a creator to scale up his channels... i did not realize how much. we begun in late November, and i began coaching him. i was critiquing his content, scripts, editing, and soon enough, he went from $5k/month to almost $75k/month. this was insane, because it was my FIRST ever client. we worked on two channels together for a single month.",
    previewImage: "/media/projects/project1/1.gif",
    images: ["/media/projects/project1/2.png", "/media/projects/project1/3.png"]
  },
  {
    title: "snapstart",
    description: "a place to monetize externally",
    longDescription: "this is a program for creators to apply for the MSN Start and Snapchat Snapshow programs respectively.",
    previewImage: "/media/projects/project3/1.gif",
    images: ["/media/projects/project3/1.gif"]
  },
  {
    title: "NewStudio",
    description: "a chrome extension built by Blazer and I for YouTube",
    longDescription: "Customize your YouTube Studio with creator-first tools.",
    previewImage: "/media/projects/project4/1.png",
    images: ["https://newstudio.app"]
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
            className="text-4xl sm:text-5xl font-bold mb-8 sm:mb-12 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent px-4 sm:px-0"
          >
            what i've done
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 px-4 sm:px-0">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => setSelectedProject(project)}
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
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-2 sm:mx-4"
            onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <motion.h2 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl sm:text-2xl font-bold"
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
                {selectedProject.title === "NewStudio" ? (
                  <div className="space-y-4">
                    <iframe
                      src="https://newstudio.app"
                      width="100%"
                      height="600"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                      onError={(e) => {
                        const iframe = e.target as HTMLIFrameElement;
                        iframe.style.display = 'none';
                        const container = iframe.parentElement;
                        if (container) {
                          const link = document.createElement('a');
                          link.href = 'https://newstudio.app';
                          link.target = '_blank';
                          link.rel = 'noopener noreferrer';
                          link.className = 'block w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center';
                          link.textContent = 'Open NewStudio in New Tab';
                          container.appendChild(link);
                        }
                      }}
                    />
                    <a 
                      href="https://newstudio.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full max-w-xs mx-auto"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="flex items-center space-x-2 relative z-10">
                          <span className="text-sm font-medium">Open NewStudio in New Tab</span>
                        </div>
                      </motion.button>
                    </a>
                  </div>
                ) : (
                  selectedProject.images.map((image, index) => (
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
                  ))
                )}
                <p className="text-gray-300">{selectedProject.longDescription}</p>
                {selectedProject.title === "the network" && (
                  <div className="mt-6">
                    <DiscordWidget />
                  </div>
                )}
                {selectedProject.title === "snapstart" && (
                  <div className="flex flex-col items-center space-y-4 mt-6">
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
