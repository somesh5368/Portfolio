"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Get API key from environment variable (SECURE - NOT HARDCODED)
    const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (!apiKey) {
      setSubmitMessage("❌ Contact form is not configured properly. Please contact the admin.");
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
      return;
    }

    const data = {
      access_key: apiKey,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      from_name: "Portfolio Contact Form",
      subject: "New Contact Form Submission"
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage("✅ Message sent successfully! I'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitMessage(`❌ ${result.message || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitMessage("❌ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        
        <motion.div
          className="text-center mb-12 space-y-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
            📧 Let's Connect
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg">
            Have a project in mind? I'd love to hear from you!
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 md:p-10 border border-slate-700/50 space-y-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <label htmlFor="name" className="block mb-2 font-medium text-gray-300 text-sm uppercase tracking-wide">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-300 text-sm uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 font-medium text-gray-300 text-sm uppercase tracking-wide">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              minLength={10}
              rows={6}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500 resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                 < ircle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Send Message
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            )}
          </button>

          {submitMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center p-4 rounded-lg ${
                submitMessage.includes('✅') 
                  ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                  : 'bg-red-500/10 border border-red-500/20 text-red-400'
              }`}
            >
              {submitMessage}
            </motion.div>
          )}
        </motion.form>

        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-800/30 p-6 rounded-xl text-center border border-slate-700/50">
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Email</h3>
            <p className="text-gray-400 text-sm">spandey5368@gmail.com</p>
          </div>

          <div className="bg-slate-800/30 p-6 rounded-xl text-center border border-slate-700/50">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Location</h3>
            <p className="text-gray-400 text-sm">Lucknow, India</p>
          </div>

          <div className="bg-slate-800/30 p-6 rounded-xl text-center border border-slate-700/50">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-white font-semibold mb-2">Phone</h3>
            <p className="text-gray-400 text-sm">+91 7880936679</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
