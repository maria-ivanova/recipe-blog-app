import React from 'react';
import { Link } from 'react-router-dom';

import ROUTES from '../constants/routes.js';
import styles from '../styles/logo.module.css';
import LogoImg from '../images/logo_spatulas.png';

const Logo = () => {
    return (
        <Link to={ROUTES.HOME} className={styles.logo}>
            <img src={LogoImg} alt="Spatulas logo" />
        </Link>
    )
}

export default Logo;