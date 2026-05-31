/* pi — shared primitives (PiMark, Icon, Btn, Eyebrow, Container) */

function PiMark({ className, style }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className} style={style} aria-label="pi" role="img">
      <rect x="12" y="26" width="76" height="13" rx="2.5" />
      <rect x="26" y="39" width="13" height="45" rx="2.5" />
      <rect x="61" y="39" width="13" height="45" rx="2.5" />
    </svg>
  );
}

function Icon({ name, size = 18, style, className }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.lucide || !window.lucide.icons) return;
    const pascal = name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
    const node = window.lucide.icons[pascal];
    if (node) {
      ref.current.innerHTML = '';
      const svg = window.lucide.createElement(node);
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('stroke-width', '1.75');
      svg.setAttribute('stroke', 'currentColor');
      svg.setAttribute('fill', 'none');
      ref.current.appendChild(svg);
    }
  }, [name, size]);
  return <span ref={ref} style={{ display:'inline-flex', alignItems:'center', ...style }} className={className} />;
}

function Eyebrow({ children }) {
  return <span className="pi-eyebrow">{children}</span>;
}

function Container({ children, style }) {
  return <div className="pi-container" style={style}>{children}</div>;
}

function Btn({ children, variant = 'primary', size, full, onClick, type = 'button', href, target }) {
  const cls = ['pi-btn', `pi-btn-${variant}`, size && `pi-btn-${size}`, full && 'pi-btn-full'].filter(Boolean).join(' ');
  if (href) {
    return <a href={href} target={target} rel="noopener noreferrer" className={cls}>{children}</a>;
  }
  return <button className={cls} onClick={onClick} type={type}>{children}</button>;
}

Object.assign(window, { PiMark, Icon, Eyebrow, Container, Btn });
