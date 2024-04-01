import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Button, TextInput, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

const db = DatabaseConnection.getConnection();

export default function Home() {
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filmes, setFilmes] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchFilmes();
  }, []);

  const navigateToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const navigateToLista = () => {
    navigation.navigate('Lista');
  };

  const fetchFilmes = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM filmes',
        [],
        (_, { rows }) => {
          setFilmes(rows._array);
        },
        (_, error) => {
          console.error('Erro ao buscar os filmes:', error);
        }
      );
    });
  };

  const handleSearch = () => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM filmes WHERE nome_filme LIKE ? OR id = ?`,
        [`%${searchInput}%`, parseInt(searchInput)],
        (_, { rows }) => {
          setSearchResults(rows._array);
          setShowResults(true);
        },
        (_, error) => {
          console.error('Erro ao executar a consulta:', error);
          setSearchResults([]);
          setShowResults(false);
        }
      );
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.searchResultItem}>
      <Text style={styles.searchResultText}>ID: {item.id}</Text>
      <Text style={styles.searchResultText}>Nome do Filme: {item.nome_filme}</Text>
      <Text style={styles.searchResultText}>Gênero: {item.genero}</Text>
      <Text style={styles.searchResultText}>Classificação: {item.classificacao}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Cadastro" onPress={navigateToCadastro} color="#ff1493" />
        <View style={styles.space} />
        <Button title="Lista" onPress={navigateToLista} color="#ff1493" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar por nome ou ID"
        value={searchInput}
        onChangeText={setSearchInput}
      />
      <View style={styles.searchButtonContainer}>
        <Button title="Pesquisar" onPress={handleSearch} color="#ff1493" />
      </View>

      {showResults && (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  space: {
    width: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%'
  },
  searchButtonContainer: {
    marginBottom: 10,
    width: '100%'
  },
  searchResultItem: {
    backgroundColor: '#fce4ec',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    width: '100%' 
  },
  searchResultText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333'
  }
});
