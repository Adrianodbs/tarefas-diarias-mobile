import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Keyboard
} from 'react-native'

import { useTasks } from '../../context/TaskContext'
import ButtonApp from '../../components/ButtonApp'

const Register = () => {
  const [taskName, setTaskName] = useState('')
  const { addTask } = useTasks()

  const saveTask = () => {
    const task = {
      name: taskName
    }
    try {
      addTask(task) // Adicione a nova tarefa
      setTaskName('')
      Keyboard.dismiss()
    } catch (error) {
      console.error('Erro ao adicionar a tarefa', error)
    }
  }

  return (
    <SafeAreaView style={styles.register}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Adicionar uma nova tarefa</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Título da Tarefa</Text>
          <TextInput
            placeholder="Adicionar tarefa"
            value={taskName}
            onChangeText={text => setTaskName(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitleInfo}>
            Realize as suas tarefas diárias, receba pontos por elas e suba a sua
            patente.
          </Text>
        </View>

        <ButtonApp
          onPress={saveTask}
          title="Salvar"
          disabled={taskName === ''}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  register: {
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
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    marginBottom: 8
  },
  sectionTitleInfo: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff',
    minWidth: '90%',
    height: 40,
    paddingLeft: 10,
    borderRadius: 4,
    color: '#000'
  }
})

export default Register
