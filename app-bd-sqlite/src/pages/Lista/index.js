import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { DatabaseConnection } from '../../database/database';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const db = DatabaseConnection.getConnection();

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [inputNomeFilme, setInputNomeFilme] = useState('');
  const [inputGenero, setInputGenero] = useState('');
  const [inputClassificacao, setInputClassificacao] = useState('');
  const [operacao, setOperacao] = useState('Incluir');
  const [idFilme, setIdFilme] = useState(null);
  const [nomeFilmeSelecionado, setNomeFilmeSelecionado] = useState('');

  useEffect(() => {
    atualizaRegistros();
  }, []);

  const atualizaRegistros = () => {
    try {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT id, nome_filme, genero, classificacao, strftime("%d/%m/%Y %H:%M:%S", data_cad) AS data_cadastro FROM filmes',
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
  

  const salvaFilme = () => {
    if (inputNomeFilme.trim() === '' || inputGenero.trim() === '' || inputClassificacao.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos para cadastrar o filme');
      return;
    }

    if (operacao === 'Incluir') {
      db.transaction(
        tx => {
          tx.executeSql(
            'INSERT INTO filmes (nome_filme, genero, classificacao) VALUES (?, ?, ?)',
            [inputNomeFilme, inputGenero, inputClassificacao],
            () => {
              limparCampos();
              atualizaRegistros();
            },
            (_, error) => {
              console.error('Erro ao adicionar filme:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao adicionar o filme.');
            }
          );
        }
      );
    } else if (operacao === 'Editar') {
      db.transaction(
        tx => {
          tx.executeSql(
            'UPDATE filmes SET nome_filme = ?, genero = ?, classificacao = ? WHERE id = ?',
            [inputNomeFilme, inputGenero, inputClassificacao, idFilme],
            () => {
              limparCampos();
              atualizaRegistros();
              setOperacao('Incluir');
              Alert.alert('Sucesso', 'Filme alterado com sucesso.');
            },
            (_, error) => {
              console.error('Erro ao editar filme:', error);
              Alert.alert('Erro', 'Ocorreu um erro ao editar o filme.');
            }
          );
        }
      );
    }
  };

  const handleEditarFilme = (nomeFilme, genero, classificacao, idFilme) => {
    setInputNomeFilme(nomeFilme);
    setInputGenero(genero);
    setInputClassificacao(classificacao);
    setOperacao('Editar');
    setIdFilme(idFilme);
    setNomeFilmeSelecionado(nomeFilme);
  };

  const excluirFilme = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'DELETE FROM filmes WHERE id = ?',
          [id],
          () => {
            atualizaRegistros();
            Alert.alert('Sucesso', 'Filme excluído com sucesso.');
          },
          (_, error) => {
            console.error('Erro ao excluir filme:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao excluir o filme.');
          }
        );
      }
    );
  };

  const limparCampos = () => {
    setInputNomeFilme('');
    setInputGenero('');
    setInputClassificacao('');
  };

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={inputNomeFilme}
            onChangeText={setInputNomeFilme}
            placeholder="Nome do Filme"
          />
          <TextInput
            style={styles.input}
            value={inputGenero}
            onChangeText={setInputGenero}
            placeholder="Gênero"
          />
          <TextInput
            style={styles.input}
            value={inputClassificacao}
            onChangeText={setInputClassificacao}
            placeholder="Classificação"
          />
          <TouchableOpacity style={styles.button} onPress={salvaFilme}>
            <Text style={styles.buttonText}>{operacao === 'Incluir' ? 'Adicionar' : 'Editar'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerScroll}>
          {filmes.map(filme => (
            <View key={filme.id} style={styles.filmeItem}>
              <Text>{filme.id}</Text>
              <Text>{filme.nome_filme}</Text>
              <Text>{filme.genero}</Text>
              <Text>{filme.classificacao}</Text>
              <View style={styles.buttonTable}>
                <TouchableOpacity onPress={() => excluirFilme(filme.id)}>
                  <FontAwesome6 name='trash-can' color={'red'} size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEditarFilme(filme.nome_filme, filme.genero, filme.classificacao, filme.id)}>
                  <FontAwesome6 name='pen-to-square' color={'silver'} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ff1493',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  containerScroll: {
    padding: 20,
    backgroundColor: '#fff',
  },
  filmeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonTable: {
    flexDirection: 'row',
    gap: 15,
  },
});
