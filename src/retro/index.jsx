import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/vt323/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-700.css';
import './retro-ui.css';
import { RetroDesktop } from './RetroDesktop.jsx';

class RetroBoundary extends Component {
  state={failed:false};
  static getDerivedStateFromError(){return {failed:true};}
  render(){return this.state.failed?<div dangerouslySetInnerHTML={{__html:this.props.fallback}}/>:this.props.children;}
}
const target=document.getElementById('retroDesktop');
if(target){
  const fallback=target.innerHTML;
  createRoot(target).render(<RetroBoundary fallback={fallback}><RetroDesktop/></RetroBoundary>);
}
