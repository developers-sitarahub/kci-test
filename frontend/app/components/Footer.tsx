'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/newsletter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing!');
        setEmail('');
      } else {
        const data = await response.json();
        setStatus('error');
        setMessage(data.email ? 'This email is already subscribed.' : 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <footer className="w-full">
      {/* ── Subscribe Banner ── */}
      <div className="bg-[#FAF8F4] py-16 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 w-full">
            <p className="text-[#9c7c3d] text-xs font-bold tracking-[0.2em] uppercase mb-3">Stay Updated</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#111827] leading-[1.2]">
              Subscribe to Kanji Capital<br />Investments
            </h2>
          </div>
          <div className="flex-1 w-full flex flex-col md:items-end">
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md shadow-sm h-[52px] rounded-lg overflow-hidden"
              aria-label="Newsletter subscription"
            >
              <input
                type="email"
                placeholder="Type your email..."
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-5 flex-1 text-sm bg-white border border-gray-200 border-r-0 focus:outline-none focus:border-[#9c7c3d] min-w-0 text-gray-700"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#9c7c3d] hover:bg-[#856a34] text-white font-bold px-8 text-sm transition-colors whitespace-nowrap disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {message && (
              <p className={`mt-2 text-sm ${status === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="bg-white pt-14 pb-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image
                src="logo.png"
                alt="KCI"
                width={160}
                height={50}
                unoptimized
                style={{ height: 'auto' }}
              />
            </Link>
            <p className="font-bold text-gray-900 text-sm mt-1">Kanji Capital Investments</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Founded by Anil Kanji in 2018, Kanji Capital Investments has deep roots in the community. Our drive and passion for real estate has blossomed into a thriving enterprise, guided by family values and a commitment to excellence. In Houston, Texas that invests in real estate deals. As a family-owned and operated firm, we bring a personal touch to every commercial real estate deal we undertake. From development to actively buying and selling deals we do it all.
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-gray-900 text-sm">Useful Links</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Projects Invested In', href: '/projects-invested-in' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-500 hover:text-[#9c7c3d] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-gray-900 text-sm mt-2">Connect with us</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Careers', href: '/careers' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-gray-500 hover:text-[#9c7c3d] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Other Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-gray-900 text-sm">Other Links</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'For Lease', href: '/for-lease' },
                { label: 'For Sale', href: '/for-sale' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-[#9c7c3d] hover:underline transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 pt-10 mt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Kanji Capital Investments. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
