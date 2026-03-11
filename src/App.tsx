import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import {
  BriefcaseBusiness,
  Download,
  ExternalLink,
  FolderCode,
  FolderGit2,
  Github,
  GraduationCap,
  Home,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Sun,
  UserRound,
  Wrench,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Theme = 'light' | 'dark'

type SkillGroup = {
  category: string
  items: string[]
}

type Project = {
  title: string
  description: string
  technologies: string[]
  features: string[]
  github: string
  liveDemo?: string
}

type Experience = {
  role: string
  company: string
  duration: string
  responsibilities: string[]
  achievements: string[]
}

const profile = {
  fullName: 'Sean Kirby Alipao',
  title: 'Full Stack Web Developer',
  description:
    'Computer Science student based in the Philippines, focused on building scalable web applications and practical systems that improve operations and decision-making.',
  email: 'seankirbyalipao23@gmail.com',
  github: 'https://github.com/skyyy-23',
  linkedin: 'https://www.linkedin.com/in/sean-kirby-alipao-899664357/',
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend Technologies',
    items: ['HTML', 'CSS', 'JavaScript', 'React js', 'TypeScript', 'jQuery', 'Tailwind CSS'],
  },
  {
    category: 'Backend Technologies',
    items: ['Laravel', 'PHP MVC', 'Express.js'],
  },
  {
    category: 'Database Technologies',
    items: ['MySQL', 'MongoDB', 'ClickHouse', 'Supabase'],
  },
  {
    category: 'Development Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Figma', 'Canva', 'Unity'],
  },
  {
    category: 'Other Skills',
    items: ['UI/UX Design', 'REST API Development', 'MVC Architecture', 'Responsive Web Design'],
  },
]

const projects: Project[] = [
  {
    title: 'Franchise Health Monitoring System',
    description:
      'A centralized monitoring dashboard that tracks branch performance, health scores, and operational trends for franchise management.',
    technologies: ['PHP', 'Supabase', 'jQuery', 'GroqL', 'ClickHouse'],
    features: [
      'Automated health score computation',
      'Branch-level AI insights and trend tracking with precise context',
      'Management-ready dashboard reporting',
      'Live data integration for real-time monitoring',
    ],
    github: 'https://github.com/your-username/franchise-health-monitoring-system',
    liveDemo: 'http://localhost/Franchise%20Health%20module/index.php',
  },
  {
    title: 'ShopHub E-commerce website',
    description:
      'An E-commerce website for managing product catalogs, inventory, and orders with a user-friendly interface and secure authentication.',
    technologies: ['React js', 'Laravel', 'MySQL'],
    features: [
      'Secure admin authentication and role-based access',
      'Comprehensive product and inventory management',
      'Order tracking and reporting features',
    ],
    github: 'https://github.com/your-username/crud-web-app-suite',
    liveDemo: 'http://localhost:5174/',
  },
  {
    title: 'AR Indoor Navigation System',
    description:
      'An indoor wayfinding system that uses augmented reality to guide users through building interiors with directional overlays and location assistance.',
    technologies: ['Unity', 'AR Foundation', 'C#', 'Node.js'],
    features: [
      'Real-time indoor direction overlays',
      'Route selection for key destinations',
      'Admin-maintained navigation points',
    ],
    github: 'https://github.com/your-username/ar-indoor-navigation-system',
    liveDemo: '',
  },
]

const experiences: Experience[] = [
  {
    role: 'Web Developer Intern',
    company: 'LYB Solutions',
    duration: 'Jan 2026 - March 2026',
    responsibilities: [
      'Assisted in maintaining internal web systems and databases.',
      'Debugged and tested basic PHP and JavaScript issues.',
      'Created a system for real-world problem solution in the existing system.',
      'Understand the business structure with real data.',
    ],
    achievements: [
      'Delivered a new feature that improved our legacy system when it comes to analytics with AI integration.',
      'Improved workflow efficiency by automating repetitive data tasks.',
    ],
  },
]

type SectionHeadingProps = {
  label: string
  title: string
}

