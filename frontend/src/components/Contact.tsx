import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';

interface Props {
    email: string;
    apiUrl: string;
}

const Contact: React.FC<Props> = ({ email, apiUrl }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any existing status when user starts typing
    if (status.message) {
      setStatus({ type: '', message: '' });
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', message: 'Please enter your name.' });
      return false;
    }
    if (!formData.email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email.' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please enter a message.' });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });
    
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      let errorMessage = 'There was an error sending your message. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-netflix">
      <div className="container-netflix">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="heading-netflix">Get In Touch</h2>
          
          <motion.div 
            className="contact-intro"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="contact-description">
              Have a question or want to work together? Feel free to reach out via the form below 
              or email me directly at <a href={`mailto:${email}`} className="email-link-netflix">{email}</a>.
            </p>
            
            <div className="contact-methods-netflix">
              <motion.div 
                className="contact-method-netflix"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="contact-method-icon">📧</span>
                <span>Usually responds within 24 hours</span>
              </motion.div>
              <motion.div 
                className="contact-method-netflix"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="contact-method-icon">💼</span>
                <span>Open to internship opportunities</span>
              </motion.div>
              <motion.div 
                className="contact-method-netflix"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="contact-method-icon">🤝</span>
                <span>Available for collaboration</span>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.form 
            className="contact-form-netflix" 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="form-row-netflix">
              <div className="form-group-netflix">
                <label htmlFor="name">Name *</label>
                <input 
                  id="name"
                  type="text" 
                  name="name" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  disabled={isSubmitting}
                  className="form-input-netflix"
                />
              </div>
              <div className="form-group-netflix">
                <label htmlFor="email">Email *</label>
                <input 
                  id="email"
                  type="email" 
                  name="email" 
                  placeholder="your.email@example.com" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  disabled={isSubmitting}
                  className="form-input-netflix"
                />
              </div>
            </div>
            
            <div className="form-group-netflix">
              <label htmlFor="message">Message *</label>
              <textarea 
                id="message"
                name="message" 
                placeholder="Tell me about your project, question, or opportunity..." 
                value={formData.message} 
                onChange={handleChange} 
                required 
                disabled={isSubmitting}
                rows={6}
                className="form-textarea-netflix"
              ></textarea>
              <div className="character-count-netflix">
                {formData.message.length}/1000
              </div>
            </div>
            
            <motion.button 
              type="submit" 
              className={`btn-netflix btn-netflix-primary submit-btn-netflix ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? (
                <>
                  <span className="btn-spinner-netflix"></span>
                  Sending...
                </>
              ) : (
                <>
                  <span className="btn-icon">📤</span>
                  Send Message
                  <div className="btn-glow"></div>
                </>
              )}
            </motion.button>
          </motion.form>

          {status.message && (
            <motion.div 
              className={`form-message-netflix ${status.type}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-icon-netflix">
                {status.type === 'success' ? '✅' : '❌'}
              </div>
              <div className="message-text-netflix">{status.message}</div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;