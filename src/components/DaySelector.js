import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const DaySelector = ({ selectedDays, onDayPress }) => {
  const daysOfWeek = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ]

  return (
    <View style={styles.content}>
      <Text>Selecione os dias da semana:</Text>
      <View style={styles.daySelector}>
        {daysOfWeek.map(day => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDays.includes(day) && styles.selectedDay
            ]}
            onPress={() => onDayPress(day)}
          >
            <Text>{day.substring(0, 3)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center'
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 5
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

export default DaySelector
