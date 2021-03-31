/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookie from 'universal-cookie'

// import { StateContext } from '../../context/StateContext'

const cookie = new Cookie()
const SERVERURL = 'http://127.0.0.1:8000/'

interface Props {
  task: {
    created_at: string
    id: number
    title: string
  }
}
// interface Props {
//   taskCreated: () => void
// }

const TaskForm: NextPage<Props> = ({ task }) => {
  console.log(task)

  // const TaskForm: NextPage<Props> = ({ taskCreated }) => {
  const router = useRouter()
  // const { selectedTask, setSelectedTask } = useContext(StateContext)
  const [selectedTask, setSelectedTask] = useState({ id: 0, title: '' })

  useEffect(() => {
    setSelectedTask(task)
  }, [])

  const create = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const accessToken = cookie.get('access_token')

    await fetch(`${SERVERURL}api/tasks/`, {
      method: 'POST',
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${accessToken}`
      }
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid')
      }
    })
    // setSelectedTask({ id: 0, title: '' })
    // taskCreated()

    // eslint-disable-next-line no-void
    void router.push('/task')
  }

  const update = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    await fetch(`${SERVERURL}api/tasks/${task.id}/`, {
      method: 'PUT',
      body: JSON.stringify({ title: selectedTask.title }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${cookie.get('access_token')}`
      }
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid')
      }
    })
    // setSelectedTask({ id: 0, title: '' })
    // taskCreated()

    // eslint-disable-next-line no-void
    void router.push('/task')
  }

  return (
    <div>
      <form onSubmit={task.id !== 0 ? update : create}>
        <input
          className="mb-8 px-2 py-1 text-black border"
          type="text"
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="ml-2 px-2 py-1 text-sm bg-gray-500 hover:bg-gray-600 rounded uppercase">
          {task.id !== 0 ? 'update' : 'create'}
        </button>
      </form>
    </div>
  )
}

export default TaskForm

// const TaskForm: NextPage<Props> = ({ task }) => {
//   // const TaskForm: NextPage<Props> = ({ taskCreated }) => {
//   const router = useRouter()
//   // const { selectedTask, setSelectedTask } = useContext(StateContext)

//   const create = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault()
//     const accessToken = cookie.get('access_token')

//     await fetch(`${SERVERURL}api/tasks/`, {
//       method: 'POST',
//       body: JSON.stringify({ title: selectedTask.title }),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `JWT ${accessToken}`
//       }
//     }).then((res) => {
//       if (res.status === 401) {
//         alert('JWT Token not valid')
//       }
//     })
//     setSelectedTask({ id: 0, title: '' })
//     // taskCreated()

//     // eslint-disable-next-line no-void
//     void router.push('/task')
//   }

//   const update = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault()
//     await fetch(`${SERVERURL}api/tasks/${selectedTask.id}/`, {
//       method: 'PUT',
//       body: JSON.stringify({ title: selectedTask.title }),
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `JWT ${cookie.get('access_token')}`
//       }
//     }).then((res) => {
//       if (res.status === 401) {
//         alert('JWT Token not valid')
//       }
//     })
//     setSelectedTask({ id: 0, title: '' })
//     // taskCreated()
//   }

//   return (
//     <div>
//       <form onSubmit={selectedTask.id !== 0 ? update : create}>
//         <input
//           className="mb-8 px-2 py-1 text-black border"
//           type="text"
//           value={selectedTask.title}
//           onChange={(e) =>
//             setSelectedTask({ ...selectedTask, title: e.target.value })
//           }
//         />
//         <button
//           type="submit"
//           className="ml-2 px-2 py-1 text-sm bg-gray-500 hover:bg-gray-600 rounded uppercase">
//           {selectedTask.id !== 0 ? 'update' : 'create'}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default TaskForm
