import React from 'react';
import { Logo } from '@/components/logo';

const TermsOfUsePage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <Logo />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center', fontFamily: 'Montserrat, Arial, sans-serif' }}>Terms of Use for the Website</h1>
      </div>
      <div style={{ maxWidth: '800px', width: '100%', fontSize: '1.1rem', overflowY: 'auto', maxHeight: '80vh', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', fontFamily: 'Montserrat, Arial, sans-serif' }}>
        {/* Space for future paragraphs */}
      </div>
    </div>
  );
}

export default TermsOfUsePage;
