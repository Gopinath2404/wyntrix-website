import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Mail,
  MapPin,
  Menu,
  Megaphone,
  Network,
  Phone,
  Send,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react'
import type { ComponentType, FormEvent } from 'react'
import './App.css'

const logoAsset = '/assets/wyntrix-logo.png'

const company = {
  name: 'Wyntrix Innovations (OPC) Private Limited',
  email: 'wyntrixofficial@gmail.com',
  phone: '+91 6381635513',
  map: 'https://www.google.com/maps/place/Chennai,+Tamil+Nadu/@13.043795,80.2339071,11z/',
  instagram: 'https://www.instagram.com/wyntrix_official',
  linkedin: 'https://www.linkedin.com/company/wyntrix',
  community: 'https://chat.whatsapp.com/KcHD5iG5qEY3vG9GUedc4M?mode=gi_t',
  footerCommunity: 'https://chat.whatsapp.com/K6r0Yl3pSxC1u2Yf4q1Z8F',
}

const navigation = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Services', 'services'],
  ['Internship', 'internship'],
  ['Collaborations', 'collaboration'],
  ['Team', 'team'],
  ['Contact', 'contact'],
] as const

const metrics = [
  { amount: 15, suffix: 'K+', label: 'Students reached' },
  { amount: 100, suffix: '+', label: 'Campaigns & events' },
  { amount: 50, suffix: '+', label: 'Institutions' },
  { amount: 2, suffix: 'M+', label: 'Digital impressions' },
  { amount: 10, suffix: 'L+', prefix: '₹', label: 'Sponsorship value' },
]

const services: {
  title: string
  description: string
  icon: ComponentType<{ size?: number; strokeWidth?: number }>
  tag: string
}[] = [
  {
    title: 'Student Community',
    description:
      'A curated network of driven students sharing internships, projects, and growth opportunities statewide.',
    icon: UsersRound,
    tag: '15K+ members',
  },
  {
    title: 'Event Production',
    description:
      'Full-service event strategy — from concept and branding to day-of execution and post-event reporting.',
    icon: Sparkles,
    tag: '100+ delivered',
  },
  {
    title: 'Digital Marketing',
    description:
      'Data-driven campaigns across Instagram, LinkedIn, and YouTube tailored for the campus audience.',
    icon: Megaphone,
    tag: '2M+ impressions',
  },
  {
    title: 'Campus Ambassadors',
    description:
      'On-ground brand representatives embedded in 50+ colleges to drive awareness and registrations.',
    icon: Network,
    tag: '50+ campuses',
  },
  {
    title: 'Sponsorship & Partnerships',
    description:
      'We help student bodies and institutions secure corporate sponsors through structured pitch strategies.',
    icon: BriefcaseBusiness,
    tag: '₹10L+ raised',
  },
  {
    title: 'Tech Solutions',
    description:
      'Modern websites, apps, dashboards, and registration systems tailored for institutions, startups, and businesses.',
    icon: Code2,
    tag: 'Digital solutions',
  },
]

const techCapabilities = [
  'Web development (MERN, Python, Java)',
  'Mobile app development (Android & iOS)',
  'IoT systems & embedded solutions',
  'AI & ML model integration',
  'Admin dashboards & portals',
  'Event registration & ticketing systems',
  'Payment gateway integrations',
  'UI/UX design & prototyping',
]

const listedServiceAreas = [
  'Student Community',
  'Event Promotions',
  'Event Management',
  'Tech Solutions',
  'Creative Studio',
  'Sponsorship Help',
]

type ContactErrors = Partial<
  Record<'enquiryType' | 'name' | 'email' | 'phone' | 'message', string>
>

const founders = [
  {
    name: 'Tharun Varshan U',
    role: 'Founder & CEO',
    image: 'https://www.wyntrix.in/_next/image?url=%2Fteam%2Ffounder01.png&w=828&q=75',
    className: 'founder-main',
  },
  {
    name: 'Ashiqkeen S',
    role: 'Co-Founder',
    image: 'https://www.wyntrix.in/_next/image?url=%2Fteam%2Fcofounder01.png&w=828&q=75',
    className: '',
  },
  {
    name: 'Yuvan Dharshan U',
    role: 'Co-Founder',
    image: 'https://www.wyntrix.in/_next/image?url=%2Fteam%2Fcofounder02.png&w=828&q=75',
    className: '',
  },
  {
    name: 'Praveen R',
    role: 'Co-Founder',
    image: 'https://www.wyntrix.in/_next/image?url=%2Fteam%2Fcofounder03.png&w=828&q=75',
    className: '',
  },
]

