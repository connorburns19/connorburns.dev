"use client";

import { useState } from "react";

export function Freelance() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      id="freelance"
      className="relative z-10"
    >
      <div className="max-w-4xl mx-auto px-6 py-24">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-10">
          Need me to build you a website/app for your business?
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-zinc-300 leading-relaxed text-lg mb-4">
              Custom websites for small businesses. <br/>
              Fast, accessible, and built to last.
            </p>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Enter your information here and I'll get back to you asap
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-4"
          >
            {/* Honeypot — hidden from real users, catches bots */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />
            <div>
              <label
                htmlFor="name"
                className="block text-xs text-zinc-500 mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-xs text-zinc-500 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-xs text-zinc-500 mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your business..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="self-start text-sm font-medium text-zinc-900 bg-zinc-100 px-5 py-2.5 rounded-md hover:bg-white transition-colors cursor-pointer"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
