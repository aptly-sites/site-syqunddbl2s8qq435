'use client';
import {useEffect,useState,useRef} from 'react';
import {usePathname} from 'next/navigation';
import './section-navigator.css';
type Stop={id:string;label:string;element:HTMLElement};
// Sticky panels report their pinned position, not their original place in the page.
// Measure normal flow synchronously, then restore before the browser paints.
function sectionTop(target:HTMLElement){
 const pinned=Array.from(document.querySelectorAll<HTMLElement>('.site-page-content section')).filter(element=>getComputedStyle(element).position==='sticky');
 const styles=pinned.map(element=>({element,position:element.style.getPropertyValue('position'),priority:element.style.getPropertyPriority('position'),top:element.style.getPropertyValue('top'),topPriority:element.style.getPropertyPriority('top')}));
 try{
  pinned.forEach(element=>{element.style.setProperty('position','relative','important');element.style.setProperty('top','auto','important');});
  return window.scrollY+target.getBoundingClientRect().top;
 }finally{
  styles.forEach(({element,position,priority,top,topPriority})=>{if(top)element.style.setProperty('top',top,topPriority);else element.style.removeProperty('top');if(position)element.style.setProperty('position',position,priority);else element.style.removeProperty('position');});
 }
}

export default function SectionNavigator(){
 const nav=useRef<HTMLElement>(null);
 const [hovered,setHovered]=useState<number|null>(null);
 const path=usePathname();const [stops,setStops]=useState<Stop[]>([]),[active,setActive]=useState('');
 useEffect(()=>{
  if(window.self!==window.top)return;
  const root=document.querySelector('.site-page-content');if(!root)return;
  let frame=0,timer:ReturnType<typeof setTimeout>;let sections:Stop[]=[];
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{let current=sections[0];for(const section of sections){if(section.element.getBoundingClientRect().top<=Math.max(150,window.innerHeight*.3))current=section;}if(current)setActive(current.id);
   nav.current?.querySelectorAll<HTMLElement>('a').forEach(link=>{
    const rect=link.getBoundingClientRect();
    const beneath=document.elementsFromPoint(1,rect.top+rect.height/2).find(element=>!element.closest('.section-navigator'));
    let color='#111111';
    const surface=beneath?.closest('section,footer,header,article');
    const heading=surface?.querySelector('h1,h2,h3');
    const rgb=(value:string)=>value.match(/[\d.]+/g)?.map(Number);
    // Photo/video sections already define a readable foreground for their copy.
    if(surface && (surface.querySelector('img,video')||getComputedStyle(surface).backgroundImage!=='none') && heading){
     const text=rgb(getComputedStyle(heading).color);
     if(text && .2126*text[0]+.7152*text[1]+.0722*text[2]>160)color='#ffffff';
    }else{
     let element=beneath;
     while(element){
      const background=rgb(getComputedStyle(element).backgroundColor);
      if(background && (background.length<4||background[3]>.85)){
       if(.2126*background[0]+.7152*background[1]+.0722*background[2]<145)color='#ffffff';
       break;
      }
      element=element.parentElement??undefined;
     }
    }
    if(document.body.dataset.a11yMode==='high')color='#ffffff';
    if(document.body.dataset.a11yMode==='light')color='#111111';
    link.style.setProperty('--section-nav-ink',color);
   });});};
  const discover=()=>{
   const seen=new Set<HTMLElement>();sections=[];
   root.querySelectorAll<HTMLElement>('h1,h2').forEach(heading=>{
    if(!heading.getClientRects().length||heading.closest('dialog,nav,aside,[hidden],.r-card,.application-answer'))return;
    const element=heading.closest<HTMLElement>('section')||heading.parentElement;if(!element||seen.has(element))return;
    const label=(element.dataset.sectionLabel||heading.innerText||'').replace(/\s+/g,' ').trim();if(!label||sections.some(section=>section.label===label))return;
    seen.add(element);
    if(!element.id)element.id='page-section-'+label.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'')+'-'+sections.length;
    sections.push({id:element.id,label,element});
   });
   setStops(sections);update();
  };
  const observer=new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(discover,150);});
  observer.observe(root,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','aria-selected']});
  const contrastTimer=window.setInterval(update,500);
  discover();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',discover);
  return()=>{window.clearInterval(contrastTimer);observer.disconnect();clearTimeout(timer);cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',discover);};
 },[path]);
 if(stops.length<2)return null;
 return <nav ref={nav} className="section-navigator" aria-label="On this page" onMouseLeave={()=>setHovered(null)}>{stops.map((stop,index)=><a onMouseEnter={()=>setHovered(index)} onFocus={()=>setHovered(index)} onBlur={()=>setHovered(null)} key={stop.id} href={'#'+stop.id} aria-label={stop.label} aria-current={active===stop.id?'location':undefined} onClick={event=>{event.preventDefault();const offset=window.innerWidth<=800?180:120;window.scrollTo({top:sectionTop(stop.element)-offset,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});history.replaceState(null,'','#'+stop.id);setActive(stop.id);}}><span className="section-nav-bar" style={{width:hovered===null?(active===stop.id?30:16):Math.max(16,52-Math.abs(index-hovered)*12)}}/><span className="section-nav-label">{stop.label}</span></a>)}</nav>;
}
