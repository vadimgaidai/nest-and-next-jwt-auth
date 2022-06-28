import Link from 'next/link'
import { FC } from 'react'

const Header: FC = () => (
  <header>
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="sign-in">Sign In</Link>
        </li>
        <li>
          <Link href="sign-up">Sign Up</Link>
        </li>
      </ul>
    </nav>
  </header>
)

export default Header
