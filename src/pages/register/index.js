import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native'
import DaySelector from '../../components/DaySelector'

const Register = () => {
  const [taskName, setTaskName] = useState('')
  const [selectedDays, setSelectedDays] = useState([])
  const [category, setCategory] = useState('')

  const toggleDay = day => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter(selectedDay => selectedDay !== day)
      : [...selectedDays, day]
    setSelectedDays(updatedDays)
  }

  const saveTask = () => {
    // Aqui você pode adicionar a lógica para salvar a tarefa
    const task = {
      name: taskName,
      daysOfWeek: selectedDays,
      category: category
    }
    console.log('Tarefa salva:', task)
    // Limpar os campos após salvar
    setTaskName('')
    setSelectedDays([])
    setCategory('')
  }

  return (
    <View>
      <Text>Adicionar uma nova tarefa</Text>

      <View>
        <TextInput
          placeholder="Adicionar tarefa"
          value={taskName}
          onChangeText={text => setTaskName(text)}
        />
      </View>

      <DaySelector selectedDays={selectedDays} onDayPress={toggleDay} />

      <View>
        <TextInput
          placeholder="Categoria"
          value={category}
          onChangeText={text => setCategory(text)}
        />
      </View>

      <Button title="Salvar" onPress={saveTask} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Register
