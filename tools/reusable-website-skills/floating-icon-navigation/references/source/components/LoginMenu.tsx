'use client';
import {LogIn} from 'lucide-react';
import NavigationPopover from './NavigationPopover';
export default function LoginMenu(){return <NavigationPopover label="Login" icon={<LogIn aria-hidden="true"/>} items={[
 {label:'Owner Portal Login',description:'Statements, documents and your property.',href:'https://west12265.elevate.cafe/ownerportalnet/content2/access/login'},
 {label:'Resident Portal Login',description:'Payments, requests and your home.',href:'https://www.rentcafe.com/residentservices/apartmentsforrent/userlogin.aspx'}
 ]}/>;}
