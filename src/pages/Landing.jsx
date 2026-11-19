import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components';
import { Film, Zap, Users, Monitor, Sparkles, CheckCircle } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="hero">
          <div className="container">
            <h1>
              Turn one transcript into <span className="highlight">all your content</span>
            </h1>
            <p className="lead">
              Paste a YouTube transcript, meeting recording, or long-form text and
              instantly generate Instagram captions, YouTube titles and descriptions,
              LinkedIn posts, X posts, SEO blog articles, short-form scripts, hashtags,
              and keywords — all saved in your dashboard.
            </p>
            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary btn-full">
                Get started free
              </Link>
              <Link to="/login" className="btn btn-outline btn-full">
                Sign in
              </Link>
            </div>
            <div className="hero-visual" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: '1.125rem' }}>
              Transcript input → AI content pack → Edit, export, publish
            </div>
          </div>
        </section>

        <section className="section" style={{ backgroundColor: '#ffffff' }}>
          <div className="container">
            <div className="section-header">
              <h2>Everything from one transcript</h2>
              <p>Generate the full content pack you need from a single source.</p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
                  <Film size={24} />
                </div>
                <h3>Instagram captions</h3>
                <p>Engaging captions with emojis, hooks, and calls to action.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
                  <Monitor size={24} />
                </div>
                <h3>YouTube titles & descriptions</h3>
                <p>SEO-optimized titles and timestamped video descriptions.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
                  <Users size={24} />
                </div>
                <h3>LinkedIn posts</h3>
                <p>Professional posts formatted for LinkedIn audiences.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
                  <Zap size={24} />
                </div>
                <h3>X/Twitter posts</h3>
                <p>Concise, thread-ready posts with hashtags.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
                  <Sparkles size={24} />
                </div>
                <h3>SEO blog articles</h3>
                <p>Long-form articles optimized for search engines.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon" style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>
                  <CheckCircle size={24} />
                </div>
                <h3>Short-form scripts</h3>
                <p>Scripts for Reels, Shorts, and TikTok videos.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
          <div className="container">
            <div className="section-header text-center">
              <h2>Simple, transparent pricing</h2>
              <p>Start free. Upgrade when you need more generations.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="card" style={{ borderColor: 'var(--color-border)' }}>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Free</h3>
                <div style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem' }}>₹0 / month</div>
                <ul style={{ listStyle: 'none', color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>3 content generations per month</li>
                  <li style={{ marginBottom: '0.5rem' }}>Save and edit generated content</li>
                  <li style={{ marginBottom: '0.5rem' }}>Export your results</li>
                </ul>
                <button className="btn btn-outline btn-full">Get started</button>
              </div>
              <div className="card" style={{ border: '2px solid var(--color-primary)', backgroundColor: 'var(--color-primary-light)' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 600, marginBottom: '0.5rem' }}>Most popular</div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Creator Pro</h3>
                <div style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem' }}>₹499 / month</div>
                <ul style={{ listStyle: 'none', color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>30 content generations per month</li>
                  <li style={{ marginBottom: '0.5rem' }}>Brand voice profile</li>
                  <li style={{ marginBottom: '0.5rem' }}>Generation history</li>
                  <li style={{ marginBottom: '0.5rem' }}>Priority support</li>
                </ul>
                <button className="btn btn-primary btn-full">Start free trial</button>
              </div>
              <div className="card" style={{ borderColor: 'var(--color-border)' }}>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>Business</h3>
                <div style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1rem' }}>₹1,499 / month</div>
                <ul style={{ listStyle: 'none', color: 'var(--color-text-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>100 content generations per month</li>
                  <li style={{ marginBottom: '0.5rem' }}>Up to 3 team seats</li>
                  <li style={{ marginBottom: '0.5rem' }}>Shared brand profiles</li>
                  <li style={{ marginBottom: '0.5rem' }}>Workspace collaboration</li>
                </ul>
                <button className="btn btn-outline btn-full">Contact us</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
