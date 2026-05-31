/* pi — scroll reveal via IntersectionObserver */

function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '-60px 0px', threshold: 0.05 }
    );

    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function FadeIn({ children, className = '', delay = 0 }) {
  return (
    <div
      className={`fade-in ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/* Hook that re-runs reveal after every render (picks up dynamically added .fade-in elements) */
function RevealObserver() {
  useReveal();
  return null;
}

Object.assign(window, { FadeIn, RevealObserver, useReveal });
