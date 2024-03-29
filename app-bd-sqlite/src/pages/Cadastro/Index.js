import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { DatabaseConnection } from '../../database/database';

const db = new DatabaseConnection.getConnection;

export default function Cadastro() {

    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [classificacao, setClassificacao] = useState('');

    const handleCadastro = () => {
        if (nome.trim() === '' || genero.trim() === '' || classificacao.trim() === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos para cadastrar o filme');
            return;
        };

        db.transaction(
            tx => {
                tx.executeSql(
                  
                    'INSERT INTO filmes(nome_filme,genero,classificacao) VALUES( ? ,? ,?) ',
                    [nome, genero, classificacao],
                
                    (_, { rowsAffected }) => {
                        
                        console.log(rowsAffected);
                        setNome('');
                        setGenero('');
                        setClassificacao('');

                        Alert.alert('Sucesso', 'Filme cadastrado com sucesso.');
                    },
                    (_, error) => {
                        console.error('Erro ao cadastrar filme:', error);
                        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o filme.');
                    }

                )
            }
        )


    };


    return (
        <SafeAreaView style={styles.container}>
            <Text>Cadastro de Filmes</Text>

            <TextInput
                placeholder='Digite o Nome do Filme'
                value={nome}
                onChangeText={text => setNome(text)}
            />

            <TextInput
                placeholder='Digite o Gênero do Filme'
                value={genero}
                onChangeText={text => setGenero(text)}
            />

            <TextInput
                placeholder='Digite a Classificação do Filme'
                value={classificacao}
                onChangeText={text => setClassificacao(text)}
            />

            <Button title="Cadastrar" onPress={handleCadastro} />
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    }
})
