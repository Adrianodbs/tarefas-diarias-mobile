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

  const addTask = async updatedTasks => {
    try {
      setTasks(updatedTasks) // Atualize o estado com a nova lista de tarefas

      // Salve a lista atualizada no localStorage
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } catch (error) {
      console.error('Erro ao adicionar tarefa ao AsyncStorage', error)
    }
  }

  const removeTask = taskName => {
    const updatedTasks = tasks.filter(task => task.name !== taskName)
    setTasks(updatedTasks)
    saveTasksToStorage(updatedTasks) // Atualize o localStorage também
  }

  const saveTasksToStorage = async updatedTasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } catch (error) {
      console.error('Erro ao salvar tarefas no AsyncStorage', error)
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}
