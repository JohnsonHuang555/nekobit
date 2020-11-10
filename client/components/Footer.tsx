import React from 'react';
import styles from 'styles/components/footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.slogan}>
        Game makes us happy and crazy. Keep your curiosity forever.
      </div>
      <div className={styles.copyright}>Copyright © 2020 All Rights Reserved by GPlay</div>
    </div>
  )
}

export default Footer;
