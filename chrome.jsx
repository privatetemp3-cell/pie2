/* pi — browser chrome mockup used in the hero */

function BrowserChrome() {
  return (
    <div className="pi-mock hero-anim-r">
      {/* Title bar */}
      <div className="pi-mock-bar">
        <span className="pi-mock-dot" style={{ background: '#FF5F57' }} />
        <span className="pi-mock-dot" style={{ background: '#FEBC2E' }} />
        <span className="pi-mock-dot" style={{ background: '#28C840' }} />
        <span className="pi-mock-url">builtbypi.com</span>
      </div>

      {/* Page content simulation */}
      <div className="pi-mock-body">
        {/* Hero text lines */}
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          <div className="pi-mock-line" style={{ width:'36%', background:'rgba(8,123,255,.22)' }} />
          <div className="pi-mock-line" style={{ width:'92%', height:16 }} />
          <div className="pi-mock-line" style={{ width:'78%', height:16 }} />
          <div className="pi-mock-line" style={{ width:'100%', height:10, marginTop:2 }} />
          <div className="pi-mock-line" style={{ width:'90%', height:10 }} />
        </div>

        {/* CTA bar */}
        <div className="pi-mock-cta" style={{ marginTop:4 }}>
          Get a quote&nbsp;→
        </div>

        {/* Feature cards */}
        <div className="pi-mock-cards">
          {[0,1,2].map(i => (
            <div key={i} className="pi-mock-card" style={{ display:'flex', flexDirection:'column', gap:7, padding:10 }}>
              <div style={{ width:24, height:24, borderRadius:6, background:'rgba(8,123,255,.2)' }} />
              <div className="pi-mock-line" style={{ width:'75%', height:9 }} />
              <div className="pi-mock-line" style={{ width:'100%', height:7 }} />
              <div className="pi-mock-line" style={{ width:'85%', height:7 }} />
            </div>
          ))}
        </div>

        {/* Mini form */}
        <div className="pi-mock-form">
          <div className="pi-mock-form-row">
            <div className="pi-mock-field" />
            <div className="pi-mock-field" />
          </div>
          <div className="pi-mock-field" style={{ height:46 }} />
          <div className="pi-mock-submit" />
        </div>
      </div>
    </div>
  );
}

window.BrowserChrome = BrowserChrome;