function SectionHeading({ label, title }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div className="section-heading-row">
        <span className="section-line" />
        <p className="section-label">{label}</p>
      </div>
      <h2>{title}</h2>
    </div>
  )
}

function getGmailComposeUrl(to: string, subject?: string, body?: string) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to,
  })

  if (subject) params.set('su', subject)
  if (body) params.set('body', body)

  return `https://mail.google.com/mail/?${params.toString()}`
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('portfolio-theme')
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [menuOpen, setMenuOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
      },
    )

    const revealItems = document.querySelectorAll('.reveal')
    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  const navItems: { href: string; label: string; icon: LucideIcon }[] = [
    { href: '#hero', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: UserRound },
    { href: '#skills', label: 'Skills', icon: Wrench },
    { href: '#projects', label: 'Projects', icon: FolderCode },
    { href: '#experience', label: 'Experience', icon: BriefcaseBusiness },
    { href: '#education', label: 'Education', icon: GraduationCap },
    { href: '#contact', label: 'Contact', icon: Mail },
  ]

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const subject = `Portfolio inquiry from ${formName}`
    const body =
      `Name: ${formName}\nEmail: ${formEmail}\n\nMessage:\n${formMessage}`

    window.open(
      getGmailComposeUrl(profile.email, subject, body),
      '_blank',
      'noopener,noreferrer',
    )
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#hero" aria-label="Go to homepage" onClick={closeMenu}>
          SK
        </a>

        <nav
          id="site-navigation"
          className={`nav-links ${menuOpen ? 'open' : ''}`}
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.label}
              title={item.label}
              onClick={closeMenu}
            >
              <item.icon size={16} aria-hidden="true" />
              <span className="sr-only">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="topbar-controls">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
            aria-label="Toggle color theme"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon size={16} aria-hidden="true" />
            ) : (
              <Sun size={16} aria-hidden="true" />
            )}
            <span className="sr-only">
              {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            </span> 
          </button>

          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            title={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </header>

      <main>
        <section id="hero" className="hero section reveal">
          <div className="hero-frame">
            <div className="accent-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <p className="eyebrow">Looking for full-time opportunities</p>
            <h1>{profile.fullName}</h1>
            <p className="hero-title">{profile.title}</p>
            <p className="hero-description">{profile.description}</p>

            <div className="hero-actions">
              <a
                href="#projects"
                className="btn btn-primary icon-btn"
                aria-label="View Projects"
                title="View Projects"
              >
                <FolderGit2 size={18} aria-hidden="true" />
                <span className="sr-only">View Projects</span>
              </a>
              <a
                href="/Alipao%20Resume.pdf"
                className="btn btn-secondary icon-btn"
                download="Alipao Resume.pdf"
                aria-label="Download Resume"
                title="Download Resume"
              >
                <Download size={18} aria-hidden="true" />
                <span className="sr-only">Download Resume</span>
              </a>
              <a
                href="#contact"
                className="btn btn-ghost icon-btn"
                aria-label="Contact Me"
                title="Contact Me"
              >
                <Send size={18} aria-hidden="true" />
                <span className="sr-only">Contact Me</span>
              </a>
            </div>

            <div className="social-links" aria-label="Professional profiles">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
                <Github size={18} aria-hidden="true" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
                <Linkedin size={18} aria-hidden="true" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={getGmailComposeUrl(profile.email)}
                target="_blank"
                rel="noreferrer"
                aria-label="Email"
                title="Email"
              >
                <Mail size={18} aria-hidden="true" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section reveal">
          <SectionHeading label="About" title="Who I Am" />

          <div className="about-layout">
            <article>
              <p>
                I am a Computer Science student focused on creating reliable and maintainable web
                applications. I enjoy turning complex requirements into clean systems that deliver
                measurable outcomes.
              </p>
              <p>
                My interests include full stack development, system design, and software
                engineering that improves business efficiency across operations and reporting.
              </p>
              <p>
                I am actively building practical projects that strengthen my architecture skills,
                product thinking, and real-world delivery experience.
              </p>
            </article>

            <div className="about-side">
              <article className="card left-accent-card">
                <h3>Education Background</h3>
                <ul>
                  <li className="muted">STI College Calamba 2022-2026</li>
                  <li className="muted">Dean's Lister</li>
                  <li className="muted">Scholar of Laguna and Cabuyao</li>
                </ul>
              </article>

              <article className="card left-accent-card">
                <h3>My Niche</h3>
                <ul>
                  <li>Full Stack Development</li>
                  <li>UI/UX Design</li>
                  <li>QA Testing</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="skills" className="section reveal">
          <SectionHeading label="Skills" title="Technical Expertise" />

          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article key={group.category} className="card skill-card">
                <h3>{group.category}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section reveal">
          <SectionHeading label="Portfolio" title="Featured Projects" />

          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="card project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <p className="mini-label">Technologies</p>
                <div className="tag-group" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="mini-label">Key Features</p>
                <ul>
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>

                <div className="project-links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub Repository for ${project.title}`}
                    title="GitHub Repository"
                  >
                    <Github size={17} aria-hidden="true" />
                    <span className="sr-only">GitHub Repository</span>
                  </a>
                  {project.liveDemo ? (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Live Demo for ${project.title}`}
                      title="Live Demo"
                    >
                      <ExternalLink size={17} aria-hidden="true" />
                      <span className="sr-only">Live Demo</span>
                    </a>
                  ) : (
                    <span className="disabled-link">Live Demo: Available on request</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section reveal">
          <SectionHeading label="Experience" title="Professional Journey" />

          <div className="timeline">
            {experiences.map((item) => (
              <article key={`${item.company}-${item.role}`} className="card left-accent-card">
                <h3>{item.role}</h3>
                <p className="muted">
                  {item.company} | {item.duration}
                </p>

                <p className="mini-label">Key Responsibilities</p>
                <ul>
                  {item.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>

                <p className="mini-label">Achievements</p>
                <ul>
                  {item.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section reveal">
          <SectionHeading label="Education" title="Academic Background" />

          <article className="card left-accent-card">
            <h3>Bachelor of Science in Computer Science</h3>
            <p className="muted">STI College Calamba | Expected Graduation: July 2026</p>
            <br />
            <p>
              Academic Achievements.
            </p>
          </article>
        </section>

        <section id="contact" className="section reveal">
          <SectionHeading label="Contact" title="Let&apos;s Connect" />

          <div className="contact-layout">
            <form className="card contact-form" onSubmit={handleContactSubmit}>
              <h3>Quick Message</h3>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={formName}
                onChange={(event) => setFormName(event.target.value)}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={formEmail}
                onChange={(event) => setFormEmail(event.target.value)}
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={4}
                value={formMessage}
                onChange={(event) => setFormMessage(event.target.value)}
                required
              />

              <button
                type="submit"
                className="btn btn-primary submit-btn icon-btn"
                aria-label="Send via Email"
                title="Send via Email"
              >
                <Send size={18} aria-hidden="true" />
                <span className="sr-only">Send via Email</span>
              </button>
            </form>

            <article className="card">
              <p> 
                Contact me through my socials below or send me a message using the form. <br /> I look forward to connecting with you!
              </p>
              <ul className="contact-list">
                <li>
                  <strong>Email:</strong> <span>{profile.email}</span>
                  <a
                    href={getGmailComposeUrl(profile.email)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Send email"
                    title="Send email"
                  >
                    <Mail size={16} aria-hidden="true" />
                    <span className="sr-only">Send email</span>
                  </a>
                </li>
                <li>
                  <strong>GitHub:</strong> <span>{profile.github}</span>
                  <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub" title="Open GitHub">
                    <Github size={16} aria-hidden="true" />
                    <span className="sr-only">Open GitHub</span>
                  </a>
                </li>
                <li>
                  <strong>LinkedIn:</strong> <span>{profile.linkedin}</span>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open LinkedIn"
                    title="Open LinkedIn"
                  >
                    <Linkedin size={16} aria-hidden="true" />
                    <span className="sr-only">Open LinkedIn</span>
                  </a>
                </li>
              </ul>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profile.fullName}. Tech Stack used: React + TypeScript.
        </p>
      </footer>
    </div>
  )
}

export default App
