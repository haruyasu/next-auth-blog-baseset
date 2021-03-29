import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

const Navigation: NextPage = () => {
  const router = useRouter()
  const logout = (): void => {
    cookie.remove('access_token')
    // eslint-disable-next-line no-void
    void router.push('/')
  }

  return (
    <header className="container flex flex-row items-center mx-auto px-5 py-5 max-w-screen-xl">
      <Link href="/">
        <a>
          <img
            src="https://placehold.jp/80x80.png"
            alt="me"
            width={80}
            height={80}
          />
        </a>
      </Link>
      <nav className="ml-auto">
        <Link href="/about">
          <a className="mr-5">About</a>
        </Link>
        <Link href="/task">
          <a className="mr-5">Task</a>
        </Link>
        <Link href="/newtask">
          <a className="mr-5">NewTask</a>
        </Link>
        <Link href="/login">
          <a className="mr-5">Login</a>
        </Link>
        <button onClick={logout}>Logout</button>
      </nav>
    </header>
  )
}

export default Navigation
