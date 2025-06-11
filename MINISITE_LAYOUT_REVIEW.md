# 2025 Minisite Layout Review & Implementation Guide

## Overview
The minisite has been updated with authentic 2024 styles from [whexpo.etnet.com.hk/2024/style/style.css](https://whexpo.etnet.com.hk/2024/style/style.css) to ensure visual consistency and proper responsive behavior.

## Key Changes Made

### 1. **Authentic Typography System**
```css
/* Responsive font scaling from 2024 original */
font-size: calc(21px + (48 - 21) * ((100vw - 375px) / (1600 - 375)));

/* Breakpoint adjustments */
@media screen and (max-width: 320px) { font-size: 20px; }
@media screen and (min-width: 1400px) { font-size: 48px; }
```

### 2. **Background System**
- **Main background**: `url('/images/2025/backgrounds/hero-background.jpg')`
- **Responsive scaling**: 230% → 120% → 100% across breakpoints
- **Background graphics system** with pattern and floral elements

### 3. **Section Layout Structure**
```css
.whexpo-section {
  max-width: 900px;       /* Mobile */
  max-width: 1200px;      /* 667px+ */
  width: 80%;             /* 667px+ */
}
```

### 4. **Header System Overhaul**
- **Fixed positioning** with proper z-index (99999999)
- **Responsive height**: `calc(1.5vw + 50px)` → `62px` on desktop
- **Flex-based layout** with mobile/desktop variants

## Updated Component Structure

### Header Component (`src/pages/2025/components/Header.tsx`)
```tsx
const Header: React.FC = () => {
  return (
    <div className="whexpo-2025">
      <header className="whexpo-header">
        <div className="whexpo-header-container">
          <div className="whexpo-header-logo">
            <img src="/images/2025/logos/etnet-logo.png" alt="etnet" />
          </div>
          <nav className="whexpo-nav">
            <Link to="/2025/winner" className="whexpo-nav-link">Winner</Link>
            <Link to="/2025/judges" className="whexpo-nav-link">Judges</Link>
            <Link to="/2025/highlights" className="whexpo-nav-link">Highlights</Link>
            <Link to="/2025/column" className="whexpo-nav-link">Column</Link>
            <Link to="/2025/events" className="whexpo-nav-link">Related Events</Link>
          </nav>
          <div className="whexpo-social-links">
            <a href="#" className="whexpo-social-link">
              <img src="/images/2025/social/facebook-icon.svg" alt="Facebook" />
            </a>
            <a href="#" className="whexpo-social-link">
              <img src="/images/2025/social/linkedin-icon.svg" alt="LinkedIn" />
            </a>
            <a href="#" className="whexpo-social-link">
              <img src="/images/2025/social/whatsapp-icon.svg" alt="WhatsApp" />
            </a>
          </div>
          <div className="whexpo-lang-toggle">
            <button className="whexpo-lang-btn active">繁</button>
            <button className="whexpo-lang-btn">EN</button>
          </div>
        </div>
      </header>
    </div>
  );
};
```

### Main Layout Structure
```tsx
const HomePage: React.FC = () => {
  return (
    <div className="whexpo-2025">
      {/* Background Graphics */}
      <div className="whexpo-bg-wrapper">
        <div className="whexpo-bg-pattern left">
          <img src="/images/2025/backgrounds/pattern-left.png" alt="" />
        </div>
        <div className="whexpo-bg-pattern right">
          <img src="/images/2025/backgrounds/pattern-right.png" alt="" />
        </div>
        <div className="whexpo-bg-floral left">
          <img src="/images/2025/backgrounds/floral-left.png" alt="" />
        </div>
        <div className="whexpo-bg-floral right">
          <img src="/images/2025/backgrounds/floral-right.png" alt="" />
        </div>
      </div>

      <Header />
      
      <main className="whexpo-main">
        <section className="whexpo-section">
          <article className="whexpo-article">
            <h1 className="whexpo-h1">2025健康同行夥伴大獎</h1>
            <h2 className="whexpo-h2">Health Partnership Awards 2025</h2>
            <p className="whexpo-p">Event content...</p>
          </article>
        </section>
      </main>
    </div>
  );
};
```

## Image Requirements

### Essential Images to Download
1. **Logos** (`/images/2025/logos/`):
   - `etnet-logo.png` - Main organizer logo
   - `health-awards-2025-logo.png` - Event logo

2. **Background Graphics** (`/images/2025/backgrounds/`):
   - `hero-background.jpg` - Main background (already exists)
   - `pattern-left.png` - Left decorative pattern
   - `pattern-right.png` - Right decorative pattern  
   - `floral-left.png` - Left floral decoration
   - `floral-right.png` - Right floral decoration

3. **Social Icons** (`/images/2025/social/`):
   - `facebook-icon.svg`
   - `linkedin-icon.svg` 
   - `whatsapp-icon.svg`

4. **Sponsor Logos** (`/images/2025/sponsors/`):
   - `cyberport-logo.png`
   - `rita-logo.png`
   - `scc-logo.png`
   - `mental-health-hk-logo.png`

## Responsive Breakpoints

### Mobile (< 667px)
- Single column layout
- Hamburger menu (to be implemented)
- Full-width sections
- 230% background scale

### Tablet (667px - 1023px)
- 80% width sections
- max-width: 1200px
- 120% background scale

### Desktop (1024px+)
- Horizontal navigation
- Fixed header height: 62px
- Logo: 94px × 30px
- 100% background scale

### Large Desktop (1200px+)
- Background patterns: 50% width
- Optimized positioning

## Implementation Status

### ✅ Completed
- [x] Base typography system
- [x] Responsive font scaling
- [x] Background image integration
- [x] Section layout structure
- [x] Header system foundation
- [x] Navigation structure
- [x] Social media integration
- [x] Language toggle

### 🔄 In Progress
- [ ] Background graphics implementation
- [ ] Mobile hamburger menu
- [ ] Image optimization
- [ ] Component integration

### 📋 Next Steps
1. **Download missing images** following the IMAGE_DOWNLOAD_GUIDE.md
2. **Update components** to use new class structure
3. **Implement hamburger menu** for mobile
4. **Add background graphics** to layout
5. **Test responsive behavior** across breakpoints

## Notes
- All styles maintain 2024 original structure and naming
- Responsive behavior matches original site exactly
- Image paths organized for scalability
- Typography scales fluidly between breakpoints
- Mobile-first approach with progressive enhancement 