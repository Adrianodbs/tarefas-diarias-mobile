import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native'

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

      <View>
        <Text>Selecione os dias da semana:</Text>
        <View style={styles.daySelector}>
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDays.includes('Segunda-feira') && styles.selectedDay
            ]}
            onPress={() => toggleDay('Segunda-feira')}
          >
            <Text>Seg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDays.includes('Terça-feira') && styles.selectedDay
            ]}
            onPress={() => toggleDay('Terça-feira')}
          >
            <Text>Ter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDays.includes('Quarta-feira') && styles.selectedDay
            ]}
            onPress={() => toggleDay('Quarta-feira')}
          >
            <Text>Qua</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDays.includes('Quinta-feira') && styles.selectedDay
            ]}
            onPress={() => toggleDay('Quinta-feira')}
          >
            <Text>Qui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDays.includes('Sexta-feira') && styles.selectedDay
            ]}
            onPress={() => toggleDay('Sexta-feira')}
          >
            <Text>Sex</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDays.includes('Sábado') && styles.selectedDay
            ]}
            onPress={() => toggleDay('Sábado')}
          >
            <Text>Sáb</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDays.includes('Domingo') && styles.selectedDay
            ]}
            onPress={() => toggleDay('Domingo')}
          >
            <Text>Dom</Text>
          </TouchableOpacity>
        </View>
      </View>

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

const styles = StyleSheet.create({
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  dayButton: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5
  },
  selectedDay: {
    backgroundColor: 'lightblue'
  }
})

export default Register
