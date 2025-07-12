import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    email: string;
    apiUrl: string;
}

const Contact: React.FC<Props> = ({ email, apiUrl }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await axios.post(`${apiUrl}/contact`, formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || 'There was an error sending your message. Please try again.';
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="container">
      <h2>Get In Touch</h2>
      
      <div className="contact-intro">
        <p>
          Have a question or want to work together? Feel free to reach out via the form below 
          or email me directly at <a href={`mailto:${email}`} className="email-link">{email}</a>.
        </p>
        
        <div className="contact-methods">
          <div className="contact-method">
            <span className="contact-method-icon">📧</span>
            <span>Usually responds within 24 hours</span>
          </div>
          <div className="contact-method">
            <span className="contact-method-icon">💼</span>
            <span>Open to internship opportunities</span>
          </div>
          <div className="contact-method">
            <span className="contact-method-icon">🤝</span>
            <span>Available for collaboration</span>
          </div>
        </div>
      </div>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
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
            />
          </div>
          <div className="form-group">
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
            />
          </div>
        </div>
        
        <div className="form-group">
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
          ></textarea>
          <div className="character-count">
            {formData.message.length}/1000
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="btn-spinner"></span>
              Sending...
            </>
          ) : (
            <>
              <span className="btn-icon">📤</span>
              Send Message
            </>
          )}
        </button>
      </form>

      {status.message && (
        <div className={`form-message ${status.type}`}>
          <div className="message-icon">
            {status.type === 'success' ? '✅' : '❌'}
          </div>
          <div className="message-text">{status.message}</div>
        </div>
      )}
    </section>
  );
};

export default Contact;