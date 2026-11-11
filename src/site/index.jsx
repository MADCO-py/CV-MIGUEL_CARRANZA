import { createRoot } from 'react-dom/client';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import './site.css';
import { SignatureScene } from './SignatureScene.jsx';

const target=document.getElementById('signatureVisual');
if(target) createRoot(target).render(<SignatureScene/>);