const partnerLogos = [
  ['AGNI', 'AGNI.jpg'],
  ['AM JAIN', 'AM JAIN.webp'],
  ['CIT', 'CIT.jpg'],
  ['CRESCENT', 'CRESCENT.jpg'],
  ['Easwari Engineering College', 'Easwari_Engineering_College_logo.png'],
  ['GDG Cloud Mumbai', 'GDG Cloud Mumbai - Mukesh Patel School of Technology Management & Engineering.jpg'],
  ['Hindustan', 'HINDUSTAN.jpg'],
  ['IIIT Kalyani', 'Indian_Institute_of_Information_Technology_Kalyani_Logo.svg.png'],
  ['Jeppiaar', 'JEPPIARR.jpg'],
  ['Jerusalem College of Engineering', 'jerusalem_college_of_engineering.jpg'],
  ['Mohamed Sathak AJ College', 'mohamed_sathak_ajcollege_of_engineering_logo.jpg'],
  ['New Prince', 'new prince.jpg'],
  ['Panimalar Engineering College', 'panimalar_engineering_college_logo.jpg'],
  ['Prathyusha Engineering College', 'prathyushaenggcollege.jpg'],
  ['Rajalakshmi Engineering College', 'rajalakshmi_engineering_college_logo.jpg'],
  ['REC', 'REC.jpg'],
  ['RIT', 'RIT.jpg'],
  ['Sairam Institutions', 'sairam_institutions_logo.jpg'],
  ['Saveetha Engineering College', 'saveetha_engineering_college_logo.jpg'],
  ['SIMATS', 'SIMATS.webp'],
  ['SRM', 'SRM.png'],
  ['SSN', 'SSN.png'],
  ['St Joseph Institute', 'ST JOSEPH INSTITUTE.jpg'],
  ['St Joseph', 'STJOSEPH.jpg'],
  ['TEDx', 'TEDx-logo-circle.webp'],
  ['Thakur', 'Thakur.jpg'],
  ['Vel Tech High Tech', 'VEL TECH HIGH TECH.png'],
  ['Vel Tech Multi Tech', 'vel tech multi techh.jpg'],
  ['VELS University', 'VELS_UNIVERSITTY.jpg'],
]

const floatingLogos = [
  { className: 'float-logo-a', depth: 12 },
  { className: 'float-logo-b', depth: 22 },
  { className: 'float-logo-c', depth: 8 },
  { className: 'float-logo-d', depth: 17 },
  { className: 'float-logo-e', depth: 26 },
  { className: 'float-logo-f', depth: 10 },
  { className: 'float-logo-g', depth: 20 },
  { className: 'float-logo-h', depth: 14 },
]

function FloatingBrandBackground() {
  useEffect(() => {
    const media = window.matchMedia('(min-width: 821px) and (prefers-reduced-motion: no-preference)')
    if (!media.matches) return

    const items = document.querySelectorAll<HTMLElement>('.floating-logo')
    let frame = 0
    let pointerX = 0
    let pointerY = 0
    const move = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        items.forEach((item, index) => {
          const depth = floatingLogos[index]?.depth ?? 10
          item.style.translate = `${-pointerX * depth}px ${-pointerY * depth}px`
        })
        frame = 0
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      if (frame) window.cancelAnimationFrame(frame)
      items.forEach((item) => { item.style.translate = '' })
    }
  }, [])

  return (
    <>
      <div className="site-background" aria-hidden="true">
        <div className="ambient-trail ambient-trail-one" />
        <div className="ambient-trail ambient-trail-two" />
        <span className="background-particle particle-one" />
        <span className="background-particle particle-two" />
        <span className="background-particle particle-three" />
        <span className="background-particle particle-four" />
      </div>
      <div className="floating-logo-layer" aria-hidden="true">
        {floatingLogos.map((logo) => (
          <span className={`floating-logo ${logo.className}`} key={logo.className}>
            <img src={logoAsset} alt="" />
          </span>
        ))}
      </div>
    </>
  )
}

function useReducedMotionPreference() {
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReduceMotion(media.matches)
    media.addEventListener('change', updatePreference)
    return () => media.removeEventListener('change', updatePreference)
  }, [])

  return reduceMotion
}

