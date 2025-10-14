"use client";
import { motion } from "framer-motion";

export default function About() {
  const skills = [
    "JavaScript", "React", "Next.js", "Node.js",
    "MongoDB", "Tailwind CSS", "Git", "REST APIs"
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              About Me
            </h2>
            
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate Full Stack Developer with expertise in building modern web applications.
            </p>
            
            <p className="text-gray-400 leading-relaxed">
              Always learning new technologies and best practices to deliver high-quality solutions.
            </p>

            {/* Buttons with Download CV */}
            <div className="flex gap-4 pt-4">
              <a 
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Let's Talk
              </a>
              
              {/* Download CV Button */}
              <a 
                href="/resume.pdf"
                download="Your_Name_Resume.pdf"
                className="px-6 py-3 border border-purple-500 text-purple-300 rounded-lg font-semibold hover:bg-purple-500/10 transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </a>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Skills & Technologies
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  className="bg-slate-700/50 backdrop-blur-sm px-6 py-4 rounded-xl border border-slate-600/50 hover:border-purple-500/50 transition-all text-center group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <span className="text-gray-300 font-medium group-hover:text-purple-400 transition-colors">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
