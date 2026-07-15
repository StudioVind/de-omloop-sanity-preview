import {sanityFetch} from '@/sanity/live'
import {SITE_PAGE_QUERY} from '@/sanity/queries'

type Service = {_key?: string; title?: string; description?: string; pricePrefix?: string; price?: string}

const fallbackServices: Service[] = [
  {title: 'Even fiksen', description: 'Band, rem, licht of ketting. Kleine reparaties, snel geregeld.', pricePrefix: 'vanaf', price: '€ 15'},
  {title: 'Grote beurt', description: 'Alles nagelopen, afgesteld, gesmeerd en weer klaar voor kilometers.', pricePrefix: 'vanaf', price: '€ 89'},
  {title: 'Eigen bouw', description: 'Samen stellen we een fiets samen die precies past bij hoe jij rijdt.', pricePrefix: 'op', price: 'aanvraag'},
]

const lines = (value?: string | null) => (value || '').split('\n').map((line, index) => <span key={`${line}-${index}`}>{line}{index < (value || '').split('\n').length - 1 && <br />}</span>)

export default async function HomePage() {
  const {data} = await sanityFetch({query: SITE_PAGE_QUERY})
  // Schema-derived TypeScript types can be added later; the deployed schema is
  // the source of truth for this small proof of concept.
  const page = data as any
  const services = (page?.workshop?.services?.length ? page.workshop.services : fallbackServices) as Service[]
  const heroImage = page?.hero?.image?.asset?.url

  return (
    <>
      <a className="skip" href="#main">Ga naar de inhoud</a>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="De Omloop, naar boven"><span className="brand-wheel" aria-hidden="true" />DE OMLOOP</a>
        <nav aria-label="Hoofdnavigatie"><a href="#werkplaats">Werkplaats</a><a href="#ritten">Ritten</a><a href="#over">Ons verhaal</a></nav>
        <a className="pill pill-dark" href="#boeken">Plan onderhoud <span>↗</span></a>
      </header>
      <main id="main">
        <section className="hero hero-illustrated" id="top">
          {heroImage && <img className="hero-photo" src={`${heroImage}?auto=format&w=1800&q=85`} alt={page?.hero?.image?.alt || ''} />}
          <div className="hero-wash" />
          <div className="hero-copy">
            <p className="eyebrow">{page?.hero?.eyebrow || 'FIETSENWERKPLAATS + CLUB · NIJMEGEN'}</p>
            <h1 aria-label={`${page?.hero?.titleLine1 || 'DE'} ${page?.hero?.titleLine2 || 'OMLOOP'}`}><span className="hero-line">{page?.hero?.titleLine1 || 'DE'}</span><span className="hero-line line-two">{page?.hero?.titleLine2 || 'OMLOOP'}</span></h1>
            <div className="hero-bottom"><p>{page?.hero?.text || 'Voor fietsen die verder willen. Onderhoud, reparatie en ritten vanuit onze werkplaats in Nijmegen-Oost.'}</p><a className="pill pill-yellow" href="#werkplaats">Bekijk de werkplaats <span>↓</span></a></div>
          </div>
          <div className="sun-sticker"><span>OPEN WERKPLAATS · FIETS & VERDER · </span><b>☀</b></div>
          <div className="hero-status"><i />Vandaag open tot 18:00</div>
        </section>
        <div className="ticker"><div className="ticker-track"><span>LEKKER BLIJVEN DRAAIEN ✦ BANDEN OP SPANNING ✦ KOFFIE STAAT KLAAR ✦ NIJMEGEN OP TWEE WIELEN ✦ </span><span>LEKKER BLIJVEN DRAAIEN ✦ BANDEN OP SPANNING ✦ KOFFIE STAAT KLAAR ✦ NIJMEGEN OP TWEE WIELEN ✦ </span></div></div>
        <section className="intro" id="over">
          <div className="route-line"><span>→</span></div><p className="section-label">{page?.introduction?.label}</p>
          <h2>{page?.introduction?.title}<br /><em>{page?.introduction?.emphasis}</em></h2>
          <div className="intro-grid"><p className="big-copy">{page?.introduction?.text}</p><div className="note-card"><span className="tape" /><strong>{page?.introduction?.noteTitle}</strong><p>{page?.introduction?.noteText}</p><span className="scribble">↳ echt waar!</span></div></div>
        </section>
        <section className="services" id="werkplaats">
          <div className="services-head"><div><p className="section-label">{page?.workshop?.label}</p><h2>{page?.workshop?.title}</h2></div><p>{page?.workshop?.text}</p></div>
          <div className="service-grid">{services.slice(0, 3).map((service, index) => <article className={`service-card ${['card-blue','card-yellow','card-red'][index]}`} key={service._key || index}><div className="service-no">0{index + 1}</div>{index === 0 ? <div className="wheel-icon"><i /></div> : <div className="tool-icon">{index === 1 ? '✣' : '✦'}</div>}<h3>{service.title}</h3><p>{service.description}</p><div className="service-price"><span>{service.pricePrefix}</span> {service.price}</div></article>)}</div>
        </section>
        <section className="rides" id="ritten">
          <div className="rides-copy"><p className="section-label">{page?.ride?.label}</p><h2>{page?.ride?.title}</h2><p>{page?.ride?.text}</p><div className="ride-meta"><div><span>VOLGENDE RIT</span><strong>{page?.ride?.date}</strong></div><div><span>AFSTAND</span><strong>{page?.ride?.distance}</strong></div><div><span>HOOGTEMETERS</span><strong>{page?.ride?.elevation}</strong></div></div><a className="pill pill-cream" href="#boeken">Ik fiets mee <span>↗</span></a></div>
          <div className="map-card"><div className="map-grid" /><svg viewBox="0 0 600 600" role="img" aria-label="Ronde fietsroute vanuit Nijmegen"><path className="route-shadow" d="M115 420C70 300 145 145 275 130C430 110 520 210 490 335C465 440 355 500 240 470C170 452 160 405 115 420Z"/><path className="route-path" d="M115 420C70 300 145 145 275 130C430 110 520 210 490 335C465 440 355 500 240 470C170 452 160 405 115 420Z"/><circle cx="115" cy="420" r="13" className="map-dot"/></svg><span className="map-place p1">NIJMEGEN</span><span className="map-place p2">BEEK</span><span className="map-place p3">OOIJ</span><div className="map-badge">GEEN KOERS<br/><strong>WEL LEKKER</strong></div></div>
        </section>
        <section className="booking" id="boeken"><div className="booking-mark">O</div><div className="booking-copy"><p className="section-label">{page?.booking?.label}</p><h2>{page?.booking?.title}</h2><p>{page?.booking?.text}</p></div><form className="booking-form"><label>Naam<input type="text" placeholder="Hoe heet je?" /></label><label>E-mail<input type="email" placeholder="jij@voorbeeld.nl" /></label><label>Wat is er aan de hand?<textarea rows={3} placeholder="Mijn fiets kraakt als…" /></label><button className="pill pill-dark" type="button">Verstuur aanvraag <span>↗</span></button></form></section>
      </main>
      <footer><div className="footer-top"><a className="footer-brand" href="#top">DE OMLOOP<span>●</span></a><p>Fietsenwerkplaats en club<br/>in Nijmegen-Oost.</p></div><div className="footer-grid"><div><span>BEZOEK</span><p>{lines(page?.contact?.address)}</p></div><div><span>OPEN</span><p>{lines(page?.contact?.openingHours)}</p></div><div><span>VOLG</span><p><a href="#">Instagram</a><br/><a href="#">Strava</a></p></div><div><span>ZEG HALLO</span><p><a href={`mailto:${page?.contact?.email || ''}`}>{page?.contact?.email}</a><br/>{page?.contact?.phone}</p></div></div><div className="footer-bottom"><span>© 2026 DE OMLOOP</span><span>FIETS & VERDER</span></div></footer>
    </>
  )
}
