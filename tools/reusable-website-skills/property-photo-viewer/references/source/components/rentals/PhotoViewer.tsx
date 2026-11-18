'use client';
import {useEffect,useRef} from 'react';
import {createPortal} from 'react-dom';
import {ChevronLeft,ChevronRight,X} from 'lucide-react';

export default function PhotoViewer({images,address,city,index,onChange,onClose}:{images:string[];address:string;city:string;index:number;onChange:(index:number)=>void;onClose:()=>void}){
 const dialog=useRef<HTMLDialogElement>(null);
 const strip=useRef<HTMLDivElement>(null);
 const touch=useRef<number|null>(null);
 const move=(delta:number)=>onChange((index+delta+images.length)%images.length);
 useEffect(()=>{
  const previous=document.activeElement as HTMLElement|null;
  const overflow=document.body.style.overflow;
  document.body.style.overflow='hidden';dialog.current?.showModal();
  return()=>{document.body.style.overflow=overflow;previous?.focus();};
 },[]);
 useEffect(()=>{const item=strip.current?.children[index] as HTMLElement|undefined;if(item&&strip.current)strip.current.scrollTo({left:item.offsetLeft-strip.current.clientWidth/2+item.clientWidth/2,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});},[index]);
 return createPortal(<dialog ref={dialog} className="property-photo-viewer" aria-label={`Photos of ${address}`} onClose={onClose} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}}>
  <div className="photo-viewer-heading"><div><h2>{address}</h2><p>{city}, Arizona</p></div><button autoFocus onClick={onClose} aria-label="Close photo viewer">Close <X size={20} aria-hidden="true"/></button></div>
  <div className="photo-viewer-stage" onTouchStart={event=>{touch.current=event.touches[0].clientX;}} onTouchEnd={event=>{if(touch.current!==null){const delta=event.changedTouches[0].clientX-touch.current;if(Math.abs(delta)>50)move(delta<0?1:-1);}touch.current=null;}}>
   <img src={images[index]} alt={`${address}, photo ${index+1} of ${images.length}`}/>
   {images.length>1&&<><button className="photo-viewer-prev" onClick={()=>move(-1)} aria-label="Previous photo"><ChevronLeft aria-hidden="true"/><span>Previous</span></button><button className="photo-viewer-next" onClick={()=>move(1)} aria-label="Next photo"><span>Next</span><ChevronRight aria-hidden="true"/></button></>}
  </div>
  <p className="photo-viewer-count" aria-live="polite">Photo {index+1} of {images.length}</p>
  <div ref={strip} className="photo-viewer-thumbnails" role="group" aria-label="All property photos">{images.map((src,i)=><button key={`${src}-${i}`} aria-label={`View photo ${i+1}`} aria-pressed={index===i} onClick={()=>onChange(i)}><img src={src} alt="" loading="lazy"/><span aria-hidden="true">{i+1}</span></button>)}</div>
 </dialog>,document.body);
}
