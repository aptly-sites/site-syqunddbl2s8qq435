'use client';
import {useEffect,useId,useRef,useState, type ReactNode,Fragment} from 'react';
import {ArrowUpRight} from 'lucide-react';
export type NavigationItem={label:string;description:string;href:string;group?:string;preview?:string;onSelect?:()=>void};
export default function NavigationPopover({label,icon,active=false,items}:{label:string;icon:ReactNode;active?:boolean;items:NavigationItem[]}){
 const [open,setOpen]=useState(false),[selected,setSelected]=useState(0);
 const root=useRef<HTMLDivElement>(null),trigger=useRef<HTMLButtonElement>(null),frame=useRef<HTMLIFrameElement>(null);
 const closeTimer=useRef<ReturnType<typeof setTimeout>|null>(null),animation=useRef(0);
 const id=useId(),item=items[selected];
 const cancelClose=()=>{if(closeTimer.current)clearTimeout(closeTimer.current);};
 const close=()=>{cancelClose();setOpen(false);};
 useEffect(()=>{if(!open)return;const outside=(e:PointerEvent)=>{if(!root.current?.contains(e.target as Node))setOpen(false);};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[open]);
 useEffect(()=>()=>{cancelClose();cancelAnimationFrame(animation.current);},[]);
 useEffect(()=>{cancelAnimationFrame(animation.current);},[open,selected]);
 function startPreview(){
  cancelAnimationFrame(animation.current);
  const win=frame.current?.contentWindow,doc=frame.current?.contentDocument;
  if(!win||!doc)return;
  const style=doc.createElement('style');style.textContent='html{scroll-behavior:auto!important}header.standard-navigation,[aria-label="Accessibility tools"]{display:none!important}main>section,main>footer{position:relative!important;top:auto!important}*{animation:none!important}';doc.head.appendChild(style);
  win.scrollTo(0,0);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let start=0;
  const animate=(now:number)=>{if(!start)start=now;const max=Math.min(2600,doc.documentElement.scrollHeight-win.innerHeight);const elapsed=Math.max(0,now-start-700);win.scrollTo(0,Math.min(max,elapsed*.1));if(elapsed*.1<max)animation.current=requestAnimationFrame(animate);};
  animation.current=requestAnimationFrame(animate);
 }
 return <div className="locations-menu nav-preview-menu" ref={root} onPointerEnter={e=>{if(e.pointerType==='mouse'){cancelClose();setOpen(true);}}} onPointerLeave={e=>{if(e.pointerType==='mouse')closeTimer.current=setTimeout(()=>setOpen(false),180);}} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))close();}} onKeyDown={e=>{if(e.key==='Escape'){close();trigger.current?.focus();}}}>
 <button ref={trigger} className={'locations-trigger'+(active?' is-active':'')} type="button" aria-label={label} aria-expanded={open} aria-controls={id} onClick={e=>{cancelClose();if(e.detail>0&&window.matchMedia('(hover: hover)').matches)setOpen(true);else setOpen(v=>!v);}}>{icon}<span className="nav-item-label">{label}</span></button>
 {open&&<div className="nav-preview-popover" id={id}>
 <div className="nav-preview-art" aria-hidden="true"><div className="nav-preview-browser"><i/><i/><i/><span>{item.label}</span></div><div className="nav-preview-window">
 {item.preview&&<iframe key={item.preview} ref={frame} src={item.preview} title={`${item.label} page preview`} tabIndex={-1} onLoad={startPreview}/>}
 {!item.preview&&<div className="nav-portal-preview"><img src="/brand/pruitt-team.png" alt=""/><span>{item.label}</span><p>{item.description}</p><ArrowUpRight/></div>}
 </div><span className="nav-preview-caption">{item.preview?'Explore the page':'Opens an external service'} <ArrowUpRight/></span></div>
 <div className="nav-preview-links"><p>{label}</p>{items.map((entry,index)=><Fragment key={entry.label}>{entry.group&&entry.group!==items[index-1]?.group&&<h3 className="nav-group-heading">{entry.group}</h3>}<a href={entry.href} className={selected===index?'is-previewed':''} onPointerEnter={()=>setSelected(index)} onFocus={()=>setSelected(index)} onClick={e=>{if(entry.onSelect){e.preventDefault();entry.onSelect();}close();}}><span><strong>{entry.label}</strong><small>{entry.description}</small></span><ArrowUpRight aria-hidden="true"/></a></Fragment>)}</div>
 </div>}
 </div>;
}
