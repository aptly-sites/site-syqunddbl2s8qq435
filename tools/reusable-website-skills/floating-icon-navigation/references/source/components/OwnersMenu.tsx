'use client';
import {Building2} from 'lucide-react';
import NavigationPopover from './NavigationPopover';
export default function OwnersMenu({active=false}:{active?:boolean}){return <NavigationPopover label="Owners" active={active} icon={<Building2 aria-hidden="true"/>} items={[
 {label:'Property management',description:'Local care for your Arizona investment.',href:'/owners',preview:'/owners'},
 {label:'Pricing & plans',description:'Find the right level of support.',href:'/owners/pricing',preview:'/owners/pricing'}
 ]}/>;}
