import fetch from 'node-fetch'

const SERVERURL = 'http://127.0.0.1:8000/'

export interface TasksData {
  created_at: string
  id: number
  title: string
}

export async function getAllTasksData(): Promise<TasksData[]> {
  const res = await fetch(new URL(`${SERVERURL}api/list-task/`))
  const tasks = await res.json()

  // const staticfilterdTasks = tasks.sort(
  //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
  // )
  return tasks
}

export interface AllTaskIdsResponse {
  params: {
    id: string
  }
}

export async function getAllTaskIds(): Promise<AllTaskIdsResponse[]> {
  const res = await fetch(new URL(`${SERVERURL}api/list-task/`))
  const tasks = await res.json()

  return tasks.map((task: TasksData) => {
    return {
      params: {
        id: String(task.id)
      }
    }
  })
}

export async function getTaskData(id: string): Promise<TasksData> {
  const res = await fetch(new URL(`${SERVERURL}api/detail-task/${id}/`))
  const task = await res.json()

  return task
}
