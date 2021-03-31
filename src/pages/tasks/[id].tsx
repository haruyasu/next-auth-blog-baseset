/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import Cookie from 'universal-cookie'

import TaskForm from '../../components/task/TaskForm'
// import StateContextProvider, { StateContext } from '../../context/StateContext'
import { getAllTaskIds, getTaskData } from '../../lib/tasks'
interface TasksData {
  created_at: string
  id: number
  title: string
}

const fetcher = async (url: string): Promise<TasksData> => {
  const res = await fetch(url).then(async (res) => await res.json())
  return res
}

const cookie = new Cookie()

const SERVERURL = 'http://127.0.0.1:8000/'

interface Props {
  id: number
  staticTask: TasksData
}

const Post: NextPage<Props> = ({ id, staticTask }) => {
  const router = useRouter()
  const [update, setUpdate] = useState(false)
  // const { selectedTask, setSelectedTask } = useContext(StateContext)

  const { data: task, mutate } = useSWR(
    `${SERVERURL}api/detail-task/${id}`,
    fetcher,
    {
      initialData: staticTask
    }
  )

  useEffect(() => {
    // eslint-disable-next-line no-void
    void mutate()
  }, [])

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (router.isFallback || !task) {
    return <div>Loading...</div>
  }

  const deleteTask = async (): Promise<void> => {
    const accessToken = cookie.get('access_token')

    await fetch(`${SERVERURL}api/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${accessToken}`
      }
    }).then((res) => {
      if (res.status === 401) {
        alert('JWT Token not valid')
      }
    })
    // taskDeleted()

    // eslint-disable-next-line no-void
    void router.push('/task')
  }

  return (
    <div>
      {update ? (
        <>
          <TaskForm task={task} />
        </>
      ) : (
        <>
          <span className="mb-4">
            {'ID : '}
            {task.id}
          </span>
          <p className="mb-4 text-xl font-bold">{task.title}</p>
          <p className="mb-12">{task.created_at}</p>
          {/* <button onClick={() => setSelectedTask(task)}>編集</button> */}
          <button
            onClick={() => {
              // setSelectedTask(task)
              setUpdate(true)
            }}>
            編集
          </button>
          <button onClick={deleteTask}>削除</button>
        </>
      )}
    </div>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTaskIds()

  return {
    paths,
    fallback: true
  }
}

interface Params extends ParsedUrlQuery {
  id: string
}

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as Params
  const staticTask = await getTaskData(params.id)

  return {
    props: {
      id: staticTask.id,
      staticTask
    },
    revalidate: 3
  }
}
