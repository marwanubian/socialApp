import React from 'react';
import PropTypes from 'prop-types';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';



const Layout = () => (
  <div className={styles.Layout}>
    <Navbar/>
    <Outlet/>
    <Footer/>

  </div>
);

Layout.propTypes = {};

Layout.defaultProps = {};

export default Layout;
