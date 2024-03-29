import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { DatabaseConnection } from '../../database/database';

const db = DatabaseConnection.getConnection();

export default function Lista() {
  const [filmes, setFilmes] = useState([]);

  const atualizaRegistros = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM filmes',
          [],
          (_, { rows }) => {
            setFilmes(rows._array);
          }
        );
      });
    } catch (error) {
      console.error('Erro ao buscar todos:', error);
    }
  };

  useEffect(() => {
    atualizaRegistros();
  }, []);

  const excluiFilme = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'DELETE FROM filmes WHERE id = ?',
          [id],
          () => {
            console.log('Filme excluído com sucesso');
            atualizaRegistros();
          },
          (_, error) => {
            console.error('Erro ao excluir filme:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o filme.');
          }
        );
      }
    );
  };

  const handleButtonPress = (nomeFilme) => {
    // Aqui você pode fazer o que quiser com o nome do filme
    console.log('Nome do filme:', nomeFilme);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.containerScroll}>
        {filmes.map(filme => (
          <View key={filme.id} style={styles.filmeItem}>
            <Text>{filme.id}</Text>
            <Text>{filme.nome_filme}</Text>
            <Text>{filme.genero}</Text>
            <Text>{filme.classificacao}</Text>
            <View style={styles.buttonTable}>
              <TouchableOpacity onPress={() => {
                Alert.alert(
                  "Atenção!",
                  'Deseja excluir o registro selecionado?',
                  [
                    {
                      text: 'OK',
                      onPress: () => excluiFilme(filme.id)
                    },
                    {
                      text: 'Cancelar',
                      onPress: () => { return },
                      style: 'cancel',
                    }
                  ],
                )
              }}>
                <FontAwesome6 name='trash-can' color={'red'} size={24} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { handleButtonPress(filme.nome_filme) }}>
                <FontAwesome6 name='pen-to-square' color={'silver'} size={24} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
    padding: 10,
  },
  filmeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  buttonTable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
