import {pageMetadata} from '../../lib/seo';
import BuyingProcess from './BuyingProcess';
import Header from '../../components/rentals/Header';
import Affordability from './Affordability';
import '../../components/rentals/rentals.css';
import './buyers.css';
export const metadata=pageMetadata('/buyers',{title:'Buy a Home in Arizona | The Pruitt Team',description:'Find your next Arizona home with the Pruitt Team. Explore local guidance, the buying process and a home affordability calculator.'});
export default function Buyers(){return <div className="buyers-page"><Header active="buyers"/><main><section className="buyer-hero"><img src="/media/buyers/arizona-living.png" alt="Sunlit Arizona living room opening onto a desert patio" fetchPriority="high"/><div className="buyer-hero-copy"><p className="buyer-eyebrow">Buying with the Pruitt Team</p><h1>A home for<br/><em>what comes next.</em></h1><p>From your first questions to your new front door. Local knowledge and personal guidance for buying in Arizona.</p><div className="buyer-actions"><a className="buyer-button tan" href="https://calendly.com/davidpruitt/" target="_blank" rel="noreferrer">Let’s talk about your move →</a><a className="buyer-button outline" href="#affordability">What can I afford?</a></div></div></section><section className="buyer-intro"><p className="buyer-eyebrow">We are here to serve you</p><h2>More than finding a house.<br/><em>Finding your place.</em></h2><p>Buying a home is a big decision. The Pruitt Team brings a personal approach to the search, negotiation and details that follow—so you understand your options at every step.</p><div className="buyer-start"><span>Just exploring? Start with your budget.</span><span>Comparing areas? Explore our city guides.</span><span>Ready to move? Let’s make a plan.</span></div></section><BuyingProcess/><Affordability/><section className="buyer-markets"><p className="buyer-eyebrow">Make yourself at home in Arizona</p><h2>Find your kind <em>of neighborhood.</em></h2><p>Get to know the places around your next home, from dining and daily connections to local market information.</p><div className="buyer-city-thumbnails">{[
['Phoenix','phoenix-az','/media/phoenix-owner-camelback.jpg'],
['Glendale','glendale-az','/media/glendale/westgate-aerial-sunset.jpg'],
['Chandler','chandler-az','/media/chandler/downtown.jpg'],
['Tempe','tempe-az','/media/tempe/town-lake.jpg'],
['Peoria','peoria-az','/media/peoria/sunset-skyline.png'],
['Surprise','surprise-az','/media/surprise/city-sign.webp'],
['Scottsdale','scottsdale-az','/media/scottsdale/evening-skyline.png']
].map(([name,slug,image])=><a href={'/locations/'+slug} key={slug}><img src={image} alt="" loading="lazy"/><span>{name}</span><span aria-hidden="true">→</span></a>)}</div></section></main></div>}
