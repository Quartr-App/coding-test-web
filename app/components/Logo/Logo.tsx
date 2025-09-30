import React from 'react';
import styles from './Logo.module.css'

interface CompanyLogoProps {
  iconUrl?: string | null;
  logoLightUrl?: string | null;
  logoDarkUrl?: string | null;
  displayName: string;
  size?: number;
}

const CompanyLogo: React.FC<CompanyLogoProps> = ({ iconUrl, logoLightUrl, logoDarkUrl, displayName, size = 48 }) => {
  const isDarkMode = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;        
  const logoSrc = (isDarkMode ? logoLightUrl : logoDarkUrl) || iconUrl || '/favicon.ico';
  return (
    <img
      src={logoSrc}
      alt={displayName || 'Company logo'}
      width={size}
      height={size}
      className={styles.logo}
    />
  );
};

export default CompanyLogo;
