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
  const EMPTY = { name:'', email:'', phone:'', business:'', pkg:'', purpose:'', honeypot:'', consent:false };
  const [form, setForm] = React.useState(EMPTY);
  const [status, setStatus] = React.useState('idle'); // idle | submitting | ready | error
  const [errorMsg, setErrorMsg] = React.useState('');
  const [submitFailed, setSubmitFailed] = React.useState(false);
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
    if (status !== 'idle') { setStatus('idle'); setErrorMsg(''); setSubmitFailed(false); }
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.purpose.trim())
      return 'Please complete your name, email, phone number and project brief.';
    if (!form.consent)
      return 'Please confirm that you agree to be contacted about your website enquiry.';
    return null;
  };

  const FORM_ENDPOINT = 'https://formspree.io/f/xqejvkng';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.honeypot) return;
    const err = validate();
    if (err) { setSubmitFailed(false); setErrorMsg(err); setStatus('error'); return; }
    setStatus('submitting');
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        businessName: form.business || 'Not provided',
        packageInterest: form.pkg || 'Not sure yet',
        projectBrief: form.purpose,
        source: 'builtbypi.com',
        _subject: `New website enquiry from ${form.name}`,
      };
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus('ready');
        setForm(EMPTY);
      } else {
        setSubmitFailed(true);
        setStatus('error');
      }
    } catch (e) {
      setSubmitFailed(true);
      setStatus('error');
    }
  };

  return (
    <section className="pi-section pi-form-section" id="contact" style={{ scrollMarginTop:68 }}>
      <Container>
        <div className="pi-form-layout">
          {/* Left */}
          <FadeIn className="pi-form-left">
            <Eyebrow>Get in touch</Eyebrow>
            <h2>Get in touch</h2>
            <p>
              Tell us briefly what you need. We'll reply to arrange a quick discovery call.
            </p>
            <p style={{ fontSize:14, color:'var(--fg-muted)', marginTop:-8 }}>
              Keep it short — your name, contact details and what you need built are enough to start.
            </p>
            <div className="pi-form-info">
              <div className="pi-form-info-row">
                <Icon name="mail" size={15} />
                <p><strong>Website enquiry</strong> — we'll reply to arrange a discovery call</p>
              </div>
              <div className="pi-form-info-row">
                <Icon name="clock" size={15} />
                <p><strong>Business hours:</strong> Monday to Friday, 9:00am – 5:00pm UK time.</p>
              </div>
              <div className="pi-form-info-row">
                <Icon name="info" size={15} />
                <p>Send your enquiry any time — we'll reply during business hours.</p>
              </div>
            </div>
            <p className="pi-form-privacy">
              Your details are used only to respond to your website enquiry.
              This site does not store enquiry submissions.
            </p>
          </FadeIn>

          {/* Right — form card */}
          <FadeIn delay={0.1}>
            <div className={`pi-form-card${highlighted ? ' highlighted' : ''}`}>
              {status === 'ready' ? (
                <div className="pi-form-success">
                  <div className="pi-form-success-icon">
                    <Icon name="check-circle" size={22} />
                  </div>
                  <h3>Enquiry sent.</h3>
                  <p>
                    Your enquiry has been sent. We'll reply by email to arrange a quick discovery call.
                  </p>
                  <button className="pi-btn pi-btn-secondary"
                    onClick={() => setStatus('idle')}>
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={status === 'submitting' ? { opacity:0.65, pointerEvents:'none' } : undefined}>
                  {/* Honeypot */}
                  <input
                    type="text" name="url_confirm" value={form.honeypot}
                    onChange={e => set('honeypot', e.target.value)}
                    tabIndex={-1} autoComplete="off"
                    style={{ position:'absolute', top:'-9999px', left:'-9999px', opacity:0, pointerEvents:'none', width:1, height:1 }}
                  />

                  <div className="pi-field">
                    <label className="pi-label">Full name <span style={{ color:'var(--accent)' }}>*</span></label>
                    <input className="pi-input" type="text" name="name" placeholder="Your name"
                      value={form.name} onChange={e => set('name', e.target.value)} autoComplete="name" />
                  </div>

                  <div className="pi-field-row">
                    <div className="pi-field">
                      <label className="pi-label">Email address <span style={{ color:'var(--accent)' }}>*</span></label>
                      <input className="pi-input" type="email" name="email" placeholder="you@example.com"
                        value={form.email} onChange={e => set('email', e.target.value)} autoComplete="email" />
                    </div>
                    <div className="pi-field">
                      <label className="pi-label">Phone number <span style={{ color:'var(--accent)' }}>*</span></label>
                      <input className="pi-input" type="tel" name="phone" placeholder="+44 7XXX XXXXXX"
                        value={form.phone} onChange={e => set('phone', e.target.value)} autoComplete="tel" />
                      <p className="pi-field-hint">Include your country code.</p>
                    </div>
                  </div>

                  <div className="pi-field-row">
                    <div className="pi-field">
                      <label className="pi-label">
                        Business name{' '}
                        <span style={{ color:'var(--fg-subtle)', textTransform:'none', letterSpacing:0, fontFamily:'var(--pi-font-sans)' }}>(optional)</span>
                      </label>
                      <input className="pi-input" type="text" name="businessName" placeholder="Your business name"
                        value={form.business} onChange={e => set('business', e.target.value)} autoComplete="organization" />
                    </div>
                    <div className="pi-field">
                      <label className="pi-label">
                        Package interest{' '}
                        <span style={{ color:'var(--fg-subtle)', textTransform:'none', letterSpacing:0, fontFamily:'var(--pi-font-sans)' }}>(optional)</span>
                      </label>
                      <select className="pi-input" name="packageInterest" value={form.pkg} onChange={e => set('pkg', e.target.value)}>
                        <option value="">Select a package...</option>
                        <option value="Landing Page — £250">Landing Page — £250</option>
                        <option value="3 Page Website — £450">3 Page Website — £450</option>
                        <option value="Curated Website — £799">Curated Website — £799</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <div className="pi-field">
                    <label className="pi-label">Project brief <span style={{ color:'var(--accent)' }}>*</span></label>
                    <textarea className="pi-input" name="projectBrief" rows={4}
                      placeholder="Briefly describe your business and what you need the website to do."
                      value={form.purpose} onChange={e => set('purpose', e.target.value)}
                      style={{ resize:'none' }} />
                  </div>

                  <div className="pi-consent">
                    <input type="checkbox" id="consent" className="pi-checkbox"
                      checked={form.consent} onChange={e => set('consent', e.target.checked)} />
                    <label htmlFor="consent">
                      I agree to be contacted about my website enquiry.
                    </label>
                  </div>

                  {status === 'error' && (errorMsg || submitFailed) && (
                    <div className="pi-form-error">
                      <Icon name="alert-circle" size={15} />
                      {submitFailed
                        ? <p>Something went wrong. Please try again or email{' '}
                            <a href="mailto:hello@builtbypi.com" style={{ color:'var(--accent)' }}>hello@builtbypi.com</a>
                            {' '}directly.</p>
                        : <p>{errorMsg}</p>
                      }
                    </div>
                  )}

                  <button type="submit" className="pi-btn pi-btn-primary pi-btn-full"
                    style={{ fontSize:15, padding:'14px 20px' }}
                    disabled={status === 'submitting'}>
                    <Icon name="mail" size={17} />
                    {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
                  </button>

                  <p style={{ textAlign:'center', fontSize:11.5, color:'var(--fg-subtle)', marginTop:12 }}>
                    Your details are sent securely to pi. Nothing is stored on this site.
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
    { q:'What is included in the £250 landing page?',
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
            <button className="pi-btn pi-btn-primary pi-btn-full" onClick={onContactClick}>
              <Icon name="mail" size={15} />
              Start a project
            </button>
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
