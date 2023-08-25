import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity
} from 'react-native'
import DaySelector from '../../components/DaySelector'

import { useTasks } from '../../context/TaskContext'

const Register = () => {
  const [taskName, setTaskName] = useState('')
  const [selectedDays, setSelectedDays] = useState([])
  const { addTask } = useTasks()

  const toggleDay = day => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter(selectedDay => selectedDay !== day)
      : [...selectedDays, day]
    setSelectedDays(updatedDays)
  }

  const saveTask = () => {
    const task = {
      name: taskName,
      daysOfWeek: selectedDays
    }
    try {
      addTask(task) // Adicione a nova tarefa
      setTaskName('')
      setSelectedDays([])
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
          <Text style={styles.sectionTitle}>Dias da Semana</Text>
          <DaySelector selectedDays={selectedDays} onDayPress={toggleDay} />
        </View>

        <TouchableOpacity style={styles.button} onPress={saveTask}>
          <Text style={styles.buttonTitle}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  register: {
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
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#fff',
    minWidth: '90%',
    height: 40,
    paddingLeft: 10,
    borderRadius: 4,
    color: '#000'
  },
  button: {
    backgroundColor: '#4A3780',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 24
  },
  buttonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
})

export default Register
