import React, { useEffect, useState } from 'react';

interface LogoProps {
  sizeClasses?: string;
  defaultClasses?: string;
}

export default function Logo({ sizeClasses = "w-10 h-10", defaultClasses = "bg-emerald-500 rounded-lg text-xl" }: LogoProps) {
  const [logoData, setLogoData] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const loadLogo = () => {
      setLogoData(localStorage.getItem('aapi_logo'));
    };
    loadLogo();

    window.addEventListener('storage', loadLogo);
    window.addEventListener('logo-updated', loadLogo);
    return () => {
      window.removeEventListener('storage', loadLogo);
      window.removeEventListener('logo-updated', loadLogo);
    };
  }, []);

  const src = logoData || (!imgError ? '/logo.png' : null);

  if (src) {
    return (
      <div className={`${sizeClasses} flex items-center justify-center overflow-hidden`}>
        <img 
          src={src} 
          alt="AAPI Logo" 
          className="max-w-full max-h-full object-contain" 
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses} ${defaultClasses} flex items-center justify-center font-bold text-white shadow-lg`}>
      A
    </div>
  );
}
