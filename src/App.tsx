import { useEffect, useState } from 'react'
import {
  Sparkle,
  Translate,
  UserFocus,
  ArrowRight,
  Target,
  CaretRight,
  Check,
  Copy,
  List,
  LockSimple,
  X,
  ArrowUpRight,
  Buildings,
  Desktop,
  EnvelopeSimple,
  IdentificationCard,
  MapPin,
  ShieldCheck,
} from '@phosphor-icons/react'
import { COMPANY, PEOPLE, mapsHref } from './company'
import { useActiveSection, useReveals } from './hooks'

const LINKS = [
  { id: 'products', label: 'Products' },
  { id: 'approach', label: 'How we work' },
  { id: 'company', label: 'Company' },
  { id: 'contact', label: 'Contact' },
]
const IDS = LINKS.map((l) => l.id)
const YEAR = new Date().getFullYear()

function Logo() {
  return (
    <span className="logo">
      <svg viewBox="0 0 64 64" aria-hidden="true" className="logo__mark">
        <rect width="64" height="64" rx="16" />
        <path d="M19 46V18h6l14 18V18h6v28h-6L25 28v18z" />
      </svg>
      <span className="logo__word">
        <span className="title-3">Neurolyx</span>
        <span className="caption-6">Technologies</span>
      </span>
    </span>
  )
}

