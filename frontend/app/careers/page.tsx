"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Send, Briefcase, GraduationCap, Upload, FileText } from "lucide-react";

export default function CareersPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', notes: '' });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      let resumeKey: string | null = null;

      // ── Step 1: upload resume directly to S3 via presigned URL ────────────
      if (resumeFile) {
        const presignRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/web-services/upload/presign/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              folder:       'resumes',
              filename:     resumeFile.name,
              content_type: resumeFile.type || 'application/pdf',
            }),
          }
        );
        if (!presignRes.ok) throw new Error('Failed to get upload URL');
        const { upload_url, s3_key } = await presignRes.json();

        // PUT directly to S3 — Django is bypassed entirely
        const s3Res = await fetch(upload_url, {
          method:  'PUT',
          headers: { 'Content-Type': resumeFile.type || 'application/pdf' },
          body:    resumeFile,
        });
        if (!s3Res.ok) throw new Error('S3 upload failed');
        resumeKey = s3_key;
      }

      // ── Step 2: post only text fields + the S3 key to Django ────────────
      const payload: Record<string, string> = {
        name:  formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: formData.notes,
      };
      if (resumeKey) payload.resume = resumeKey;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/web-services/careers/`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', notes: '' });
      setResumeFile(null);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <div className="w-full bg-slate-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/office.png"
            alt="Kanji Capital Investments Office"
            fill
            className="object-cover opacity-20 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight text-balance">
              Careers at Kanji
            </h1>
            <div className="w-24 h-1 bg-[#c2a990] mx-auto mb-8 rounded-full" />
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed text-balance">
              Join Kanji Capital Investments, where opportunities await to ignite your professional commercial real estate journey. Explore a diverse array of roles tailored to match your skills, passions, and ambitions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 md:py-28 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-8">Join Our Team</h2>
            <p className="text-lg text-slate-600 leading-loose text-balance">
              Whether you’re a seasoned expert or a fresh talent eager to make your mark, our dynamic environment fosters growth and innovation. Join a team committed to excellence, where collaboration thrives and creativity flourishes. Discover more than just a job – embark on a rewarding career path with us. Your future starts here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 md:py-28 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-16 md:flex md:items-end md:justify-between"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4 flex items-center gap-4">
                <span className="w-10 h-1 bg-[#905e0e] block rounded-full" />
                Open Positions
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl">
                If you have a passion for real estate development, construction, project management, architecture and would love to be a part of a fun team – then we want to hear from you.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100"
          >
            <div className="p-8 md:p-12 lg:p-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-8 border-b border-slate-200">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2">Commercial Real Estate Professional</h3>
                  <div className="flex items-center gap-4 text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> Full-time</span>
                    &bull;
                    <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4" /> Min. 3 Years Exp.</span>
                  </div>
                </div>
                <Link
                  href="#apply"
                  className="inline-flex items-center px-6 py-3 bg-[#111827] text-white font-medium rounded-full hover:bg-[#905e0e] transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#905e0e] shadow-md"
                >
                  Apply Now <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-slate-900 prose-p:text-slate-600">
                <p className="text-lg mb-8">
                  As a Commercial Real Estate Professional, you will be responsible for facilitating transactions and providing strategic advice to clients in the commercial real estate market. This role requires a deep understanding of commercial property types, market dynamics, and financial analysis.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                  <div>
                    <h4 className="text-xl font-bold flex items-center gap-3 mb-6">
                      <div className="p-2 bg-slate-100 rounded-lg text-[#905e0e]"><Briefcase className="w-5 h-5" /></div>
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-4">
                      {[
                        "**Client Management:** Cultivate and maintain relationships with property owners, investors, developers, and tenants. Understand their needs and financial objectives.",
                        "**Market Analysis:** Conduct comprehensive market research to identify trends, opportunities, and risks.",
                        "**Property Valuation:** Assess the value of commercial properties using income capitalization, comparable sales, and cost approaches.",
                        "**Transaction Management:** Manage buying, selling, leasing, and financing of properties. Negotiate terms and conditions.",
                        "**Financial Analysis:** Perform financial modeling, calculate ROI, cash flow projections, and risk assessment.",
                        "**Marketing and Promotion:** Develop strategies to showcase properties using online platforms and targeted outreach.",
                        "**Due Diligence:** Coordinate property inspections, environmental assessments, and legal reviews.",
                        "**Client Advisory:** Provide strategic investment and portfolio optimization advice.",
                        "**Industry Networking:** Build a strong network with brokers, lenders, attorneys, and appraisers."
                      ].map((item, i) => {
                        const [bold, rest] = item.split(':** ');
                        const title = bold.replace('**', '');
                        return (
                          <li key={i} className="flex gap-3 text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-[#c2a990] flex-shrink-0 mt-0.5" />
                            <span><strong className="text-slate-800">{title}:</strong> {rest}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold flex items-center gap-3 mb-6">
                      <div className="p-2 bg-slate-100 rounded-lg text-[#905e0e]"><GraduationCap className="w-5 h-5" /></div>
                      Qualifications
                    </h4>
                    <ul className="space-y-4">
                      {[
                        "Bachelor's degree in Real Estate, Finance, Business Administration, or related field (Master's preferred).",
                        "Proven experience in commercial real estate brokerage, investment analysis, or asset management.",
                        "Strong analytical skills with proficiency in financial modeling, market research, and valuation techniques.",
                        "Excellent communication, negotiation, and interpersonal skills.",
                        "Ability to work independently, manage multiple projects, and thrive in a fast-paced environment.",
                        "Proficiency in real estate software and tools (e.g., CoStar, ARGUS, LoopNet, MLS).",
                        "Deep understanding of commercial property types (land, office, retail, industrial, multifamily)."
                      ].map((item, i) => (
                        <li key={i} className="flex gap-3 text-slate-600">
                          <CheckCircle2 className="w-5 h-5 text-[#c2a990] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 border-t border-slate-200 px-8 py-6 flex justify-between items-center text-slate-300">
              <p>Interested in applying? Drop your details below.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application / Contact Section */}
      <section id="apply" className="py-20 md:py-28 bg-white selection:bg-[#905e0e] selection:text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
            {/* Contact Details */}
            <div className="lg:w-2/5 bg-slate-900 text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8.00002C20.9996 7.64927 20.9071 7.30608 20.7315 7.00116C20.556 6.69623 20.3029 6.43909 20 6.25002L13 2.25002C12.6951 2.07436 12.3515 1.98193 12 1.98193C11.6485 1.98193 11.3049 2.07436 11 2.25002L4 6.25002C3.69715 6.43909 3.44399 6.69623 3.26846 7.00116C3.09294 7.30608 3.00036 7.64927 3 8.00002V16C3.00036 16.3508 3.09294 16.694 3.26846 16.9989C3.44399 17.3038 3.69715 17.561 4 17.75L11 21.75C11.3049 21.9257 11.6485 22.0181 12 22.0181C12.3515 22.0181 12.6951 21.9257 13 21.75L20 17.75C20.3029 17.561 20.556 17.3038 20.7315 16.9989C20.9071 16.694 20.9996 16.3508 21 16Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-serif font-bold mb-4">Let&apos;s Chat</h2>
                <div className="w-12 h-1 bg-[#c2a990] mb-8" />
                <p className="text-slate-300 leading-relaxed max-w-sm">
                  Fill out the form with your details to submit your resume and portfolio documentation. We will get back to you shortly.
                </p>
              </div>

              <div className="space-y-6 mt-12 relative z-10">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#c2a990] transition-colors duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Call Us</p>
                    <a href="tel:832-212-4089" className="text-lg font-medium hover:text-[#c2a990] transition-colors">832-212-4089</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#c2a990] transition-colors duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email Us</p>
                    <a href="mailto:anil@kanjicapitalinvestments.com" className="text-lg font-medium hover:text-[#c2a990] transition-colors">anil@kanjicapitalinvestments.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:w-3/5 p-10 md:p-14">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#905e0e] focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#905e0e] focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">Phone <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#905e0e] focus:border-transparent transition-all bg-slate-50 focus:bg-white"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Resume (PDF) <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf"
                      required
                      onChange={e => setResumeFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                        resumeFile 
                        ? 'border-[#905e0e] bg-[#905e0e]/5 text-[#905e0e]' 
                        : 'border-slate-200 bg-slate-50 text-slate-400 hover:border-[#905e0e]/50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        {resumeFile ? (
                          <>
                            <FileText className="w-8 h-8" />
                            <span className="text-sm font-medium truncate max-w-[200px]">{resumeFile.name}</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 opacity-50" />
                            <span className="text-sm font-medium">Click to upload your resume (PDF)</span>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">Notes</label>
                  <textarea
                    id="notes"
                    rows={4}
                    value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#905e0e] focus:border-transparent transition-all bg-slate-50 focus:bg-white resize-none"
                    placeholder="Tell us about yourself and drop a link to your portfolio or LinkedIn..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-4 flex items-center justify-center w-full px-8 py-4 bg-[#905e0e] text-white font-bold rounded-xl hover:bg-[#7a4f0a] transition-all duration-300 shadow-lg shadow-[#905e0e]/30 hover:shadow-[#905e0e]/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#905e0e] disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {status === 'loading' ? 'Sending...' : 'Send Application'} <Send className="w-5 h-5 ml-2" />
                </button>
                {status === 'success' && <p className="text-green-600 text-sm mt-2 text-center">Application sent successfully!</p>}
                {status === 'error' && <p className="text-red-600 text-sm mt-2 text-center">Error sending application. Please try again.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}