import { useEffect, useState } from 'react'
import {
  ArrowRight,
  CaretRight,
  List,
  LockSimple,
  X,
  ArrowUpRight,
  Buildings,
  ChatsCircle,
  CheckCircle,
  Desktop,
  EnvelopeSimple,
  Exam,
  GraduationCap,
  IdentificationCard,
  MapPin,
  Microphone,
  ShieldCheck,
  Translate,
  UserFocus,
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

const PRODUCTS = [
  {
    name: 'Kestwin',
    for: 'For job seekers',
    url: 'https://kestwin.com',
    host: 'kestwin.com',
    img: '/shots/kestwin.jpg',
    alt: 'Kestwin home page',
    text: 'Practise interviews out loud with an AI interviewer, see the questions a company asks, and build a resume that passes ATS checks.',
    points: ['AI voice mock interviews', 'Resume builder and ATS check', 'Interview prep plans by role'],
  },
  {
    name: 'Kestwin Hire',
    for: 'For companies and colleges',
    url: 'https://hire.kestwin.com',
    host: 'hire.kestwin.com',
    img: '/shots/hire.jpg',
    alt: 'Kestwin Hire sign in page',
    text: 'Run first round interviews with AI, any time of day. Every candidate or student gets the same fair interview and you get a clear report.',
    points: ['Live AI voice interviews', 'Face, screen and app checks', 'A report after every interview'],
  },
]

function Products() {
  return (
    <section className="section" id="products">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="eyebrow caption-3">Our products</p>
          <h2 className="heading-2">One platform, from first practice to final offer</h2>
        </div>
        <div className="products">
          {PRODUCTS.map((p) => (
            <article key={p.name} className="product reveal">
              <a href={p.url} className="product__img" target="_blank" rel="noopener">
                <img src={p.img} alt={p.alt} loading="lazy" />
              </a>
              <div className="product__body">
                <p className="caption-3 product__for">{p.for}</p>
                <h3 className="heading-5">{p.name}</h3>
                <p className="body-6 muted">{p.text}</p>
                <ul>
                  {p.points.map((t) => (
                    <li key={t} className="body-5">
                      <CheckCircle size={18} weight="fill" /> {t}
                    </li>
                  ))}
                </ul>
                <a href={p.url} className="link body-5" target="_blank" rel="noopener">
                  {p.host} <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="apps reveal">
          <div className="apps__icon">
            <Desktop size={24} />
          </div>
          <div>
            <h3 className="title-2">Kestwin apps</h3>
            <p className="body-6 muted">
              A desktop app for Mac and Windows for proctored interviews, and an Android app for practice on the go.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

const APPROACH = [
  {
    icon: Microphone,
    title: 'Practice that feels real',
    text: 'Our AI interviewer listens and replies by voice, so people practise the way they will be interviewed.',
  },
  {
    icon: Translate,
    title: 'Made for India',
    text: 'Interviews in English and 11 Indian languages, with prices that students can afford.',
  },
  {
    icon: UserFocus,
    title: 'Honest AI',
    text: 'Our resume tools never invent jobs, projects or numbers. They only improve what a person has really done.',
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
          <h2 className="heading-2">Useful, honest and built for the people who use it</h2>
        </div>
        <ul className="benefits">
          {APPROACH.map(({ icon: Icon, title, text }) => (
            <li key={title} className="benefit reveal">
              <span className="benefit__icon">
                <Icon size={24} />
              </span>
              <h3 className="title-2">{title}</h3>
              <p className="body-6 muted">{text}</p>
            </li>
          ))}
        </ul>
        <div className="who reveal">
          <span className="who__item body-5">
            <GraduationCap size={20} /> Students and freshers
          </span>
          <span className="who__item body-5">
            <Exam size={20} /> Working people changing jobs
          </span>
          <span className="who__item body-5">
            <Buildings size={20} /> Companies hiring
          </span>
          <span className="who__item body-5">
            <ChatsCircle size={20} /> Colleges and training institutes
          </span>
        </div>
      </div>
    </section>
  )
}

function Company() {
  const rows: [string, React.ReactNode][] = [
    ['Legal name', COMPANY.legalName],
    ...(COMPANY.cin ? ([['CIN', <span className="tabular">{COMPANY.cin}</span>]] as [string, React.ReactNode][]) : []),
    ['Type', 'Private limited company, registered in India'],
    ['Registered office', COMPANY.address.join(', ')],
    ['Email', <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>],
    ['Website', COMPANY.website],
    ['Brand', 'Kestwin (kestwin.com)'],
  ]
  return (
    <section className="section" id="company">
      <div className="wrap company">
        <div className="reveal">
          <p className="eyebrow caption-3">Company</p>
          <h2 className="heading-2">About {COMPANY.shortName}</h2>
          <p className="body-3 muted company__text">
            {COMPANY.legalName} is a software company based in Telangana, India. We design, build and run Kestwin, our
            interview and hiring platform, end to end: the product, the AI and the servers it runs on.
          </p>
          <h3 className="title-2 people__title">Leadership</h3>
          <ul className="people">
            {PEOPLE.map((p) => (
              <li key={p.name} className="person">
                <span className="person__avatar title-3" aria-hidden="true">
                  {p.initials}
                </span>
                <span>
                  <span className="title-3 person__name">{p.name}</span>
                  <span className="body-6 muted">{p.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="facts reveal">
          <div className="facts__head">
            <IdentificationCard size={22} />
            <h3 className="title-2">Company details</h3>
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