function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(IDS)

  // the header gains a hairline once the page moves
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`top ${solid ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <div className="top__inner">
        <a href="#top" aria-label="Neurolyx Technologies home">
          <Logo />
        </a>
        <nav aria-label="Primary" className="top__links">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="top__actions">
          <a href="#contact" className="btn btn--primary btn--sm">
            Contact us
          </a>
          <button
            type="button"
            className="top__toggle"
            aria-expanded={open}
            aria-controls="top-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>
      <nav id="top-menu" aria-label="Mobile" className="top__menu" hidden={!open}>
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={() => setOpen(false)}>
            {l.label} <CaretRight size={18} />
          </a>
        ))}
        <a href={`mailto:${COMPANY.email}`} className="top__menu-call">
          <EnvelopeSimple size={18} weight="bold" /> {COMPANY.email}
        </a>
      </nav>
    </header>
  )
}

// the hero picture cycles through real product screens, like the chapters of the EdPlus v2 film
const SLIDES = [
  { url: 'kestwin.com', img: '/shots/kestwin.jpg', title: 'AI mock interviews', text: 'Practise out loud with an AI interviewer' },
  { url: 'kestwin.com/templates', img: '/shots/resume.jpg', title: 'Resume builder', text: 'Templates and an ATS check' },
  { url: 'hire.kestwin.com', img: '/shots/hire.jpg', title: 'Kestwin Hire', text: 'AI interviews for companies and colleges' },
]
const SLIDE_MS = 6000

const STATS = [
  { n: '16,000+', l: 'Job seekers' },
  { n: '13,000+', l: 'Interview questions' },
  { n: '90+', l: 'Skills covered' },
  { n: '12', l: 'Languages' },
]

function Hero() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = window.setTimeout(() => setI((n) => (n + 1) % SLIDES.length), SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [i, paused])

  const s = SLIDES[i]
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__inner">
        <div className="hero__copy">
          <span className="hero__eyebrow">
            <span className="hero__dot" aria-hidden="true" />
            Software company · Telangana, India
          </span>
          <h1>
            Software that helps
            <em>people get hired.</em>
          </h1>
          <p className="hero__sub">
            We make Kestwin, the AI platform for interview practice, resumes and hiring. Built for job seekers,
            companies and colleges across India.
          </p>
          <div className="hero__ctas">
            <a href="#products" className="btn btn--primary">
              See our products <ArrowRight size={18} weight="bold" />
            </a>
            <a href="#company" className="btn btn--ghost">
              <Buildings size={18} weight="bold" /> Company details
            </a>
          </div>
          <p className="hero__trust">
            <ShieldCheck size={18} weight="bold" /> Registered in India · CIN <span className="tabular">{COMPANY.cin}</span>
          </p>
          <dl className="hero__stats">
            {STATS.map((x) => (
              <div key={x.l}>
                <dt>{x.l}</dt>
                <dd className="tabular">{x.n}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="hero__view" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="window">
            <div className="window__bar" aria-hidden="true">
              <span className="window__dots">
                <i />
                <i />
                <i />
              </span>
              <span className="window__url">
                <LockSimple size={12} weight="bold" />
                <span key={i}>{s.url}</span>
              </span>
            </div>
            <div className="window__screen">
              {SLIDES.map((x, n) => (
                <img
                  key={x.img}
                  src={x.img}
                  alt={n === i ? `${x.title} on ${x.url}` : ''}
                  className={`window__img ${n === i ? 'is-on' : ''}`}
                  loading={n === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          </div>
          <ul className="tabs" style={{ ['--slide' as string]: `${SLIDE_MS}ms` }}>
            {SLIDES.map((x, n) => (
              <li key={x.url}>
                <button type="button" className={n === i ? 'is-on' : ''} aria-pressed={n === i} onClick={() => setI(n)}>
                  <span className="tabs__bar">
                    <span key={`${i}-${paused}`} className={paused ? 'is-paused' : ''} />
                  </span>
                  <span className="tabs__title">{x.title}</span>
                  <span className="tabs__text">{x.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// every product the company makes; Kestwin is the first, with room for more
const PRODUCTS = [
  {
    name: 'Kestwin',
    status: 'Live',
    text: 'Interview practice with AI, prep plans and resume tools for job seekers.',
    href: 'https://kestwin.com',
    link: 'kestwin.com',
    img: '/shots/kestwin.jpg',
  },
  {
    name: 'Kestwin Hire',
    status: 'Live',
    text: 'AI first round interviews and clear reports for companies and colleges.',
    href: 'https://hire.kestwin.com',
    link: 'hire.kestwin.com',
    img: '/shots/hire.jpg',
  },
  {
    name: 'Kestwin desktop',
    status: 'Live',
    text: 'A desktop app for Mac and Windows, for practice and proctored interviews.',
    href: 'https://kestwin.com/download',
    link: 'Download',
    icon: Desktop,
  },
  {
    name: 'More on the way',
    status: 'Building',
    text: 'New products for learning and work. Write to us to hear about them first.',
    href: '#contact',
    link: 'Contact us',
    icon: Sparkle,
  },
]

function Products() {
  return (
    <section className="section" id="products">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow caption-3">Our products</p>
          <h2 className="heading-2">What we build</h2>
        </div>
        <ul className="products">
          {PRODUCTS.map((p) => {
            const Icon = p.icon
            const external = p.href.startsWith('http')
            return (
              <li key={p.name} className="reveal">
                <a href={p.href} className="product" {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
                  <span className="product__media">
                    {p.img ? <img src={p.img} alt="" loading="lazy" /> : Icon && <Icon size={40} />}
                  </span>
                  <span className="product__body">
                    <span className="product__top">
                      <span className="card-title">{p.name}</span>
                      <span className={`product__status caption-4 ${p.status === 'Live' ? 'is-live' : ''}`}>{p.status}</span>
                    </span>
                    <span className="body-6 muted">{p.text}</span>
                    <span className="product__link body-5">
                      {p.link} {external ? <ArrowUpRight size={16} weight="bold" /> : <ArrowRight size={16} weight="bold" />}
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

const APPROACH = [
  {
    icon: Target,
    title: 'Real problems first',
    text: 'We start from problems people face every day, like getting ready for an interview or hiring fairly.',
  },
  {
    icon: Translate,
    title: 'Made for India',
    text: 'Products that work in Indian languages, at prices students and small teams can afford.',
  },
  {
    icon: UserFocus,
    title: 'Honest AI',
    text: 'Our AI helps people do their best work. It never makes up facts about them.',
  },
  {
    icon: ShieldCheck,
    title: 'Privacy first',
    text: 'We follow India’s data protection law and ask before using analytics.',
  },
]

function Approach() {
  return (
    <section className="section section--tint" id="approach">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow caption-3">How we work</p>
          <h2 className="heading-2">Simple, honest and useful</h2>
        </div>
        <ul className="benefits">
          {APPROACH.map(({ icon: Icon, title, text }, n) => (
            <li key={title} className="benefit reveal">
              <span className="benefit__top">
                <span className="benefit__icon">
                  <Icon size={24} weight="duotone" />
                </span>
                <span className="benefit__n caption-3 tabular">0{n + 1}</span>
              </span>
              <h3 className="card-title">{title}</h3>
              <p className="body-6 muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function CopyCin() {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY.cin)
      setDone(true)
      window.setTimeout(() => setDone(false), 1600)
    } catch {
      /* clipboard blocked: the number is still on screen to select */
    }
  }
  return (
    <button type="button" className="copy caption-4" onClick={copy} aria-label="Copy CIN">
      {done ? <Check size={14} weight="bold" /> : <Copy size={14} />}
      {done ? 'Copied' : 'Copy'}
    </button>
  )
}

const KEY_FACTS = [
  { n: '2026', l: 'Founded' },
  { n: '2', l: 'Live products' },
  { n: 'Telangana', l: 'India' },
]

function Company() {
  const rows: [string, React.ReactNode][] = [
    ['Legal name', COMPANY.legalName],
    [
      'CIN',
      <span className="facts__cin">
        <span className="tabular">{COMPANY.cin}</span>
        <CopyCin />
      </span>,
    ],
    ['Type', 'Private limited company'],
    ['Registered office', COMPANY.address.join(', ')],
    ['Email', <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>],
    ['Products', 'Kestwin, Kestwin Hire'],
  ]
  return (
    <section className="section" id="company">
      <div className="wrap company">
        <div className="company__left reveal">
          <p className="eyebrow caption-3">Company</p>
          <h2 className="heading-2">Who we are</h2>
          <p className="body-3 muted company__text">
            {COMPANY.legalName} is a software company based in Telangana, India. We design, build and run our own
            products, end to end. Kestwin, our interview and hiring platform, is the first of them.
          </p>
          <dl className="keyfacts">
            {KEY_FACTS.map((f) => (
              <div key={f.l}>
                <dt>{f.l}</dt>
                <dd className="tabular">{f.n}</dd>
              </div>
            ))}
          </dl>
          <p className="caption-3 people__title">Leadership</p>
          <ul className="people">
            {PEOPLE.map((p) => (
              <li key={p.name} className="person">
                <span className="person__avatar" aria-hidden="true">
                  {p.initials}
                </span>
                <span>
                  <span className="card-title person__name">{p.name}</span>
                  <span className="body-6 muted">
                    {p.role}, {COMPANY.shortName}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="facts reveal">
          <div className="facts__head">
            <span className="benefit__icon facts__icon">
              <IdentificationCard size={22} weight="duotone" />
            </span>
            <span>
              <h3 className="card-title">Company details</h3>
              <span className="caption-2 muted">Registered with the Ministry of Corporate Affairs</span>
            </span>
          </div>
          <dl>
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="body-6">{k}</dt>
                <dd className="body-5">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section className="section section--tint" id="contact">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow caption-3">Contact</p>
          <h2 className="heading-2">Talk to us</h2>
          <p className="body-3 muted contact__sub">
            Questions about Kestwin, partnerships, or using Kestwin at your company or college.
          </p>
        </div>
        <div className="contact reveal">
          <a className="contact__card" href={`mailto:${COMPANY.email}`}>
            <span className="benefit__icon">
              <EnvelopeSimple size={24} />
            </span>
            <span className="caption-3 muted">Email</span>
            <span className="title-3">{COMPANY.email}</span>
          </a>
          <a className="contact__card" href={mapsHref} target="_blank" rel="noopener">
            <span className="benefit__icon">
              <MapPin size={24} />
            </span>
            <span className="caption-3 muted">Registered office</span>
            <span className="title-4">
              {COMPANY.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Logo />
            <p className="body-6 footer__line">
              {COMPANY.legalName}
              {COMPANY.cin && (
                <>
                  <br />
                  CIN <span className="tabular">{COMPANY.cin}</span>
                </>
              )}
              <br />
              {COMPANY.address.join(', ')}
            </p>
          </div>
          <ul className="footer__links">
            <li>
              <a href="https://kestwin.com" className="body-5">
                Kestwin
              </a>
            </li>
            <li>
              <a href="https://hire.kestwin.com" className="body-5">
                Kestwin Hire
              </a>
            </li>
            <li>
              <a href="https://kestwin.com/privacy" className="body-5">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="https://kestwin.com/terms" className="body-5">
                Terms of service
              </a>
            </li>
            <li>
              <a href="https://kestwin.com/refund" className="body-5">
                Refund policy
              </a>
            </li>
          </ul>
        </div>
        <p className="caption-5 footer__fine">
          © {YEAR} {COMPANY.legalName}. Kestwin is a brand of {COMPANY.legalName}.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  useReveals()
  return (
    <>
      <a href="#main" className="skip body-5">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Products />
        <Approach />
        <Company />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
