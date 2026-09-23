export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="name-wrap">
          <h1>ESAT CESUR</h1>
          <span className="mark">TM</span>
        </div>

        <p className="statement">
          <span className="statement-top">FRONTEND-HEAVY</span>
          <span className="statement-bottom">FULLSTACK DEVELOPER</span>
        </p>
        <a className="scroll-arrow" href="#work" aria-label="Scroll to work">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <path d="M24 5v36M9 27l15 15 15-15" />
          </svg>
        </a>
      </section>

      <section className="work-section" id="work">
        <span className="work-label">WORK</span>

        <div className="case-study">
          <header className="portfolio-intro">
            <p className="case-kicker">Selected work · 2022–2026</p>
            <h2>Products, platforms and identities built from idea to release.</h2>
            <p>
              A cross-section of my work in product development, AI, frontend engineering,
              academic collaboration and creative direction.
            </p>
          </header>

          <nav className="work-index" aria-label="Selected projects">
            <a href="#mesta"><span>01</span><strong>Mesta</strong><small>Bachelor · Product</small><i>2025</i></a>
            <a href="#ai-trainer"><span>02</span><strong>AI Trainer</strong><small>AI · Startup</small><i>2025–Now</i></a>
            <a href="#liva-food"><span>03</span><strong>Liva Food</strong><small>Web · Client</small><i>2024</i></a>
            <a href="#academic-lab"><span>04</span><strong>Academic Lab</strong><small>School projects</small><i>2022–2025</i></a>
            <a href="#ekip"><span>05</span><strong>Ekip</strong><small>Brand · Direction</small><i>2022–Now</i></a>
          </nav>

          <section className="featured-project" id="mesta">
            <div className="featured-project-topline">
              <p className="case-kicker">01 · Bachelor project</p>
              <span>Grade A</span>
            </div>
            <div className="featured-project-copy">
              <h2>Mesta Operations</h2>
              <div>
                <p>An operational dashboard for Norway&apos;s largest road-maintenance company.</p>
                <p>I owned the UI and UX design and led the frontend, from the overview and reporting flows to interactive maps, KPI cards and bilingual support.</p>
                <p>During feedback sessions, Mesta employees described the product as more polished and intuitive than some of the systems they use today. The bachelor project was graded A.</p>
                <ul><li>React</li><li>TypeScript</li><li>MapLibre</li><li>.NET</li><li>PostgreSQL</li></ul>
              </div>
            </div>
            <div className="featured-project-media mesta-media">
              <figure className="mesta-screen mesta-overview-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/oversiktsiden.png" alt="Mesta dashboard overview designed by Esat Cesur" />
                <figcaption><span>01</span> Operations overview</figcaption>
              </figure>
            </div>
          </section>

          <section className="featured-project" id="ai-trainer">
            <div className="featured-project-topline">
              <p className="case-kicker">02 · AI startup</p>
              <span>Product in development</span>
            </div>
            <div className="featured-project-copy">
              <h2>AI Trainer</h2>
              <div>
                <p>A character-driven personal trainer that turns conversation into adaptive workout plans.</p>
                <p>I am building the product across mobile and backend, including onboarding, voice interaction, coach personas and exercise matching.</p>
                <ul><li>React Native</li><li>Expo</li><li>FastAPI</li><li>Python</li><li>Claude</li></ul>
              </div>
            </div>
            <div className="featured-project-media phone-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/aitrainer.png" alt="AI Trainer mobile application" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/aitraner2.png" alt="AI Trainer coaching interface" />
            </div>
          </section>

          <section className="featured-project" id="liva-food">
            <div className="featured-project-topline">
              <p className="case-kicker">03 · Client website</p>
              <span>Eindhoven, Netherlands</span>
            </div>
            <div className="featured-project-copy">
              <h2>Liva Food</h2>
              <div>
                <p>A warm, mobile-first website for a Middle Eastern restaurant, designed to move visitors from appetite to order with minimal friction.</p>
                <p>Menu, catering requests and online ordering are brought together in a fast, focused experience.</p>
                <a className="project-visit project-link" data-cursor-label="Visit site" href="https://www.livafood.nl" target="_blank" rel="noreferrer">Visit live site ↗</a>
              </div>
            </div>
            <div className="featured-project-media liva-media">
              <figure className="liva-screen liva-menu-screen">
                <div className="liva-menu-crop">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/livafoodmenu.png" alt="Liva Food menu website" />
                </div>
                <figcaption><span>01</span> Digital menu</figcaption>
              </figure>
              <figure className="liva-screen">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/livafoodcatering.png" alt="Liva Food catering page" />
                <figcaption><span>02</span> Catering request flow</figcaption>
              </figure>
            </div>
          </section>

          <section className="academic-lab" id="academic-lab">
            <div className="academic-lab-heading">
              <p className="case-kicker">04 · Academic lab</p>
              <h2>Engineering foundations, applied through real projects.</h2>
            </div>
            <p className="academic-summary">The most relevant skills from my Bachelor&apos;s degree in Information Technology at OsloMet, connecting product decisions with the engineering underneath.</p>
            <div className="academic-grid">
              <article>
                <span>01 · ADSE2100 / DATA1200</span>
                <h3>Product, UX &amp; accessibility</h3>
                <p>Human-computer interaction, prototyping, usability testing and inclusive interfaces designed around WCAG principles.</p>
                <small>Figma · User testing · WCAG · HTML/CSS</small>
              </article>
              <article>
                <span>02 · ITPE3200 / DATA1500</span>
                <h3>Full-stack web systems</h3>
                <p>Component-based frontends connected to REST APIs and relational databases, built through collaborative application projects.</p>
                <small>React · Node.js · REST · SQL · PostgreSQL</small>
              </article>
              <article>
                <span>03 · DAVE3625 / DATA3750</span>
                <h3>Applied AI &amp; data</h3>
                <p>Turning datasets into useful models and visual explanations through practical machine-learning and data-science work.</p>
                <small>Python · pandas · scikit-learn · Data visualization</small>
              </article>
              <article>
                <span>04 · DATS2300 / DATA2410 / ITPE3100</span>
                <h3>Systems &amp; engineering</h3>
                <p>Algorithms, object-oriented programming, networking, cloud fundamentals and security, giving product work a stronger technical base.</p>
                <small>Java · Algorithms · TCP/IP · Cloud · Security</small>
              </article>
            </div>
          </section>

          <section className="ekip-case" id="ekip">
          <header className="case-intro">
            <div className="ekip-case-label">
              <p className="case-kicker">05 · Brand &amp; creative direction</p>
              <a className="ekip-case-logo project-link" data-cursor-label="Visit Ekip" href="https://ekipeu.com/" target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/EKIPLOGOS.svg" alt="Ekip" />
              </a>
            </div>
            <h2>An independent fashion label shaped by culture and identity.</h2>
            <p className="case-summary">Ekip is an Oslo-based clothing brand built with a close team. What started as an idea between friends has grown into a living platform for garments, campaigns and stories, created across Oslo and internationally.</p>
          </header>

          <div className="case-columns">
            <section className="case-block">
              <p className="case-kicker">02 My role</p>
              <h3>COO &amp; CFO</h3>
              <ul>
                <li>Creative direction</li>
                <li>Production</li>
                <li>Marketing</li>
                <li>Finance</li>
              </ul>
            </section>

            <section className="case-block contribution">
              <p className="case-kicker">03 Contribution</p>
              <p>I help take the brand from first idea to final release: planning campaigns, coordinating production and logistics, overseeing finance, building the digital presence and creating the systems behind each launch.</p>
            </section>
          </div>

          <figure className="case-hero-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ekipfoto2.jpeg" alt="Ekip campaign in a football changing room" />
            <figcaption>Behind the scenes, Oslo campaign</figcaption>
          </figure>

          <section className="selected-projects">
            <p className="case-kicker">04 Selected projects</p>
            <div className="project-list">
              <a className="project-link" data-cursor-label="View project" href="https://www.instagram.com/p/DadLuvPMqpa/" target="_blank" rel="noreferrer"><span>01</span><h3>Karpe World</h3><small>View project ↗</small></a>
              <a className="project-link" data-cursor-label="View project" href="https://www.munch.no/en/whats-on/ung-after-hours-2411/" target="_blank" rel="noreferrer"><span>02</span><h3>MUNCH Ung</h3><small>View project ↗</small></a>
              <div><span>03</span><h3>Pop-Up Kunsthall</h3><small>Sold out</small></div>
              <div><span>04</span><h3>Social media marketing</h3><small>80K+ profile visits · 100K+ views across all platforms</small></div>
            </div>
          </section>

          <section className="gallery-section">
            <p className="case-kicker">05 Gallery</p>
            <div className="case-gallery">
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ekip.jpeg" alt="Melih Atalay photographed in Nice" />
                <figcaption><span>Melih Atalay for my portfolio</span><span>Nice, France</span></figcaption>
              </figure>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ekiprichard.jpeg" alt="Richard photographed for Ekip in Oslo" />
                <figcaption><span>Richard for Ekip</span><span>Oslo, Norway</span></figcaption>
              </figure>
            </div>
          </section>

          <section className="outcome-section">
            <p className="case-kicker">06 Outcome</p>
            <h2>Three years of building a brand people can recognize, wear and belong to.</h2>
            <div className="outcomes">
              <div><strong>3+</strong><span>Years active</span></div>
              <div><strong>3+</strong><span>High-scale projects</span></div>
              <div><strong>1000s</strong><span>Organic views</span></div>
            </div>
            <a className="visit-link project-link" data-cursor-label="Visit Ekip" href="https://ekipeu.com/" target="_blank" rel="noreferrer" aria-label="Visit Ekip">
              <span>VISIT</span>
              <span className="visit-arrow">↗</span>
            </a>
          </section>
          </section>

          <section className="developer-profile" id="developer-profile">
            <div className="developer-profile-heading">
              <p className="case-kicker">07 Developer profile</p>
              <span className="developer-status">Available for selected projects</span>
            </div>

            <h2>I turn ambitious ideas into fast, expressive digital products.</h2>

            <div className="developer-profile-grid">
              <div className="developer-intro">
                <p>
                  Frontend-heavy full-stack developer based in Oslo. I work across
                  design, motion and engineering to build products that feel as
                  considered as they are functional.
                </p>
              </div>

              <div className="developer-details">
                <div>
                  <span>Focus</span>
                  <p>Frontend architecture, interaction design, creative development and product thinking.</p>
                </div>
                <div>
                  <span>Core stack</span>
                  <p>React, Next.js, TypeScript, Tailwind CSS, GSAP and Three.js.</p>
                </div>
                <div>
                  <span>Beyond the interface</span>
                  <p>FastAPI, .NET, Node.js, PostgreSQL and AI-powered product experiences.</p>
                </div>
                <div>
                  <span>Engineering foundation</span>
                  <p>Java and object-oriented programming, algorithms, SQL, networking, security and accessible web standards.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="contact-section" id="contact">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="contact-portrait" src="/images/realisticsiyah3.png" alt="Portrait of Esat Cesur" />
          <div className="contact-shade" aria-hidden="true" />

          <span className="contact-code">+47</span>
          <h2><span>GET IN</span><span>TOUCH</span></h2>

          <div className="contact-footer">
            <div className="contact-label"><small>08</small><strong>Contact</strong></div>
            <a className="contact-email" href="mailto:siaresatcesur@gmail.com">SIARESATCESUR@GMAIL.COM</a>
            <div className="contact-socials">
              <a className="project-link" data-cursor-label="Open GitHub" href="https://github.com/esatcesur74/" target="_blank" rel="noreferrer">GitHub</a>
              <a className="project-link" data-cursor-label="Open LinkedIn" href="https://www.linkedin.com/in/esat-cesur-240803390/" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
