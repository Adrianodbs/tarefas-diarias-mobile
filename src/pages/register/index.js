import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Keyboard
} from 'react-native'

import Modal from 'react-native-modal'

import { useTasks } from '../../context/TaskContext'
import ButtonApp from '../../components/ButtonApp'
import Header from '../../components/Header'

const Register = () => {
  const [taskName, setTaskName] = useState('')
  const { addTask } = useTasks()

  const [isModalVisible, setModalVisible] = useState(false)

  const saveTask = () => {
    const task = {
      name: taskName
    }
    try {
      addTask(task) // Adicione a nova tarefa
      setTaskName('')
      Keyboard.dismiss()

      setModalVisible(true)
    } catch (error) {
      console.error('Erro ao adicionar a tarefa', error)
    }
  }

  return (
    <SafeAreaView style={styles.register}>
      <Header title="Adicionar uma nova tarefa" />

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

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Tarefa adicionada com sucesso!</Text>
          <ButtonApp title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
  },
  modalContent: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 50,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center'
  },
  modalText: {
    fontSize: 18,
    marginBottom: 40
  }
})

export default Register
