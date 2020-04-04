import React from 'react';
import { faFacebook, faGithub, faBitbucket, faLine } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@styles/components/footer.scss';

const Footer = () => {
  return (
    <div id="footer">
      <div className="icons">
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faGithub} />
        <FontAwesomeIcon icon={faBitbucket} />
        <FontAwesomeIcon icon={faLine} />
      </div>
      <div className="copyright">Copyright © 2020 All Rights Reserved by GPlay</div>
    </div>
  )
}

export default Footer;
