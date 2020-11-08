import React from 'react';
import { Box } from '@material-ui/core';
import styles from '@styles/components/footer.module.scss';

const Footer = () => {
  return (
    <Box className={styles['footer']}>
      <Box className={styles['slogan']}>
        Game makes us happy and crazy. Keep your curiosity forever.
      </Box>
      <Box className={styles['copyright']}>Copyright © 2020 All Rights Reserved by GPlay</Box>
    </Box>
  )
}

export default Footer;
