import React from 'react';
import styles from './ListItem.module.css'
import { ChevronRight } from "lucide-react";
import CompanyLogo from '../Logo/Logo';

import { CompanyData } from '../../../types/companyData';

interface ListItemProps {
  company: CompanyData;
}

const ListItem: React.FC<ListItemProps> = ({ company }) => {
  const {
    companyName,
    description,
    iconUrl,
    logoLightUrl,
    logoDarkUrl,
    displayName,
  } = company;
  return (
    <div className={styles.item}>
      <div className={styles.left}>
      <div className={styles.logo}>
        <CompanyLogo
          iconUrl={iconUrl}
          logoLightUrl={logoLightUrl}
          logoDarkUrl={logoDarkUrl}
          displayName={displayName}
          size={40}
        />
      </div>
      <div className={styles.textWrapper}>
        <h3 className={styles.name}>{companyName}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      </div>
      <div className={styles.chevron}>
        <ChevronRight size={20} strokeWidth={2} />
      </div>
    </div>
  );
};

export default ListItem;