import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import  {useNavigation}  from '@react-navigation/native'; 
import {DatabaseConnection} from '../../database/database';

const db = new DatabaseConnection.getConnection;

export default function Home() {
  
  

  const navigation = useNavigation();

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS filmes (
          id INTEGER PRIMARY KEY AUTOINCREMENT, 
          nome_filme TEXT NOT NULL, 
          genero TEXT NOT NULL, 
          classificacao TEXT NOT NULL, 
          data_cad DATETIME DEFAULT (datetime('now', 'localtime'))
      )`,
        [], 
        () => console.log('Tabela criada com sucesso'),
        (_, error) => console.error(error) 
      );
    });
  }, []);


  const navigateToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const navigateToLista = ()=>{
    navigation.navigate("Lista");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text >Tela HOME</Text>
      <Button title="Cadastro" onPress={navigateToCadastro} />

      <Button title='Lista' onPress={navigateToLista}/>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
});
