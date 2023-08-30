import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTasks } from '../../context/TaskContext'
import ButtonApp from '../../components/ButtonApp'

const Dashboard = () => {
  const { completedTasks, setCompletedTasks, deleteScore } = useTasks()
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

      {completedTasks.length > 0 ? (
        <Text style={styles.titleRank}>Sua patente é: </Text>
      ) : (
        <Text>Nenhuma tarefa concluída ainda.</Text>
      )}
      {completedTasks.length > 0 && (
        <ButtonApp title="Apagar a pontuação" onPress={deleteScore} />
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
  titleRank: {
    fontSize: 20,
    marginBottom: 30
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
