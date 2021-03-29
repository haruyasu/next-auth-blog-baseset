import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Cookie from 'universal-cookie'

const cookie = new Cookie()
const SERVERURL = 'http://127.0.0.1:8000/'

const Auth: NextPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const login = async (): Promise<void> => {
    try {
      await fetch(`${SERVERURL}api/auth/jwt/create/`, {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          if (res.status === 400) {
            throw new Error('認証に失敗しました')
          } else if (res.ok) {
            return res.json()
          }
        })
        .then((data) => {
          const options = { path: '/' }
          cookie.set('access_token', data.access, options)
        })
      // eslint-disable-next-line no-void
      void router.push('/task')
    } catch (err) {
      alert(err)
    }
  }

  const authUser = async (e: any): Promise<void> => {
    e.preventDefault()
    if (isLogin) {
      await login()
    } else {
      try {
        await fetch(`${SERVERURL}api/register/`, {
          method: 'POST',
          body: JSON.stringify({ username: username, password: password }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          if (res.status === 400) {
            throw new Error('認証に失敗しました')
          }
        })
        await login()
      } catch (err) {
        alert(err)
      }
    }
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold">
          {isLogin ? 'ログイン' : 'サインアップ'}
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={authUser}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              className="placeholder-gray-500 relative focus:z-10 block px-3 py-2 w-full text-gray-900 border border-gray-300 focus:border-indigo-500 rounded-none rounded-t-md focus:outline-none appearance-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="placeholder-gray-500 relative focus:z-10 block px-3 py-2 w-full text-gray-900 border border-gray-300 focus:border-indigo-500 rounded-b-md rounded-none focus:outline-none appearance-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="text-sm">
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium cursor-pointer">
              ログイン？サインアップ？
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex justify-center px-4 py-2 w-full text-white text-sm font-medium bg-indigo-600 hover:bg-indigo-700 border border-transparent rounded-md focus:outline-none focus:ring-indigo-500 focus:ring-offset-2 focus:ring-2">
            {isLogin ? 'ログイン' : 'サインアップ'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Auth
