import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const DaySelector = ({ selectedDays, onDayPress }) => {
  const daysOfWeek = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo'
  ]

  return (
    <View>
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

export default DaySelector