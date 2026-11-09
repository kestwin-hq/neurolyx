import { useEffect, useState } from 'react'
import {
  ArrowRight,
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
  Phone,
  ShieldCheck,
  Translate,
  UserFocus,
} from '@phosphor-icons/react'
import { COMPANY, PEOPLE, mapsHref, telHref } from './company'
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
  const [open, setOpen] = useState(false)
  const active = useActiveSection(IDS)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <header className="nav">
        <a href="#top" aria-label="Neurolyx Technologies home">
          <Logo />
        </a>
        <nav aria-label="Primary" className="nav__links">
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="title-4" aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn--primary button-sm nav__cta">
          Contact us
        </a>
        <button
          type="button"
          className={`nav__toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </header>
      <div id="menu" className={`menu ${open ? 'is-open' : ''}`} inert={!open}>
        <nav aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="heading-4"
              style={{ transitionDelay: `${i * 60}ms` }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero__copy">
        <span className="badge caption-4">Software company · Telangana, India</span>
        <h1 className="heading-1 hero__title">We build software that helps people get hired</h1>
        <p className="body-3 hero__sub">
          {COMPANY.legalName} makes Kestwin: AI mock interviews, resume tools and live AI interviews for job seekers,
          companies and colleges.
        </p>
        <div className="hero__action">
          <a href="#products" className="btn btn--primary button-md">
            See our products <ArrowRight size={18} weight="bold" />
          </a>
          <span className="hero__proof body-5">
            <CheckCircle size={18} weight="fill" /> Kestwin is used by 16,000+ job seekers
          </span>
        </div>
      </div>
      <div className="wrap wrap--wide">
        <figure className="shot reveal">
          <div className="shot__bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="caption-5">kestwin.com</span>
          </div>
          <img src="/shots/kestwin.jpg" alt="The Kestwin home page, with an AI voice interview in progress" />
        </figure>
      </div>
    </section>
  )
}

const NUMBERS = [
  { n: '16,000+', l: 'Job seekers on Kestwin' },
  { n: '13,000+', l: 'Interview questions in our bank' },
  { n: '90+', l: 'Skills covered, from Java to SAP' },
  { n: '12', l: 'Languages for voice interviews' },
]

function Numbers() {
  return (
    <section className="numbers" aria-label="Kestwin in numbers">
      <div className="wrap">
        <dl className="numbers__grid reveal">
          {NUMBERS.map((x) => (
            <div key={x.l}>
              <dt className="body-6">{x.l}</dt>
              <dd className="heading-4 tabular">{x.n}</dd>
            </div>
          ))}
        </dl>
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
    ['Phone', <a href={telHref(COMPANY.phone)}>{COMPANY.phone}</a>],
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
          <a className="contact__card" href={telHref(COMPANY.phone)}>
            <span className="benefit__icon">
              <Phone size={24} />
            </span>
            <span className="caption-3 muted">Phone</span>
            <span className="title-3 tabular">{COMPANY.phone}</span>
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
        <Numbers />
        <Products />
        <Approach />
        <Company />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
