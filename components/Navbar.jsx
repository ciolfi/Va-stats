import Link from 'next/link';
import pwaicon from '@/public/pwa-icon.png';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import NavItem from './NavItem';
import Button from './Button';
import styles from '@/styles/Navbar.module.css';
import Head from 'next/head';

const MENU_LIST = [
  { text: 'Home', href: '/' },
  { text: 'About Us', href: '/about' },
  {
    text: "Students",
    href: "/students",
    submenu: [
      { text: "Student Registration", href: "/studentregistration" },
    ],
  },
  { text: "Batches", href: "/batches" },
  {
    text: "Courses",
    href: "/courses"
  },
  {
    text: "Staff",
    href: "/users"
  },
];

const Navbar = (user_role) => {
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const { data: session, status } = useSession();
  const userrole  = user_role;
  return (   
    <header>
      <Head>
							<title>VisionAid</title>
							<meta
								name='description'
								content='A nonprofit, advocating on behalf of persons with vision issues of any type' />
							<meta name='theme-color' content='#ffffff' />
							<link rel='icon' href='/favicon.ico' />
							<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
							<link rel='manifest' href='/manifest.json' />

							<link rel='preconnect'
								href='https://fonts.gstatic.com'
								crossOrigin />

							<link rel='preload'
								as='style'
								href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />

							<link rel='stylesheet'
								href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap'
								media='print'
								onLoad="this.media='all'" />

							<noscript>
								<link rel='stylesheet'
									href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />
							</noscript>
						</Head>
      <nav className={'nav'}>
        <Link href="/" className={'textlogo'}>
          VISION-AID ACADEMY
        </Link>
        <Link href="https://support.google.com/chrome/answer/9658361?hl=en&co=GENIE.Platform%3DDesktop" target="_blank">
          <Image src={pwaicon} width="48" height="18" alt="PWA logo" />
        </Link>
        <div
          onClick={() => setNavActive(!navActive)}
          className={'nav__menu-bar'}>
        </div>
        <div className={`${navActive ? 'active' : ''} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div key={menu.text}>
              {menu.submenu ? (
                <DropdownMenu
                  menu={menu}
                  active={activeIdx === idx}
                  setActive={() => {
                    setActiveIdx(idx);
                    setNavActive(false);
                  }}
                  setActiveIdx={setActiveIdx}
                />
              ) : (
                <div
                  onClick={() => {
                    setActiveIdx(idx);
                    setNavActive(false);
                  }}
                >
                  <NavItem active={activeIdx === idx} {...menu} />
                </div>
              )}
            </div>
          ))}
          {!session ? (
            <Button text={'Sign in with Google'} iconSrc={'/icons/google-logo.svg'} onClick={() => signIn('google')} isLight={true} />
          ) : (
            <>
              <p className={styles.topRightText}>Signed in as {user_role.user_role} : {session.user.email}</p>
              <Button text={'Logout'} onClick={() => signOut({ callbackUrl: '/' })} isLight={true} />
            </>
          )}
        </div>
      </nav>
    </header>
  );
};


const DropdownMenu = ({ menu, active, setActive, setActiveIdx }) => (
  <div className={styles.dropdownMenu}
    onMouseEnter={() => setActive()}
    onMouseLeave={() => setActiveIdx(-1)}
  >
    <div
      className={`${styles.dropdownMenuItem} ${active ? styles.active : ''}`}
    >
      <NavItem {...menu} />
    </div>
    {menu.submenu && active && (
      <div className={styles.dropdownMenuSubmenu}>
        {menu.submenu.map((dropdownItem, idx) => (
          <div
            className={`${styles.dropdownMenuItem} ${active ? styles.active : ''}`}
            key={dropdownItem.text}
            onClick={() => {
              setActiveIdx(-1);
            }}
          >
            <NavItem {...dropdownItem} />
          </div>
        ))}
      </div>
    )}
  </div>
);


export default Navbar;
