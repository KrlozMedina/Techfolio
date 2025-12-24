'use client';

import { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { MenuLinks } from './MenuLinks';
import styles from './Navbar.module.scss';

interface SidebarProps {
  lang: 'es' | 'en';
}

const sidebarTexts = {
  expand: {
    es: 'Expandir barra lateral',
    en: 'Expand sidebar',
  },
  collapse: {
    es: 'Colapsar barra lateral',
    en: 'Collapse sidebar',
  },
  aside: {
    es: 'Barra lateral de navegación',
    en: 'Navigation sidebar'
  }
};

/**
 * `Sidebar` component
 *
 * Renders a collapsible sidebar containing navigation links.
 * Includes a toggle button to expand/collapse the sidebar.
 *
 * @param lang - Language code for rendering localized text.
 */
export const Sidebar: React.FC<SidebarProps> = ({ lang }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => setIsExpanded(prev => !prev);

  const sidebarClass = `${styles.sidebar} ${isExpanded ? styles['sidebar--expanded'] : ''}`;
  const toggleLabel = isExpanded ? sidebarTexts.collapse[lang] : sidebarTexts.expand[lang];
  const ToggleIcon = isExpanded ? FiChevronLeft : FiChevronRight;

  return (
    <aside className={sidebarClass} aria-label={sidebarTexts.aside[lang]}>
      {/* Navigation links */}
      <div className={styles['sidebar__top-section']}>
        <MenuLinks language={lang} onlyIcons={!isExpanded} />
      </div>

      {/* Toggle sidebar */}
      <button
        onClick={toggleSidebar}
        aria-label={toggleLabel}
        title={toggleLabel}
      >
        <ToggleIcon />
      </button>
    </aside>
  );
};
