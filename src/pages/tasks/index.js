import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import { CheckBox } from 'react-native-elements'

import { useTasks } from '../../context/TaskContext'
import ButtonApp from '../../components/ButtonApp'
import { getCurrentDate } from '../../utils/GetCurrentDate'

const Tasks = () => {
  const { tasks, removeTask } = useTasks()
  const [checkedTasks, setCheckedTasks] = useState([])
  const [progress, setProgress] = useState(0)
  const [progressColor, setProgressColor] = useState('')

  const toggleTask = index => {
    const updatedCheckedTasks = [...checkedTasks]
    updatedCheckedTasks[index] = !updatedCheckedTasks[index]
    setCheckedTasks(updatedCheckedTasks)
  }

  const handleRemoveTask = taskName => {
    removeTask(taskName)
  }

  const sendTasks = () => {}

  useEffect(() => {
    const completedTasks = checkedTasks.filter(task => task === true).length
    const totalTasks = tasks.length
    const percentage = (completedTasks / totalTasks) * 100

    if (percentage <= 25) {
      setProgressColor('red')
    } else if (percentage <= 50) {
      setProgressColor('orange')
    } else {
      setProgressColor('green')
    }

    setProgress(percentage)
  }, [checkedTasks, tasks])

  return (
    <SafeAreaView style={styles.tasks}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Minhas tarefas</Text>
      </View>

      <View style={styles.content}>
        {tasks.length > 0 ? (
          <ScrollView style={styles.contentTasks}>
            <Text style={styles.day}>{getCurrentDate()}</Text>
            {tasks.map((task, index) => (
              <View key={index} style={styles.contentItem}>
                <Text style={styles.itemTitle}>{task.name}</Text>
                <View style={styles.taskButtons}>
                  <CheckBox
                    checked={checkedTasks[index]}
                    onPress={() => toggleTask(index)}
                  />
                  <TouchableOpacity onPress={() => handleRemoveTask(task.name)}>
                    <Ionicons name="trash-outline" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text>Você ainda não cadastrou nenhuma tarefa!</Text>
        )}
        {tasks.length > 0 && (
          <View>
            <Text style={styles.progressText}>
              {Math.round(progress)}% das tarefas concluídas
            </Text>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: 'transparent', width: 300 } // Largura fixa da barra de progresso
              ]}
            >
              <View
                style={{
                  width: (300 * progress) / 100, // Largura real com base na porcentagem
                  height: '100%',
                  backgroundColor: progressColor
                }}
              />
            </View>
          </View>
        )}
        {tasks.length > 0 && (
          <ButtonApp
            title="Enviar"
            onPress={sendTasks}
            disabled={progress === 0}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default Tasks

const styles = StyleSheet.create({
  tasks: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#4A3780',
    marginTop: 35
  },
  titleContainer: {
    flex: 1, // 20% da tela
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A3780'
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  content: {
    flex: 4, // 80% da tela
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  day: {
    textAlign: 'center',
    fontSize: 17,
    paddingVertical: 5
  },
  contentTasks: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 10,
    borderRadius: 12,
    marginTop: -60,
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 4, // Raio da sombra
    elevation: 5,
    maxHeight: 450,
    overflow: 'scroll'
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#cacaca',
    marginBottom: 10,
    padding: 5
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: '65%'
  },
  taskButtons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  progressText: {
    textAlign: 'center',
    marginTop: 10
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'gray'
  }
})
