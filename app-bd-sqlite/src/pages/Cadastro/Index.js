import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { DatabaseConnection } from '../../database/database';

const db = new DatabaseConnection.getConnection;

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [genero, setGenero] = useState('');
    const [classificacao, setClassificacao] = useState('');
    const navigation = useNavigation();

    const handleCadastro = () => {
        if (nome.trim() === '' || genero.trim() === '' || classificacao.trim() === '') {
            Alert.alert('Erro', 'Por favor, preencha todos os campos para cadastrar o filme');
            return;
        };

        db.transaction(
            tx => {
                tx.executeSql(
                    'INSERT INTO filmes(nome_filme,genero,classificacao,data_cad) VALUES(?, ?, ?, ?)',
                    [nome, genero, classificacao, new Date().toISOString()],
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
            <Text style={styles.title}>Cadastro de Filmes</Text>

            <TextInput
                style={styles.input}
                placeholder='Digite o Nome do Filme'
                value={nome}
                onChangeText={text => setNome(text)}
            />

            <TextInput
                style={styles.input}
                placeholder='Digite o Gênero do Filme'
                value={genero}
                onChangeText={text => setGenero(text)}
            />

            <TextInput
                style={styles.input}
                placeholder='Digite a Classificação do Filme'
                value={classificacao}
                onChangeText={text => setClassificacao(text)}
            />

            <Button title="Cadastrar" onPress={handleCadastro} color="#ff1493" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ff1493'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%'
    },
});
