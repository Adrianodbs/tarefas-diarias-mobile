import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Alert,
  View,
  Image
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useTasks } from '../../context/TaskContext'
import ButtonApp from '../../components/ButtonApp'

import Bronze from '../../assets/img/bronze.png'
import Prata from '../../assets/img/prata.png'
import Ouro from '../../assets/img/ouro.png'
import Rubi from '../../assets/img/rubi.png'
import Esmeralda from '../../assets/img/esmeralda.png'
import Diamante from '../../assets/img/diamante.png'
import Mestre from '../../assets/img/mestre.png'

const Dashboard = () => {
  const { completedTasks, setCompletedTasks, deleteScore } = useTasks()
  const [totalScore, setTotalScore] = useState(completedTasks.length * 10)
  const [rank, setRank] = useState('')
  const [image, setImage] = useState(null)

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

  useEffect(() => {
    const newRank = () => {
      if (totalScore <= 50) {
        setRank('Bronze')
        setImage(Bronze)
      } else if (totalScore <= 100) {
        setRank('Prata')
        setImage(Prata)
      } else if (totalScore <= 150) {
        setRank('Ouro')
        setImage(Ouro)
      } else if (totalScore <= 200) {
        setRank('Rubi')
        setImage(Rubi)
      } else if (totalScore <= 250) {
        setRank('Esmeralda')
        setImage(Esmeralda)
      } else if (totalScore <= 300) {
        setRank('Diamante')
        setImage(Diamante)
      } else {
        setRank('Mestre')
        setImage(Mestre)
      }
    }

    newRank()
  }, [completedTasks])

  const handleDeleteScore = () => {
    Alert.alert(
      'Apagar Pontuação',
      'Tem certeza de que deseja apagar sua pontuação? Isso limpará todos os seus pontos.',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Ação de exclusão cancelada'),
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => {
            deleteScore()
            console.log('Pontuação apagada com sucesso')
          }
        }
      ]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Atualmente você possui</Text>
      <Text style={styles.score}>{totalScore} pontos</Text>

      {completedTasks.length > 0 ? (
        <View style={styles.rank}>
          <Text style={styles.titleRank}>Sua patente é: {rank}</Text>
          <Image style={styles.img} source={image} />
        </View>
      ) : (
        <Text>Nenhuma tarefa concluída ainda.</Text>
      )}
      {completedTasks.length > 0 && (
        <ButtonApp title="Apagar a pontuação" onPress={handleDeleteScore} />
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
  },
  rank: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 4
  },
  titleRank: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  img: {
    width: 40,
    height: 40
  }
})

export default Dashboard
