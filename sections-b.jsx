/* pi — sections B: Process, WhyPi, EnquiryForm, FAQ, Footer */

/* ─── Process ─────────────────────────────────────── */
function Process() {
  const steps = [
    { n:'01', t:'Tell us what you need',   d:'Send your business details, goals and website purpose.'                             },
    { n:'02', t:'Quick discovery call',    d:'We clarify your offer, structure and best package.'                                 },
    { n:'03', t:'Design and build',        d:'Your website is designed and built with a clean, conversion-focused structure.'     },
    { n:'04', t:'Launch',                  d:'We prepare the site for desktop, mobile and launch.'                                },
  ];
  return (
    <section className="pi-section pi-process" id="process" style={{ scrollMarginTop:68 }}>
      <Container>
        <FadeIn className="pi-section-head">
          <Eyebrow>How it works</Eyebrow>
          <h2>A clear process, start to launch.</h2>
        </FadeIn>
        <div className="grid-4 pi-steps">
          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 0.09} className="pi-step">
              <div className="pi-step-num">{s.n}</div>
              <div className="pi-step-bar" />
              <h4>{s.t}</h4>
              <p>{s.d}</p>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Why pi ──────────────────────────────────────── */
function WhyPi() {
  const cards = [
    { icon:'layout-grid',  t:'Precise structure',       d:'Every page is planned around clarity, flow and conversion.'                                               },
    { icon:'star',         t:'Premium presentation',    d:'Your business gets a sharper digital presence that feels credible from the first click.'                   },
    { icon:'message-square', t:'Fast enquiry flow',     d:'The site is built to help visitors understand your offer and contact you quickly.'                         },
    { icon:'smartphone',   t:'Responsive by default',   d:'Every site is designed to work smoothly across mobile, tablet and desktop.'                               },
  ];
  return (
    <section className="pi-section" id="why" style={{ scrollMarginTop:68 }}>
      <Container>
        <FadeIn className="pi-section-head">
          <Eyebrow>Why pi</Eyebrow>
          <h2>Built for businesses that take their online presence seriously.</h2>
        </FadeIn>
        <div className="grid-2">
          {cards.map((c, i) => (
            <FadeIn key={c.t} delay={i * 0.08}>
              <div className="pi-card pi-why-card">
                <div className="pi-why-icon">
                  <Icon name={c.icon} size={20} />
                </div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Enquiry Form ────────────────────────────────── */
function EnquiryForm({ selectedPackage }) {
  const EMPTY = { name:'', whatsapp:'', business:'', purpose:'', pkg:'', email:'', website:'', timeframe:'', honeypot:'', consent:false };
  const [form, setForm] = React.useState(EMPTY);
  const [status, setStatus] = React.useState('idle'); // idle | ready | error
  const [errorMsg, setErrorMsg] = React.useState('');
  const [waLink, setWaLink] = React.useState('');
  const [highlighted, setHighlighted] = React.useState(false);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    if (selectedPackage && selectedPackage !== form.pkg) {
      setForm(p => ({ ...p, pkg: selectedPackage }));
      setHighlighted(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setHighlighted(false), 2200);
    }
    return () => clearTimeout(timerRef.current);
  }, [selectedPackage]);

  const set = (field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    if (status !== 'idle') { setStatus('idle'); setErrorMsg(''); }
  };

  const validate = () => {
    if (!form.name.trim())     return 'Please enter your full name.';
    if (!form.whatsapp.trim()) return 'Please enter your WhatsApp number.';
    if (!form.business.trim()) return 'Please enter your business name.';
    if (!form.pkg)             return 'Please select a package.';
    if (!form.purpose.trim())  return 'Please describe your website purpose.';
    if (!form.consent)         return 'Please agree to be contacted on WhatsApp to continue.';
    return null;
  };

  const buildLink = (f) => {
    const number = (document.querySelector('meta[name="wa-number"]') || {}).content || '447502116497';
    const msg = [
      "Hi pi, I'd like to start a website project.",
      '', 'Name:',          f.name,
      '', 'WhatsApp:',      f.whatsapp,
      '', 'Business name:', f.business,
      '', 'Package:',       f.pkg,
      '', 'Website purpose:', f.purpose,
      '', 'Existing website:', f.website || 'Not provided',
      '', 'Ideal launch timeframe:', f.timeframe || 'Not provided',
      '', 'Please contact me to arrange a discovery call.',
    ].join('\n');
    return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  };

  const fallbackLink = () => {
    const number = (document.querySelector('meta[name="wa-number"]') || {}).content || '447502116497';
    return `https://wa.me/${number}?text=${encodeURIComponent("Hi pi, I'd like to enquire about a website project.")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.honeypot) return;
    const err = validate();
    if (err) { setErrorMsg(err); setStatus('error'); return; }
    const link = buildLink(form);
    setWaLink(link);
    setStatus('ready');
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="pi-section pi-form-section" id="contact" style={{ scrollMarginTop:68 }}>
      <Container>
        <div className="pi-form-layout">
          {/* Left */}
          <FadeIn className="pi-form-left">
            <Eyebrow>Get in touch</Eyebrow>
            <h2>Start your project</h2>
            <p>
              Tell us what you need. We respond on WhatsApp to arrange a discovery call within
              30 minutes during business hours.
            </p>
            <div className="pi-form-info">
              <div className="pi-form-info-row">
                <Icon name="message-square" size={15} />
                <p><strong>WhatsApp enquiry</strong> — we respond within 30 minutes</p>
              </div>
              <div className="pi-form-info-row">
                <Icon name="clock" size={15} />
                <p><strong>Business hours:</strong> Monday to Friday, 9:00am – 5:00pm UK time.</p>
              </div>
              <div className="pi-form-info-row">
                <Icon name="info" size={15} />
                <p>Outside hours? Send your enquiry now — we'll reply when we're back.</p>
              </div>
            </div>
            <p className="pi-form-privacy">
              Your details are used only to respond to your website enquiry on WhatsApp.
              This site does not store enquiry submissions.
            </p>
          </FadeIn>

          {/* Right — form card */}
          <FadeIn delay={0.1}>
            <div className={`pi-form-card${highlighted ? ' highlighted' : ''}`}>
              {status === 'ready' ? (
                <div className="pi-form-success">
                  <div className="pi-form-success-icon">
                    <Icon name="message-square" size={22} />
                  </div>
                  <h3>Your enquiry is ready to send on WhatsApp.</h3>
                  <p>
                    We'll respond to arrange a discovery call within 30 minutes
                    during business hours.
                  </p>
                  <div className="pi-form-success-actions">
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                      className="pi-btn pi-btn-primary pi-btn-lg">
                      <Icon name="message-square" size={16} />
                      Open WhatsApp
                      <Icon name="external-link" size={13} />
                    </a>
                    <button className="pi-btn pi-btn-secondary"
                      onClick={() => { setStatus('idle'); setForm(EMPTY); }}>
                      Start over
                    </button>
                  </div>
                  <p className="pi-form-success-fb">
                    WhatsApp didn't open?{' '}
                    <a href={fallbackLink()} target="_blank" rel="noopener noreferrer">
                      Open directly
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Honeypot */}
                  <input
                    type="text" name="url_confirm" value={form.honeypot}
                    onChange={e => set('honeypot', e.target.value)}
                    tabIndex={-1} autoComplete="off"
                    style={{ position:'absolute', top:'-9999px', left:'-9999px', opacity:0, pointerEvents:'none', width:1, height:1 }}
                  />

                  <div className="pi-field-row">
                    <div className="pi-field">
                      <label className="pi-label">Full name <span style={{ color:'var(--accent)' }}>*</span></label>
                      <input className="pi-input" type="text" placeholder="Jane Smith"
                        value={form.name} onChange={e => set('name', e.target.value)} autoComplete="name" />
                    </div>
                    <div className="pi-field">
                      <label className="pi-label">WhatsApp number <span style={{ color:'var(--accent)' }}>*</span></label>
                      <input className="pi-input" type="tel" placeholder="+44 7700 000000"
                        value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} autoComplete="tel" />
                    </div>
                  </div>

                  <div className="pi-field">
                    <label className="pi-label">Business name <span style={{ color:'var(--accent)' }}>*</span></label>
                    <input className="pi-input" type="text" placeholder="Acme Ltd"
                      value={form.business} onChange={e => set('business', e.target.value)} autoComplete="organization" />
                  </div>

                  <div className="pi-field">
                    <label className="pi-label">Package interest <span style={{ color:'var(--accent)' }}>*</span></label>
                    <select className="pi-input" value={form.pkg} onChange={e => set('pkg', e.target.value)}>
                      <option value="" disabled>Select a package...</option>
                      <option value="Landing Page — £120">Landing Page — £120</option>
                      <option value="3 Page Website — £250">3 Page Website — £250</option>
                      <option value="Curated Website — £650">Curated Website — £650</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>

                  <div className="pi-field">
                    <label className="pi-label">Website purpose / business description <span style={{ color:'var(--accent)' }}>*</span></label>
                    <textarea className="pi-input" rows={4}
                      placeholder="Briefly describe your business, what the website needs to do, and what customers should be able to enquire about or buy."
                      value={form.purpose} onChange={e => set('purpose', e.target.value)}
                      style={{ resize:'none' }} />
                  </div>

                  <div className="pi-field">
                    <label className="pi-label">
                      Email address{' '}
                      <span style={{ color:'var(--fg-subtle)', textTransform:'none', letterSpacing:0, fontFamily:'var(--pi-font-sans)' }}>(optional)</span>
                    </label>
                    <input className="pi-input" type="email" placeholder="jane@acme.com"
                      value={form.email} onChange={e => set('email', e.target.value)} autoComplete="email" />
                  </div>

                  <div className="pi-field-row">
                    <div className="pi-field">
                      <label className="pi-label">
                        Existing website{' '}
                        <span style={{ color:'var(--fg-subtle)', textTransform:'none', letterSpacing:0, fontFamily:'var(--pi-font-sans)' }}>(optional)</span>
                      </label>
                      <input className="pi-input" type="url" placeholder="https://example.com"
                        value={form.website} onChange={e => set('website', e.target.value)} />
                    </div>
                    <div className="pi-field">
                      <label className="pi-label">
                        Launch timeframe{' '}
                        <span style={{ color:'var(--fg-subtle)', textTransform:'none', letterSpacing:0, fontFamily:'var(--pi-font-sans)' }}>(optional)</span>
                      </label>
                      <select className="pi-input" value={form.timeframe} onChange={e => set('timeframe', e.target.value)}>
                        <option value="" disabled>Select...</option>
                        <option value="As soon as possible">As soon as possible</option>
                        <option value="Within 1 month">Within 1 month</option>
                        <option value="Within 2–3 months">Within 2–3 months</option>
                        <option value="No fixed deadline">No fixed deadline</option>
                      </select>
                    </div>
                  </div>

                  <div className="pi-consent">
                    <input type="checkbox" id="consent" className="pi-checkbox"
                      checked={form.consent} onChange={e => set('consent', e.target.checked)} />
                    <label htmlFor="consent">
                      I agree to be contacted on WhatsApp about my website enquiry.
                    </label>
                  </div>

                  {status === 'error' && errorMsg && (
                    <div className="pi-form-error">
                      <Icon name="alert-circle" size={15} />
                      <p>{errorMsg}</p>
                    </div>
                  )}

                  <button type="submit" className="pi-btn pi-btn-primary pi-btn-full" style={{ fontSize:15, padding:'14px 20px' }}>
                    <Icon name="message-square" size={17} />
                    Send via WhatsApp
                  </button>

                  <p style={{ textAlign:'center', fontSize:11.5, color:'var(--fg-subtle)', marginTop:12 }}>
                    This opens WhatsApp with your details pre-filled. Nothing is stored on this site.
                  </p>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = React.useState(null);
  const faqs = [
    { q:'How quickly can my website be launched?',
      a:'Simple projects can move quickly once the content, structure and requirements are clear. The final timeframe is confirmed after the discovery call.' },
    { q:'Do I need to know exactly what I want?',
      a:"No. You can send a short description of your business and what the website needs to do. We'll help shape the structure." },
    { q:'What is included in the £120 landing page?',
      a:'A responsive one-page website with clear sections, mobile optimisation, a contact flow and basic SEO structure.' },
    { q:'What is the difference between the 3 Page Website and the Curated Website?',
      a:'The 3 Page Website is for businesses that need a simple, credible online presence. The Curated Website is for businesses that need stronger positioning, more structure and a more premium finish.' },
    { q:'Do I pay before the discovery call?',
      a:'No. The discovery call confirms the scope first.' },
    { q:'Can I contact you directly on WhatsApp?',
      a:'Yes. The form prepares your enquiry so we receive the important details clearly.' },
  ];
  return (
    <section className="pi-section pi-faq" id="faq" style={{ scrollMarginTop:68 }}>
      <Container>
        <FadeIn style={{ textAlign:'center', marginBottom:48 }}>
          <Eyebrow>FAQ</Eyebrow>
          <h2 style={{ fontFamily:'var(--pi-font-display)', fontSize:'var(--pi-text-h2)', fontWeight:600, color:'var(--fg-strong)', letterSpacing:'-0.02em', lineHeight:1.15, marginTop:12 }}>
            Common questions
          </h2>
        </FadeIn>
        <div className="pi-faq-list">
          {faqs.map((f, i) => (
            <div key={i} className="pi-faq-item">
              <button className="pi-faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className={`pi-faq-chevron${open === i ? ' open' : ''}`}>
                  <Icon name="chevron-down" size={17} />
                </span>
              </button>
              <div className={`pi-faq-a${open === i ? ' open' : ''}`}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────── */
function Footer({ onContactClick }) {
  const number = (document.querySelector('meta[name="wa-number"]') || {}).content || '447502116497';
  const waLink = `https://wa.me/${number}?text=${encodeURIComponent("Hi pi, I'd like to enquire about a website project.")}`;

  const go = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  };

  const cols = [
    { h:'Studio',   links:[['Packages','#packages'],['Process','#process'],['Why pi','#why'],['Contact','#contact']] },
    { h:'Services', links:[['Web design',null],['Webflow build',null],['SEO',null],['Optimisation',null]] },
  ];

  return (
    <footer className="pi-footer">
      <Container>
        <div className="pi-footer-top">
          <div className="pi-footer-brand">
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
              <PiMark style={{ width:28, height:28, color:'var(--accent)' }} />
              <span style={{ fontFamily:'var(--pi-font-display)', fontSize:22, fontWeight:700, color:'var(--fg-strong)', letterSpacing:'-0.03em' }}>pi</span>
            </div>
            <p>Precision-built websites for ambitious businesses.</p>
            <p className="pi-footer-brand-domain">builtbypi.com</p>
          </div>
          {cols.map(c => (
            <div key={c.h} className="pi-foot-col">
              <h5>{c.h}</h5>
              {c.links.map(([label, href]) => (
                href
                  ? <button key={label} onClick={() => go(href)}>{label}</button>
                  : <span key={label} style={{ display:'block', fontSize:13.5, color:'var(--fg-muted)', marginBottom:10 }}>{label}</span>
              ))}
            </div>
          ))}
          <div className="pi-foot-col">
            <h5>Get started</h5>
            <p style={{ fontSize:13, color:'var(--fg-muted)', marginBottom:14, lineHeight:1.6 }}>
              Ready to build? Send us your project details on WhatsApp.
            </p>
            <button className="pi-btn pi-btn-primary pi-btn-full" style={{ marginBottom:10 }} onClick={onContactClick}>
              <Icon name="message-square" size={15} />
              Start a project
            </button>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="pi-btn pi-btn-secondary pi-btn-full">
              <Icon name="message-square" size={15} />
              WhatsApp directly
            </a>
          </div>
        </div>
        <div className="pi-footer-bottom">
          <span>© 2026 pi. All rights reserved.</span>
          <span style={{ letterSpacing:'0.1em' }}>π = 3.14159</span>
        </div>
      </Container>
    </footer>
  );
}

Object.assign(window, { Process, WhyPi, EnquiryForm, FAQ, Footer });
