import React,{useEffect,useState} from 'react';
type InstallPrompt=Event&{prompt:()=>Promise<void>;userChoice:Promise<{outcome:string}>};
export default function InstallApp(){
 const [prompt,setPrompt]=useState<InstallPrompt|null>(null),[help,setHelp]=useState(false),[installed,setInstalled]=useState(()=>matchMedia('(display-mode: standalone)').matches||Boolean((navigator as Navigator&{standalone?:boolean}).standalone));
 useEffect(()=>{const before=(event:Event)=>{event.preventDefault();setPrompt(event as InstallPrompt)};const done=()=>{setInstalled(true);setPrompt(null);setHelp(false)};window.addEventListener('beforeinstallprompt',before);window.addEventListener('appinstalled',done);return()=>{window.removeEventListener('beforeinstallprompt',before);window.removeEventListener('appinstalled',done)}},[]);
 if(installed)return null;
 async function install(){if(!prompt){setHelp(true);return}try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==='accepted')setInstalled(true);setPrompt(null)}catch{setHelp(true)}}
 return <div className="install-app"><button type="button" className="secondary" onClick={install}>Instalar no celular</button>{help&&<div className="install-help" role="region" aria-label="Como instalar"><h2>Deixe o app na tela inicial</h2><p><strong>Android:</strong> abra este endereço no Chrome. No menu ⋮, toque em “Instalar aplicativo” ou “Adicionar à tela inicial”.</p><p><strong>iPhone:</strong> abra no Safari, toque em Compartilhar e depois em “Adicionar à Tela de Início”.</p><p>Se estiver dentro do WhatsApp ou de outro aplicativo, abra primeiro no navegador do celular. A opção disponível depende do aparelho e do navegador.</p><button type="button" className="textbtn" onClick={()=>setHelp(false)}>Entendi</button></div>}</div>
}
