export function Footer() {
  return (
    <footer className="border-t border-color-border" style={{ borderColor: 'var(--color-border)', paddingTop: '2rem', paddingBottom: '3rem', marginTop: 'auto' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="logo-footer" style={{ fontWeight: 800, fontSize: '1.125rem', color: 'var(--color-text)' }}>
            Content<span style={{ color: 'var(--color-primary)' }}>Flow</span> AI
          </div>
          <nav style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Pricing</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Features</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Privacy</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Terms</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>Contact</a>
          </nav>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', margin: 0 }}>
            ContentFlow AI. Generate content from your transcripts.
          </p>
        </div>
      </div>
    </footer>
  );
}
