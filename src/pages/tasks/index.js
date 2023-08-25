import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'

import { CheckBox } from 'react-native-elements'

import { useTasks } from '../../context/TaskContext'

const Tasks = () => {
  const { tasks } = useTasks()
  const [checkedTasks, setCheckedTasks] = useState([])

  // Função para alternar o estado de uma tarefa quando o CheckBox é pressionado
  const toggleTask = index => {
    const updatedCheckedTasks = [...checkedTasks]
    updatedCheckedTasks[index] = !updatedCheckedTasks[index]
    setCheckedTasks(updatedCheckedTasks)
  }
  return (
    <SafeAreaView style={styles.tasks}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Minhas tarefas</Text>
      </View>

      <View style={styles.content}>
        {tasks.length > 0 ? (
          <View style={styles.contentTasks}>
            {tasks.map((task, index) => (
              <View key={index} style={styles.contentItem}>
                <Text style={styles.itemTitle}>{task.name}</Text>
                <CheckBox
                  checked={checkedTasks[index]}
                  onPress={() => toggleTask(index)}
                />
              </View>
            ))}
          </View>
        ) : (
          <Text>Você ainda não cadastrou nenhuma tarefa!</Text>
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
    backgroundColor: '#4A3780'
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
    elevation: 5
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
