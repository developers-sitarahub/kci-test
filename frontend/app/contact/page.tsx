'use client';

import Image from 'next/image';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <main className="flex flex-col flex-1 bg-white">
      {/* ── TITLE ── */}
      <section className="pt-16 pb-8 px-6 text-center bg-gray-50 border-b border-gray-100">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="text-4xl md:text-[42px] font-cardo font-bold text-gray-900">
          Contact
        </motion.h1>
      </section>

      {/* ── BODY ── */}
      <section className="max-w-4xl mx-auto w-full px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Left: info + form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="flex flex-col gap-6"
          >
            <h2 className="text-3xl font-cardo font-bold text-gray-900">Contact us</h2>

            <div className="text-sm leading-relaxed space-y-1">
              <p><span className="font-semibold text-[#9c7c3d]">Company Name:</span> Kanji Capital Investments</p>
              <p><span className="font-semibold text-[#9c7c3d]">Office Address:</span> 6655 Harwin Drive Ste.101-B Houston, Texas 77036</p>
              <p><span className="font-semibold text-[#9c7c3d]">Phone No:</span>{' '}
                <a href="tel:+18322124089" className="text-gray-800 hover:text-[#9c7c3d] transition-colors">832-212-4089</a>
              </p>
              <p><span className="font-semibold text-[#9c7c3d]">Email:</span>{' '}
                <a href="mailto:anil@kanjicapitalinvestments.com" className="text-gray-800 hover:text-[#9c7c3d] transition-colors break-all">anil@kanjicapitalinvestments.com</a>
              </p>
            </div>

            <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Name <span className="text-gray-400 font-normal">(required)</span></label>
                <input type="text" required
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#9c7c3d]/30 focus:border-[#9c7c3d] rounded-md transition" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Email <span className="text-gray-400 font-normal">(required)</span></label>
                <input type="email" required
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#9c7c3d]/30 focus:border-[#9c7c3d] rounded-md transition" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">Message <span className="text-gray-400 font-normal">(required)</span></label>
                <textarea rows={6} required
                  value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#9c7c3d]/30 focus:border-[#9c7c3d] rounded-md transition resize-none" />
              </div>
              <button type="submit" disabled={status === 'loading'}
                className="self-start bg-[#9c7c3d] text-white font-medium px-8 py-2.5 rounded-md hover:bg-[#7a5f2a] transition-colors text-sm disabled:opacity-50">
                {status === 'loading' ? 'Submitting...' : 'Submit'}
              </button>
              {status === 'success' && <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-600 text-sm mt-2">Error sending message. Please try again.</p>}
            </form>
          </motion.div>

          {/* Right: night skyline image */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-md">
              <Image
                src="5-2.png"
                alt="Kanji Capital Investments – Building Dreams, Investing in Futures"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
