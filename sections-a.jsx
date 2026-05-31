/* pi — sections A: Header, Hero, Packages */

/* ─── Header ─────────────────────────────────────── */
function Header({ onContactClick }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = [
    { label: 'Packages', href: '#packages' },
    { label: 'Process',  href: '#process'  },
    { label: 'Why pi',   href: '#why'       },
    { label: 'Contact',  href: '#contact'   },
  ];

  const go = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`pi-header${scrolled ? ' pi-header--scrolled' : ''}`}>
      <div className="pi-header-inner">
        <a href="#" className="pi-brand" onClick={e => { e.preventDefault(); window.scrollTo({ top:0, behavior:'smooth' }); }}>
          <PiMark className="pi-brand-mark" />
          <div className="pi-brand-text">
            <span className="pi-brand-name">pi</span>
            <span className="pi-brand-tag">Brand Designed. Website Built.</span>
          </div>
        </a>

        <nav className="pi-nav-links" aria-label="Main navigation">
          {links.map(l => (
            <button key={l.href} className="pi-nav-link" onClick={() => go(l.href)}>{l.label}</button>
          ))}
        </nav>

        <div className="pi-nav-right">
          <button className="pi-btn pi-btn-primary" onClick={onContactClick}>Start a project</button>
        </div>

        <button
          className="pi-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          style={{ marginLeft:'auto' }}
        >
          <Icon name={menuOpen ? 'x' : 'menu'} size={22} />
        </button>
      </div>

      <div className={`pi-mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map(l => (
          <button key={l.href} className="pi-mobile-link" onClick={() => go(l.href)}>{l.label}</button>
        ))}
        <button className="pi-btn pi-btn-primary pi-btn-full pi-mobile-cta" onClick={() => { setMenuOpen(false); onContactClick(); }}>
          Start a project
        </button>
      </div>
    </header>
  );
}

/* ─── Hero ────────────────────────────────────────── */
function Hero({ onStartProject, onSeePackages }) {
  return (
    <section className="pi-hero" id="top">
      <div className="pi-hero-grid" />
      <div className="pi-hero-rings" aria-hidden="true">
        <span className="pi-hero-ring" style={{ width:580, height:580 }} />
        <span className="pi-hero-ring" style={{ width:400, height:400 }} />
        <span className="pi-hero-ring" style={{ width:240, height:240 }} />
      </div>
      <Container>
        <div className="pi-hero-inner">
          {/* Left */}
          <div>
            <p className="pi-eyebrow hero-anim hero-anim-0">Precision-built websites</p>
            <h1 className="hero-anim hero-anim-1">
              Websites for ambitious businesses,{' '}
              <em>measured precisely.</em>
            </h1>
            <p className="sub hero-anim hero-anim-2">
              We design, build and ship clean, high-converting websites for businesses that need to
              look sharper, move faster and win more enquiries.
            </p>
            <div className="pi-hero-actions hero-anim hero-anim-3">
              <button className="pi-btn pi-btn-primary pi-btn-lg" onClick={onStartProject}>
                Start a project
                <Icon name="arrow-right" size={16} />
              </button>
              <button className="pi-btn pi-btn-secondary pi-btn-lg" onClick={onSeePackages}>
                See packages
                <Icon name="chevron-right" size={16} />
              </button>
            </div>
            <div className="pi-hero-stats hero-anim hero-anim-4">
              {[
                { v: '3.14×', l: 'faster than average' },
                { v: '£120',  l: 'projects starting from' },
                { v: '30min', l: 'enquiry response'     },
              ].map(s => (
                <div key={s.l} className="pi-hero-stat">
                  <b>{s.v}</b>
                  <span>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — browser mockup */}
          <div className="mock-col">
            <BrowserChrome />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ─── Packages ────────────────────────────────────── */
const PACKAGES = [
  {
    name: 'Landing Page',
    price: '120',
    tagline: 'A sharp one-page site for a clear offer, campaign, personal brand or local business.',
    includes: [
      'One-page responsive website',
      'Clean section layout',
      'Contact flow',
      'Mobile optimisation',
      'Basic SEO structure',
      'Fast turnaround',
    ],
    cta: 'Choose Landing Page',
    value: 'Landing Page — £120',
    featured: false,
  },
  {
    name: '3 Page Website',
    price: '250',
    tagline: 'A simple business website with the key pages needed to look credible and start converting.',
    includes: [
      'Home page',
      'About or Services page',
      'Contact page',
      'Responsive build',
      'Contact flow',
      'Basic SEO structure',
    ],
    cta: 'Choose 3 Pages',
    value: '3 Page Website — £250',
    featured: false,
  },
  {
    name: 'Curated Website',
    price: '650',
    tagline: 'A more complete website for businesses that need stronger positioning, better structure and a more premium finish.',
    includes: [
      'Custom page structure',
      'Up to 6 core sections / pages',
      'Brand-led layout direction',
      'Conversion-focused copy structure',
      'Responsive build',
      'Contact flow',
      'Basic SEO structure',
      'Launch support',
    ],
    cta: 'Choose Curated Site',
    value: 'Curated Website — £650',
    from: true,
    featured: true,
  },
];

function Packages({ onSelectPackage }) {
  return (
    <section className="pi-section pi-packages" id="packages" style={{ scrollMarginTop:68 }}>
      <Container>
        <FadeIn className="pi-section-head" style={{ textAlign:'center', maxWidth:'100%' }}>
          <Eyebrow>Packages</Eyebrow>
          <h2>Choose your package</h2>
          <p style={{ marginInline:'auto' }}>
            All packages are built for speed, clarity and conversion. Final scope is confirmed before work begins.
          </p>
        </FadeIn>

        <div className="grid-3">
          {PACKAGES.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.1}>
              <div className={`pi-card pi-pkg-card${pkg.featured ? ' pi-card-featured' : ''}`}>
                {pkg.featured && <span className="pi-pkg-badge">Most complete</span>}
                <div className="pi-pkg-price">
                  {pkg.from && <span className="pi-pkg-from">from</span>}
                  <span className="currency">£</span>
                  <span className="amount">{pkg.price}</span>
                </div>
                <div className="pi-pkg-name">{pkg.name}</div>
                <p className="pi-pkg-desc">{pkg.tagline}</p>
                <ul className="pi-pkg-includes">
                  {pkg.includes.map(item => (
                    <li key={item}>
                      <Icon name="check" size={14} />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="pi-btn pi-btn-primary pi-btn-full" onClick={() => onSelectPackage(pkg.value)}>
                  {pkg.cta}
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="pi-pkg-note">
          Not sure which package? Select{' '}
          <strong style={{ color:'var(--fg)' }}>"Not sure yet"</strong>{' '}
          in the enquiry form and we'll help on the discovery call.
        </FadeIn>
      </Container>
    </section>
  );
}

Object.assign(window, { Header, Hero, Packages });
