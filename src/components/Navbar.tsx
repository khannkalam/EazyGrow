
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';
import logo from "../../public/images/logo.png"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src={logo} alt="Logo" width={170} height={170} />
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
