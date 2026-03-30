import React, { useState } from 'react';

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('Message sent! (Simulated)');
    
    e.currentTarget.reset();
  };

  return (
    <main>
      <section className="bg-brand-olive text-white text-center py-[60px]">
        <h1 className="text-3xl font-bold">Visit Our Store</h1>
      </section>
      <br />

      <section className="container-custom grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Info and Map */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b border-brand-gold pb-2 inline-block text-black">Business Hours</h3>
          <div className="space-y-2 mb-8 text-black font-medium">
            <p>Friday: 11am - 5pm</p>
            <p>Saturday: 11am - 5pm</p>
            <p>Sunday: 11am - 4pm</p>
            <p>Monday: 11am - 4pm</p>
            <p className="text-stone-500 italic">Tues, Wed, Thurs: CLOSED</p>
          </div>

          {/* Responsive Map Container */}
          <div className="relative w-full pb-[56.25%] h-0 overflow-hidden rounded-[6px] shadow-md border border-stone-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.428782352841!2d-76.4842525!3d44.2325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd2ab042f88325d%3A0x6b86d997235a9f60!2sAntique%20Alley!5e0!3m2!1sen!2sca!4v1710000000000" 
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Antique Alley Location"
            ></iframe>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-black">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              required 
              className="input-field"
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              required 
              className="input-field"
            />
            <textarea 
              placeholder="Message" 
              required
              className="input-field h-40 resize-none"
            ></textarea>
            <button type="submit" className="btn-primary w-full md:w-auto">
              Send Message
            </button>
            {status && <p className="text-green-600 font-bold mt-2">{status}</p>}
          </form>
        </div>
      </section>
    </main>
  );
}