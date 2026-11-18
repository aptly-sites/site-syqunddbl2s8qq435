'use client';
import {BriefcaseBusiness} from 'lucide-react';
import {useEffect,useId,useRef,useState} from 'react';
import NavigationPopover from './NavigationPopover';
import {createPortal} from 'react-dom';

export default function AgentsMenu({active=false}:{active?:boolean}) {
 const [scheduling,setScheduling]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null);
 const id=useId();
 useEffect(()=>{
  if(!scheduling)return;
  dialog.current?.showModal();
  const focused=document.activeElement as HTMLElement|null;
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.body.style.overflow=previous;focused?.focus();};
 },[scheduling]);
 return <>
 <NavigationPopover label="Agents" active={active} icon={<BriefcaseBusiness aria-hidden="true"/>} items={[
 {label:'Yardi Portal',description:'Access your agent workspace.',href:'https://west67188.yardione.com/Account/Login?ReturnUrl=%2F'},
 {label:'Training',description:'Resources to support your next step.',href:'https://app.trainual.com/accounts/universal_login'},
 {label:'One-time payments',description:'Owner and resident payment options.',href:'/agents/one-time-payments',preview:'/agents/one-time-payments'},
 {label:'Agent forms',description:'Property management documents.',href:'/agents/forms',preview:'/agents/forms'},
 {label:'Schedule a call',description:'Connect with Dave Pruitt.',href:'https://calendly.com/davidpruitt/',onSelect:()=>setScheduling(true)}
 ]}/>
 {scheduling&&createPortal(<dialog className="agent-scheduling-dialog" ref={dialog} aria-labelledby={id+'-title'} onClose={()=>setScheduling(false)} onClick={event=>{if(event.target===event.currentTarget)dialog.current?.close();}}>
  <div className="agent-scheduling-heading"><h2 id={id+'-title'}>Schedule a call with Dave Pruitt</h2><button type="button" aria-label="Close scheduling" onClick={()=>dialog.current?.close()}>×</button></div>
  <iframe title="Dave Pruitt appointment availability" src="https://calendly.com/davidpruitt/?hide_gdpr_banner=1"/>
  <a className="agent-scheduling-fallback" href="https://calendly.com/davidpruitt/" target="_blank" rel="noopener noreferrer">Open scheduling in a new tab ↗</a>
 </dialog>,document.body)}
 </>;
}
