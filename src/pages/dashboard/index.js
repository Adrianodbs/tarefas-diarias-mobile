import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTasks } from '../../context/TaskContext'

const Dashboard = () => {
  const { completedTasks, setCompletedTasks } = useTasks()
  const [totalScore, setTotalScore] = useState(completedTasks.length * 10)

  useEffect(() => {
    // Recupere as tarefas concluídas do AsyncStorage quando o componente for montado
    async function fetchCompletedTasks() {
      try {
        const storedCompletedTasks = await AsyncStorage.getItem(
          'completedTasks'
        )
        if (storedCompletedTasks !== null) {
          setCompletedTasks(JSON.parse(storedCompletedTasks))
        }
      } catch (error) {
        console.error(
          'Erro ao recuperar tarefas concluídas do AsyncStorage',
          error
        )
      }
    }

    fetchCompletedTasks()
  }, [completedTasks])

  useEffect(() => {
    const newTotalScore = completedTasks.length * 10
    setTotalScore(newTotalScore)
  }, [completedTasks])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Atualmente você possui</Text>
      <Text style={styles.score}>{totalScore} pontos</Text>
      <Text style={styles.title}>Tarefas Concluídas</Text>
      {completedTasks.length > 0 ? (
        <FlatList
          data={completedTasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Text>{item.name}</Text>
              {/* Você pode adicionar mais informações da tarefa aqui, se necessário */}
            </View>
          )}
        />
      ) : (
        <Text>Nenhuma tarefa concluída ainda.</Text>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 40
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green' // Cor da pontuação, você pode ajustar conforme necessário
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
})

export default Dashboard