function MetricCard({
  amount,
  suffix,
  prefix = '',
  label,
}: {
  amount: number
  suffix: string
  prefix?: string
  label: string
}) {
  const [count, setCount] = useState(0)
  const card = useRef<HTMLDivElement>(null)
  const hasStarted = useRef(false)
  const reduceMotion = useReducedMotionPreference()

  useEffect(() => {
    const element = card.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) return
        hasStarted.current = true
        if (reduceMotion) {
          setCount(amount)
          observer.disconnect()
          return
        }
        const start = performance.now()
        const duration = 1300
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1)
          const eased = 1 - (1 - progress) ** 3
          setCount(Math.round(amount * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
        observer.disconnect()
      },
      { threshold: 0.35 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [amount, reduceMotion])

  return (
    <div className="metric-card" ref={card}>
      <span className="metric-value">
        {prefix}
        {count}
        {suffix}
      </span>
      <span className="metric-label">{label}</span>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formStatus, setFormStatus] = useState('')
  const [formErrors, setFormErrors] = useState<ContactErrors>({})
  const [emailDraftUrl, setEmailDraftUrl] = useState('')
  const menuButton = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotionPreference()

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 24)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButton.current?.focus()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (reduceMotion || !('IntersectionObserver' in window)) return

    const revealElements = document.querySelectorAll<HTMLElement>('.reveal')
    if (revealElements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    revealElements.forEach((element) => observer.observe(element))
    document.documentElement.classList.add('has-scroll-reveals')

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('has-scroll-reveals')
    }
  }, [reduceMotion])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px' },
    )
    document.querySelectorAll<HTMLElement>('main section[id]').forEach((section) => {
      observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const enquiryType = String(data.get('enquiryType') ?? '').trim()
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const organization = String(data.get('organization') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    const errors: ContactErrors = {}
    if (!enquiryType) errors.enquiryType = 'Choose an enquiry type.'
    if (!name) errors.name = 'Enter your full name.'
    if (!email) errors.email = 'Enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Enter a valid email address.'
    }
    if (!phone) errors.phone = 'Enter a phone number.'
    else {
      const digitCount = phone.replace(/\D/g, '').length
      if (!/^[\d\s()+.-]+$/.test(phone) || digitCount < 7 || digitCount > 15) {
        errors.phone = 'Enter a valid phone number with 7–15 digits.'
      }
    }
    if (!message) errors.message = 'Enter a message.'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setFormStatus('')
      return
    }

    setFormErrors({})
    const subject = `${enquiryType} enquiry`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      organization ? `Company / institution: ${organization}` : '',
      '',
      message,
    ].filter(Boolean).join('\n')
    setEmailDraftUrl(`mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
    setFormStatus('Your draft is ready. Open it in your email application to send it; this website has not sent or stored the message.')
  }

  const closeMenu = () => setMenuOpen(false)
  const clearFormFieldError = (field: keyof ContactErrors) => {
    setFormErrors((current) => ({ ...current, [field]: undefined }))
    setFormStatus('')
    setEmailDraftUrl('')
  }

  return (
    <div className="site-shell">
      <FloatingBrandBackground />
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-is-open' : ''}`}>
        <a className="brand" href="#home" aria-label="Wyntrix home" onClick={closeMenu}>
          <img src={logoAsset} alt="" />
          <span>WYNTRIX<span className="brand-period">.</span></span>
        </a>

        <button
          type="button"
          className="menu-toggle"
          ref={menuButton}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className="main-nav" id="main-navigation" aria-label="Main navigation">
          {navigation.map(([label, id]) => (
            <a
              key={id}
              className={activeSection === id ? 'active' : ''}
              href={`#${id}`}
              onClick={closeMenu}
            >
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="#contact">
          Get in touch <ArrowUpRight size={15} />
        </a>
      </header>

      <main id="main">
        <section className="hero-section" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow hero-enter hero-enter-one">
              <span className="status-dot" /> IDEAS × INNOVATION × IMPACT
            </div>
            <h1 className="hero-enter hero-enter-two">
              BUILDING
              <br />
              TOMORROW
              <br />
              <span>TOGETHER</span>
            </h1>
            <p className="hero-subtitle hero-enter hero-enter-three">
              Powering college events, student outreach, business websites, and startup launches — everything you need, one place.
            </p>
            <div className="hero-actions hero-enter hero-enter-four">
              <a className="button button-primary" href="#services">
                Explore Our Services <ArrowRight size={17} />
              </a>
              <a className="button button-quiet" href={company.community} target="_blank" rel="noreferrer">
                Join Our Community <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="hero-proof">
              <div className="hero-mini-metric">
                <strong>15K+</strong><span>STUDENTS</span>
              </div>
              <div className="hero-mini-metric">
                <strong>100+</strong><span>CAMPAIGNS / EVENTS</span>
              </div>
              <div className="hero-mini-metric">
                <strong>50+</strong><span>INSTITUTIONS</span>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <div className="art-label art-label-top"><span>W / 01</span> IDEAS IN MOTION</div>
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <div className="hero-logo-stage">
              <span className="hero-logo-halo" />
              <span className="hero-logo-orbit hero-logo-orbit-a" />
              <span className="hero-logo-orbit hero-logo-orbit-b" />
              <img className="hero-brand-mark" src={logoAsset} alt="Wyntrix logo" />
            </div>
            <div className="art-crosshair" aria-hidden="true">+</div>
            <div className="art-label art-label-bottom"><span>15K+</span> IDEAS IN MOTION</div>
            <div className="art-spark spark-one" aria-hidden="true">✳</div>
            <div className="art-spark spark-two" aria-hidden="true">✳</div>
          </div>

          <div className="hero-bottom">
            <span className="hero-tagline">#FutureIsBuilt</span>
            <a href="#about" aria-label="Scroll to about Wyntrix" className="scroll-cue">
              <span>SCROLL TO EXPLORE</span><ArrowDown size={14} />
            </a>
            <span className="hero-location">CHENNAI · INDIA</span>
          </div>
        </section>

        <section className="intro-section section-pad" id="about">
          <div className="section-index reveal"><span>01</span> / THE WYNTRIX STORY</div>
          <div className="intro-layout">
            <div className="intro-heading reveal">
              <p className="eyebrow">BUILT BY STUDENTS, FOR CAMPUSES</p>
              <h2>Where strategy<br />meets <em>execution.</em></h2>
            </div>
            <div className="intro-copy reveal">
              <p>
                WYNTRIX is a digital marketing and event management startup led by emerging professionals — for emerging professionals. We are reshaping how campuses host, promote, and scale events across India.
              </p>
              <p>
                With 15,000+ members and partnerships with 50+ colleges, we serve startups, businesses, and institutions. We bridge emerging professionals, industry experts, and organizations through community networking and event solutions.
              </p>
              <a className="text-link" href="#team">Meet the people behind it <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="mission-band reveal">
            <div className="mission-mark"><Sparkles size={20} /></div>
            <span className="mission-label">OUR MISSION</span>
            <p>Empowering Students. <span>Elevating Events.</span> Expanding Networks.</p>
            <span className="mission-watermark">W</span>
          </div>
        </section>

        <section className="metrics-section section-pad" aria-label="Wyntrix impact">
          <div className="metrics-header reveal">
            <p className="eyebrow">MEASURABLE MOMENTUM</p>
            <p>Good ideas travel further<br />when people move together.</p>
          </div>
          <div className="metrics-grid">
            {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
          </div>
          <p className="metrics-note">Figures as published by Wyntrix on its official website.</p>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-heading reveal">
            <div>
              <div className="section-index"><span>02</span> / WHAT WE DO</div>
              <p className="eyebrow">OUR SERVICES</p>
              <h2>Built for campuses,<br /><em>startups & beyond.</em></h2>
            </div>
            <div className="section-heading-aside">
              <p>Powering college events, student outreach, business websites, and startup launches — everything you need, one place.</p>
              <a className="text-link" href="#contact">Let&apos;s build together <ArrowRight size={16} /></a>
            </div>
          </div>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <article className={`service-card reveal service-card-${index + 1}`} key={service.title}>
                  <div className="service-topline"><span>0{index + 1}</span><ArrowUpRight size={16} /></div>
                  <div className="service-icon"><Icon size={21} strokeWidth={1.6} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-bottom">
                    <span><span className="service-dot" />{service.tag}</span>
                    <a href="#contact" aria-label={`Enquire about ${service.title}`}><ArrowRight size={16} /></a>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="tech-list reveal">
            <div>
              <span className="eyebrow">TECH SOLUTIONS INCLUDE</span>
              <p>From first sketch to launch day.</p>
            </div>
            <ul>
              {techCapabilities.map((item) => <li key={item}><Check size={14} />{item}</li>)}
            </ul>
          </div>
          <div className="listed-service-areas reveal" aria-label="Other service categories listed by Wyntrix">
            <span className="eyebrow">SERVICE AREAS LISTED BY WYNTRIX</span>
            <div>
              {listedServiceAreas.map((area) => <span key={area}>{area}</span>)}
            </div>
          </div>
        </section>

        <section className="internship-section section-pad" id="internship">
          <div className="internship-card reveal">
            <div className="internship-visual" aria-hidden="true">
              <div className="internship-orbit orbit-a" />
              <div className="internship-orbit orbit-b" />
              <div className="internship-initial">W<span>+</span></div>
              <span className="internship-caption">YOUR NEXT CHAPTER</span>
            </div>
            <div className="internship-copy">
              <div className="section-index"><span>03</span> / GROW WITH US</div>
              <p className="eyebrow">INTERNSHIP & CAREERS</p>
              <h2>Make your<br /><em>move.</em></h2>
              <p className="internship-description">
                Want to contribute to campus communities, events, or digital growth? Reach out to Wyntrix to ask about current opportunities.
              </p>
              <p className="availability-note">The official site does not currently publish eligibility details or a working application form. Contact us to confirm availability.</p>
              <a className="button button-primary" href={`mailto:${company.email}?subject=${encodeURIComponent('Internship opportunities at Wyntrix')}`}>
                Ask about opportunities <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="collab-section section-pad" id="collaboration">
          <div className="collab-head reveal">
            <div>
              <div className="section-index"><span>04</span> / OUR NETWORK</div>
              <p className="eyebrow">COLLABORATION</p>
              <h2>Trusted by colleges<br />across <em>India.</em></h2>
            </div>
            <p>Wyntrix publishes these institutional and community logos on its official website.</p>
          </div>
          <div className="logo-marquee" aria-label="Institutions and communities listed by Wyntrix">
            <div className="logo-track">
              {[...partnerLogos, ...partnerLogos].map(([name, file], index) => (
                <div className="partner-logo" key={`${name}-${index}`} aria-hidden={index >= partnerLogos.length}>
                  <img
                    src={`https://www.wyntrix.in/_next/image?url=${encodeURIComponent(`/CLG LOGOS/${file}`)}&w=256&q=75`}
                    alt={index < partnerLogos.length ? name : ''}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="collab-cta reveal">
            <span>Have a campus or brand collaboration in mind?</span>
            <a className="text-link" href={`mailto:${company.email}?subject=${encodeURIComponent('Wyntrix collaboration enquiry')}`}>
              Start a conversation <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        <section className="team-section section-pad" id="team">
          <div className="team-heading reveal">
            <div className="section-index"><span>05</span> / THE PEOPLE</div>
            <p className="eyebrow">THE PEOPLE BEHIND WYNTRIX</p>
            <h2>A team that understands what campuses need,<br /><em>built from first-hand experience.</em></h2>
          </div>
          <div className="team-grid">
            {founders.map((founder, index) => (
              <article className={`team-card reveal ${founder.className}`} key={founder.name}>
                <div className="team-photo">
                  <img src={founder.image} alt={founder.name} loading="lazy" />
                  <span className="team-number">0{index + 1}</span>
                  <span className="team-photo-glow" aria-hidden="true" />
                </div>
                <div className="team-info">
                  <div><h3>{founder.name}</h3><p>{founder.role}</p></div>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
          <a className="team-cta text-link" href={`mailto:${company.email}?subject=${encodeURIComponent('Joining the Wyntrix team')}`}>
            Join our team <ArrowRight size={16} />
          </a>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-heading reveal">
            <div className="section-index"><span>06</span> / GET IN TOUCH</div>
            <p className="eyebrow">IDEAS × INNOVATION × IMPACT</p>
            <h2>Good things start<br />with <em>a hello.</em></h2>
            <p className="contact-intro">Whether you need event support, digital reach, or sponsorship strategy — we&apos;re ready when you are.</p>
            <div className="contact-links">
              <a href={`mailto:${company.email}`}><span className="contact-icon"><Mail size={17} /></span><span><small>EMAIL</small>{company.email}</span><ArrowUpRight size={15} /></a>
              <a href="tel:+916381635513"><span className="contact-icon"><Phone size={17} /></span><span><small>PHONE</small>{company.phone}</span><ArrowUpRight size={15} /></a>
              <a href={company.map} target="_blank" rel="noreferrer"><span className="contact-icon"><MapPin size={17} /></span><span><small>LOCATION</small>Chennai, Tamil Nadu, India</span><ArrowUpRight size={15} /></a>
            </div>
          </div>
          <form className="contact-form reveal" onSubmit={handleContactSubmit} noValidate>
            <div className="form-top">
              <span className="form-label">SEND AN ENQUIRY</span>
              <Send size={17} />
            </div>
            <label>
              Enquiry type
              <select
                name="enquiryType"
                defaultValue=""
                required
                aria-invalid={Boolean(formErrors.enquiryType)}
                aria-describedby={formErrors.enquiryType ? 'enquiry-type-error' : undefined}
                onChange={() => clearFormFieldError('enquiryType')}
              >
                <option value="" disabled>Select an enquiry</option>
                <option>Services</option>
                <option>Internship / careers</option>
                <option>Collaboration</option>
                <option>Other</option>
              </select>
              {formErrors.enquiryType && <span className="form-field-error" id="enquiry-type-error" role="alert">{formErrors.enquiryType}</span>}
            </label>
            <label>
              Full name
              <input
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
                aria-invalid={Boolean(formErrors.name)}
                aria-describedby={formErrors.name ? 'contact-name-error' : undefined}
                onChange={() => clearFormFieldError('name')}
              />
              {formErrors.name && <span className="form-field-error" id="contact-name-error" role="alert">{formErrors.name}</span>}
            </label>
            <label>
              Email
              <input
                name="email"
                autoComplete="email"
                type="email"
                placeholder="you@example.com"
                required
                aria-invalid={Boolean(formErrors.email)}
                aria-describedby={formErrors.email ? 'contact-email-error' : undefined}
                onChange={() => clearFormFieldError('email')}
              />
              {formErrors.email && <span className="form-field-error" id="contact-email-error" role="alert">{formErrors.email}</span>}
            </label>
            <label>
              Phone
              <input
                name="phone"
                autoComplete="tel"
                type="tel"
                placeholder="+91"
                required
                aria-invalid={Boolean(formErrors.phone)}
                aria-describedby={formErrors.phone ? 'contact-phone-error' : undefined}
                onChange={() => clearFormFieldError('phone')}
              />
              {formErrors.phone && <span className="form-field-error" id="contact-phone-error" role="alert">{formErrors.phone}</span>}
            </label>
            <label>
              Company / institution <span className="optional-label">OPTIONAL</span>
              <input name="organization" autoComplete="organization" placeholder="Organization name" />
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us a little about your enquiry..."
                required
                aria-invalid={Boolean(formErrors.message)}
                aria-describedby={formErrors.message ? 'contact-message-error' : undefined}
                onChange={() => clearFormFieldError('message')}
              />
              {formErrors.message && <span className="form-field-error" id="contact-message-error" role="alert">{formErrors.message}</span>}
            </label>
            {formStatus && <p className="form-feedback form-success" role="status">{formStatus}</p>}
            {emailDraftUrl && (
              <a className="button button-primary submit-button draft-link" href={emailDraftUrl}>
                Open email draft <ArrowUpRight size={16} />
              </a>
            )}
            <button className="button button-primary submit-button" type="submit" disabled={Boolean(emailDraftUrl)}>
              {emailDraftUrl ? 'Draft prepared' : 'Prepare email draft'} <ArrowUpRight size={16} />
            </button>
            <p className="form-disclaimer">This form opens your email app. It does not submit or store data on this website.</p>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#home">
              <img src={logoAsset} alt="" />
              <span>WYNTRIX<span className="brand-period">.</span></span>
            </a>
            <p>National-Level Digital Marketing & IT Solutions Company. Empowering students, elevating events.</p>
            <div className="social-links">
              <a href={company.instagram} target="_blank" rel="noreferrer" aria-label="Wyntrix on Instagram"><span className="social-glyph">ig</span></a>
              <a href={company.linkedin} target="_blank" rel="noreferrer" aria-label="Wyntrix on LinkedIn"><span className="social-glyph">in</span></a>
              <a href={company.footerCommunity} target="_blank" rel="noreferrer" aria-label="Join the Wyntrix WhatsApp community"><Phone size={17} /></a>
            </div>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            {navigation.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </div>
          <div className="footer-column">
            <h3>Connect</h3>
            <a href={company.map} target="_blank" rel="noreferrer">Chennai, Tamil Nadu, India</a>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href="tel:+916381635513">{company.phone}</a>
          </div>
          <a className="back-top" href="#home" aria-label="Back to top"><ArrowUpRight size={19} /></a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {company.name}. All rights reserved.</span>
          <span>Built for what&apos;s next. <b>#FutureIsBuilt</b></span>
        </div>
      </footer>
    </div>
  )
}

export default App
