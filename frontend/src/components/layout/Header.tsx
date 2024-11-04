import React from 'react'
import Link from 'next/link'
import { PATH } from 'const'
import styles from 'styles/components/Header.module.css'

const Header: React.FC = () => {
  return (
    <header className={ styles.header }>
      <nav className={ styles.nav }>
        <Link href="/">Home</Link>
        <Link href={ PATH.SUBMIT }>Submit Information</Link>
        {/* Add more navigation items */}
      </nav>
    </header>
  )
}

export default Header
