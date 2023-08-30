import React, { createContext, useContext, useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [totalScore, setTotalScore] = useState(0)

  useEffect(() => {
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

      await saveTasksToStorage(updatedTasks)
    } catch (error) {
      console.error('Erro ao adicionar tarefa ao AsyncStorage', error)
    }
  }

  const saveCompletedTasksToStorage = async completedTasks => {
    try {
      const storedCompletedTasks =
        (await AsyncStorage.getItem('completedTasks')) || '[]'
      const parsedCompletedTasks = JSON.parse(storedCompletedTasks)

      const updatedCompletedTasks = [...parsedCompletedTasks, ...completedTasks]

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

  const updateTotalScore = () => {
    const newTotalScore = completedTasks.length * 10
    setTotalScore(newTotalScore)
  }

  const deleteScore = async () => {
    try {
      await AsyncStorage.setItem('completedTasks', '[]')
      setCompletedTasks([])
    } catch (error) {
      console.error('Erro ao apagar a pontuação', error)
    }
  }

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
        totalScore,
        updateTotalScore,
        saveCompletedTasksToStorage,
        completedTasks,
        setCompletedTasks,
        deleteScore
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  return useContext(TaskContext)
}
