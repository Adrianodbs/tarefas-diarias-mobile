import React, { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    // Recupere as tarefas salvas no localStorage quando o componente for montado
    async function fetchTasks() {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks')
        if (storedTasks !== null) {
          setTasks(JSON.parse(storedTasks))
        }
      } catch (error) {
        console.error('Erro ao recuperar tarefas do AsyncStorage', error)
      }
    }

    fetchTasks()
  }, [])

  const addTask = async task => {
    try {
      const updatedTasks = Array.isArray(tasks) ? [...tasks, task] : [task]
      setTasks(updatedTasks) // Atualize o estado local

      // Chame a função para salvar no AsyncStorage
      await saveTasksToStorage(updatedTasks)
    } catch (error) {
      console.error('Erro ao adicionar tarefa ao AsyncStorage', error)
    }
  }

  const saveCompletedTasksToStorage = async completedTasks => {
    try {
      // Recupere as tarefas concluídas anteriores, se houver
      const storedCompletedTasks =
        (await AsyncStorage.getItem('completedTasks')) || '[]'
      const parsedCompletedTasks = JSON.parse(storedCompletedTasks)

      // Adicione as tarefas concluídas do dia atual à lista existente
      const updatedCompletedTasks = [...parsedCompletedTasks, ...completedTasks]

      // Salve as tarefas concluídas no AsyncStorage
      await AsyncStorage.setItem(
        'completedTasks',
        JSON.stringify(updatedCompletedTasks)
      )
    } catch (error) {
      console.error('Erro ao salvar tarefas concluídas no AsyncStorage', error)
    }
  }

  const removeTask = taskName => {
    const updatedTasks = tasks.filter(task => task.name !== taskName)
    setTasks(updatedTasks)
    saveTasksToStorage(updatedTasks) // Atualize o localStorage também
  }

  const sendTasks = () => {}

  const saveTasksToStorage = async updatedTasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } catch (error) {
      console.error('Erro ao salvar tarefas no AsyncStorage', error)
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        sendTasks,
        saveCompletedTasksToStorage
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}
