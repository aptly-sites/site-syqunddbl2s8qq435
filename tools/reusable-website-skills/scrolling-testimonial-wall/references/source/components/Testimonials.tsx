"use client";
import {useState} from 'react';
import {Pause,Play,ArrowDown,ArrowUp} from 'lucide-react';
import testimonials from '../data/testimonials.json';
import './testimonials.css';
export default function Testimonials({id='client-testimonials',showHeading=true,columnCount=3}:{id?:string;showHeading?:boolean;columnCount?:2|3}){
 const [paused,setPaused]=useState(false);
 const [expanded,setExpanded]=useState(false);
 const columns=Array.from({length:columnCount},(_,column)=>testimonials.filter((_,index)=>index%columnCount===column));
 return <section className={`client-testimonials${paused?' is-paused':''}${expanded?' is-expanded':''}`} id={id} aria-label="Client testimonials">
  {showHeading&&<div className="testimonial-heading"><div><p className="eyebrow">Words from our clients</p><h2>Local care.<br/><em>Lasting relationships.</em></h2></div><p>What clients have to say about working with the Pruitt Team.</p></div>}
  <div className="testimonial-masonry" tabIndex={0} aria-label="Client reviews. Animation pauses while focused or hovered.">
   {columns.map((reviews,column)=><div className="testimonial-column" key={column}><div className="testimonial-track">
    {[0,1].map(copy=><div className={`testimonial-group${copy?' testimonial-copy':''}`} key={copy} aria-hidden={copy?true:undefined}>
     {reviews.map(review=><figure className="testimonial-card" key={review.name}><span className="testimonial-quote-mark" aria-hidden="true">“</span><blockquote>{review.quote}</blockquote><figcaption><span className="testimonial-avatar" aria-hidden="true">{review.name.split(' ').slice(0,2).map(part=>part[0]).join('')}</span><span>{review.name}</span></figcaption></figure>)}
    </div>)}
   </div></div>)}
  </div>
  <div className="testimonial-bottom"><a href="https://www.thepruittteam.com/testimonials/" target="_blank" rel="noopener noreferrer">More client stories ↗</a><div className="testimonial-controls"><button type="button" className="testimonial-expand" aria-expanded={expanded} onClick={()=>setExpanded(value=>!value)}>{expanded?'Show animated grid':'Read all reviews'}{expanded?<ArrowUp/>:<ArrowDown/>}</button>{!expanded&&<button type="button" className="testimonial-pause" aria-label={paused?'Play testimonials':'Pause testimonials'} onClick={()=>setPaused(value=>!value)}>{paused?<Play/>:<Pause/>}</button>}</div></div>
 </section>;
}
