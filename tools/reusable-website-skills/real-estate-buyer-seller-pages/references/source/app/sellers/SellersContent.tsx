'use client';
import { useState, type CSSProperties } from 'react';
import Testimonials from '../../components/Testimonials';

const consultation = 'https://calendly.com/davidpruitt/';
const factors = [
  ['A personal partnership', 'Your goals set the direction.', 'Moving closer to family, making room for what’s next, or selling an investment? We start with your priorities and build a plan around your timing.'],
  ['Thoughtful preparation', 'Make the first impression count.', 'We walk your home with you, identify the improvements worth considering, and help you prioritize the work before photography and showings.'],
  ['Purposeful exposure', 'Put your home in the right places.', 'A coordinated launch brings together photography, listing details, online reach and agent outreach, with a showing plan that works for you.'],
  ['Financial clarity', 'Know what the numbers mean.', 'Understand comparable sales, your pricing options and estimated proceeds before making a decision. We compare offers beyond the headline price.'],
  ['Steady advocacy', 'An experienced voice in your corner.', 'From the first offer through inspection discussions and closing details, we explain your options and help you negotiate with your priorities in mind.'],
  ['Local market insight', 'A strategy grounded in your neighborhood.', 'A Peoria home and a central Phoenix condo compete in different markets. We look at nearby sales, current competition and buyer feedback to guide your next move.'],
];
const guidance = [
  ['Your plan', 'One agent guiding you. A team behind you.', 'Know who to call and what happens next. Your agent connects the details—from your initial walk-through to the handoff at closing.', 'A conversation about your goals'],
  ['Your calendar', 'A timeline that fits your life.', 'Together, we map preparation, photography, launch and showings around your move. As offers come in, we help you understand the deadlines ahead.', 'Your sale, mapped out'],
  ['Your presentation', 'Your home’s best features, clearly told.', 'We shape the story around what makes your property special: its layout, outdoor living, natural light and location. You’ll understand the plan before launch.', 'Photography & property presentation'],
  ['Your feedback', 'Useful updates. Clear next steps.', 'We bring showing feedback and market activity into the conversation. If buyers are hesitating, we discuss whether presentation, access or price needs attention.', 'Showing feedback & market updates'],
  ['Your offers', 'The whole offer, side by side.', 'Price matters. So do financing, contingencies, requested credits and closing dates. We help you weigh the tradeoffs and choose the path that suits you.', 'Offer review & closing coordination'],
];
export default function SellersContent() {
  const [factor, setFactor] = useState(0);
  const [guide, setGuide] = useState(0);
  const [reveal, setReveal] = useState(50);
  return <main className="sellers-main">
    <section className="seller-hero"><div><p className="seller-eyebrow">SELL WITH THE PRUITT TEAM</p><h1>A home full of memories.<br/><em>A move full of possibility.</em></h1><p>Sell your Greater Phoenix home with a thoughtful plan, local insight and a team that keeps you informed—from your first question to your next chapter.</p><a className="seller-button" href={consultation}>Let’s plan your sale <span>↗</span></a><a className="seller-text-link" href="#seller-plan">Explore our approach ↓</a></div></section>
    <section className="seller-section" id="seller-plan"><div className="seller-factor-layout"><div className="seller-venn" aria-label="Explore the six factors">{factors.map((item,i)=><button key={item[0]} className={`seller-circle circle-${i} ${factor===i?'selected':''}`} onMouseEnter={()=>setFactor(i)} onFocus={()=>setFactor(i)} onClick={()=>setFactor(i)} aria-pressed={factor===i} aria-controls="factor-detail"><span>0{i+1}</span>{item[0]}</button>)}<div className="seller-venn-center">The Pruitt<br/><em>client experience</em></div></div><div className="seller-factor-copy"><div className="seller-section-title"><p className="seller-eyebrow">A CONNECTED APPROACH</p><h2>Six Key Factors Behind<br/><em>Every Pruitt Sale</em></h2><p>Each part supports the next. At the center of it all: you.</p></div><article className="seller-factor-detail" id="factor-detail" aria-live="polite"><p className="seller-eyebrow">0{factor+1} / {factors[factor][0]}</p><h3>{factors[factor][1]}</h3><p>{factors[factor][2]}</p><a className="seller-text-link" href={consultation}>Talk through your goals ↗</a></article></div></div></section>
    <section className="seller-section seller-guide">
      <div className="seller-guide-heading"><div className="seller-section-title"><p className="seller-eyebrow">ONE AGENT GUIDING YOU</p><h2>A familiar face.<br/><em>A clear way forward.</em></h2></div><img className="seller-guide-desert" src="/media/buyers/desert-line-art.png" alt="" aria-hidden="true"/></div>
      <div className="seller-guide-layout">
        <div className="seller-choice-list" aria-label="Explore your agent’s role">{guidance.map((item,i)=><button key={item[0]} aria-pressed={guide===i} aria-controls="guide-detail" onClick={()=>setGuide(i)}><img className="seller-guide-icon" src={`/media/sellers/guide-${['plan','calendar','presentation','feedback','offers'][i]}-icon.webp`} alt="" aria-hidden="true"/>{item[0]}</button>)}</div>
        <div className="seller-guide-panel" id="guide-detail" aria-live="polite">
          <img className="seller-guide-photo" src={`/media/sellers/guide-${['plan','calendar','presentation','feedback','offers'][guide]}.webp`} alt={[
            'An agent and homeowner discussing the home during a first walkthrough',
            'An agent and homeowner mapping moving dates on a calendar',
            'A photographer capturing an Arizona home and its outdoor living space',
            'An agent and homeowner reviewing open-house feedback together',
            'An agent and homeowner comparing purchase offers at the table',
          ][guide]} width={2098} height={749}/>
          <div className="seller-guide-description"><h3>{guidance[guide][1]}</h3><p>{guidance[guide][2]}</p></div>
        </div>
      </div>
    </section>
    <section className="seller-section seller-staging" id="seller-staging">
      <div className="seller-staging-visual"><div className="seller-comparison" style={{'--reveal':`${reveal}%`} as CSSProperties}><img src="/media/sellers/bedroom-before.webp" alt="An empty, unstyled Arizona bedroom in natural daylight"/><img className="seller-staged-image" src="/media/sellers/bedroom-after.webp" alt="The same bedroom staged with an upholstered bed, layered linens and warm accents"/><span className="comparison-label before">Before</span><span className="comparison-label after">Styled possibility</span><div className="comparison-divider"><span>↔</span></div><input type="range" min="0" max="100" value={reveal} onChange={e=>setReveal(Number(e.target.value))} aria-label="Compare empty and staged bedroom" aria-valuetext={`${100-reveal}% furnished view`}/></div><p className="seller-caption">Drag to explore. AI-generated staging illustration, not an actual Pruitt listing or a promised result.</p></div>
      <div className="seller-staging-copy">
        <p className="seller-eyebrow">GET READY TO BE SEEN</p>
        <h2>Help buyers picture<br/><em>life here.</em></h2>
        <p>The same room. A different first impression. Thoughtful staging helps buyers see how a space can feel like home.</p>
        <p>We help you decide what to refresh, simplify or stage, with your budget and timeline in mind.</p>
        <div className="seller-prep-list"><span>Declutter & simplify</span><span>Refresh & repair</span><span>Style & photograph</span></div>
        <a className="seller-text-link" href={consultation}>Let’s plan your home’s presentation ↗</a>
      </div>
    </section>
    <section className="seller-section seller-reviews"><div className="seller-section-title"><p className="seller-eyebrow">FROM PEOPLE WHO HAVE BEEN THERE</p><h2>Local relationships.<br/><em>Lasting confidence.</em></h2></div><Testimonials id="seller-client-stories" showHeading={false}/></section>
    <section className="seller-section seller-faq"><div><p className="seller-eyebrow">A FEW GOOD QUESTIONS</p><h2>Before you<br/><em>make your move.</em></h2></div><div>{[
      ['Should I make improvements before selling?', 'Start with a walk-through. We can help distinguish everyday touchups from larger projects and discuss your budget, timing and the competition before you commit to work.'],
      ['Can I sell and buy at the same time?', 'Yes, but the timing deserves a plan. We’ll talk through your preferred move, financing conversations and possible closing arrangements so you can evaluate the options.'],
      ['What if my home is currently rented?', 'Tell us about the lease and your plans early. We can discuss how occupancy, access and the tenancy affect preparation, marketing and timing.'],
      ['How much is my home worth?', 'The most useful starting point is a property-specific review of condition, location and comparable sales. Schedule a conversation and we’ll help you understand how your home fits today’s market.'],
    ].map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>
    <section className="seller-contact"><div className="seller-contact-copy"><p className="seller-eyebrow">YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</p><h2>Let’s make a plan<br/><em>for your home.</em></h2><p>Tell us where you are and where you want to go.<br/>We’ll help you work out the next step.</p><a className="seller-button" href={consultation}>Talk with The Pruitt Team ↗</a><a className="seller-text-link" href="tel:+16029421410">602.942.1410</a></div><div className="seller-contact-stats" aria-label="Pruitt Team experience"><div><strong>$32M</strong><span>Average annual sales*</span></div><div><strong>400+</strong><span>Families helped annually*</span></div><div><strong>11×</strong><span>West USA Realty Top Producer since 2003*</span></div><p>*Figures reported on <a href="https://www.thepruittteam.com/">The Pruitt Team’s current website</a>; team-wide, not seller-only results. Reporting periods for annual figures are not specified.</p></div></section>
  </main>;
}
