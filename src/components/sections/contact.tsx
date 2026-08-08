"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { MagneticButton } from "../magnetic-button";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
    setForm({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" className="relative overflow-hidden py-[40px]" style={{ background: "#F8F8F3" }}>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050716] p-8 sm:p-12 lg:p-16" style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.35)" }}>
          {/* Decorative glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-[80px]"
            style={{ background: "radial-gradient(circle,#7c5cff,transparent 70%)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 rounded-full opacity-40 blur-[80px]"
            style={{ background: "radial-gradient(circle,#00e0c6,transparent 70%)" }}
          />

          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: pitch + contact info */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-100/80 backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#00e0c6]" />
                Let's Build Something Amazing Together
              </motion.div>

              <h2
                className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.2rem]"
              >
                <span className="text-gradient-neon">Let's turn your idea</span>
                <br />
                <span className="text-gradient-aurora">into shipped software.</span>
              </h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.18 }}
                className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
              >
                Book a free 30-minute consultation with a senior engineer. We'll map
                your idea to a concrete plan, scope, and budget — no slides, no sales
                script. Just a real conversation about what's possible.
              </motion.p>

              <div className="mt-8 flex flex-col gap-3">
                <ContactItem icon={Mail} label="hello@larawans.digital" href="mailto:hello@larawans.digital" />
                <ContactItem icon={Phone} label="+91 99999 99999" href="tel:+919999999999" />
                <ContactItem icon={MapPin} label="Remote-first · Serving clients worldwide" />
              </div>
            </div>

            {/* Right: form */}
            <motion.form
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8"
            >
              <div className="flex flex-col gap-4">
                <Field
                  label="Full name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  required
                />
                <Field
                  label="Work email"
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                  required
                />
                <Field
                  label="Company"
                  placeholder="Acme Inc."
                  value={form.company}
                  onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                />
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    What are you building?
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    rows={4}
                    placeholder="A short paragraph about your project, timeline, and goals…"
                    className="interactive resize-none rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none transition-colors"
                    style={{ background: "#FFFFFF", color: "#1A1A2E" }}
                  />
                </div>

                <MagneticButton
                  variant="neon"
                  className="mt-2 w-full justify-center px-6 py-4 text-[15px]"
                  icon={undefined}
                >
                  <Send className="h-4 w-4" />
                  {submitted ? "Message sent — we'll reply within 24h" : "Send message"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </MagneticButton>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-[12.5px] text-[#00e0c6]"
                  >
                    ✓ Thanks — a senior engineer will reach out within 24 hours.
                  </motion.p>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
}) {
  const inner = (
    <div className="group flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.04] interactive">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-[#7c5cff]/30 to-[#00e0c6]/20 text-[#00e0c6]">
        <Icon className="h-4 w-4" />
      </div>
      <span className="text-[13.5px] font-medium">{label}</span>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[12px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="interactive rounded-2xl border border-white/10 px-4 py-3 text-sm outline-none transition-colors"
        style={{ background: "#FFFFFF", color: "#1A1A2E" }}
      />
    </div>
  );
}
