import { GetStaticProps, NextPage } from 'next'

// import { useEffect } from 'react'
// import useSWR from 'swr'
import Task from '../components/task/Task'
// import TaskForm from '../components/task/TaskForm'
// import StateContextProvider from '../context/StateContext'
import { getAllTasksData } from '../lib/tasks'

// const SERVERURL = 'http://127.0.0.1:8000/'

interface TasksData {
  created_at: string
  id: number
  title: string
}

// const fetcher = async (url: string): Promise<TasksData[]> => {
//   const res = await fetch(url).then(async (res) => await res.json())
//   return res
// }

// const apiUrl = `${SERVERURL}api/list-task/`

// interface Props {
//   staticfilterdTasks: TasksData[]
// }

interface Props {
  tasks: TasksData[]
}

const TaskPage: NextPage<Props> = ({ tasks }) => {
  // const TaskPage: NextPage<Props> = ({ staticfilterdTasks }) => {
  //   const { data: tasks, mutate } = useSWR(apiUrl, fetcher, {
  //     initialData: staticfilterdTasks
  //   })

  // const filteredTasks = tasks?.sort(
  //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
  // )

  // useEffect(() => {
  //   // eslint-disable-next-line no-void
  //   void mutate()
  // }, [])

  return (
    // <StateContextProvider>
    <div>
      {/* <TaskForm taskCreated={mutate} /> */}
      <div>
        {tasks?.map((task: TasksData) => (
          // <Task key={task.id} task={task} taskDeleted={mutate} />
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
    // </StateContextProvider>
  )
}

export default TaskPage

export const getStaticProps: GetStaticProps = async () => {
  const tasks = await getAllTasksData()

  return {
    props: { tasks },
    revalidate: 3
  }
}
