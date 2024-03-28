import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button ,TextInput} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";



export default function Cadastro() {


    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Cadastro de Filmes</Text>

            <TextInput
                placeholder='Digite o Nome do Filme'>
            </TextInput>

            <TextInput
                placeholder='Digite o Genero do Filme'
            />

            <TextInput
                placeholder='Digite a Classificação do Filme'
            />

            <TextInput
                placeholder='Data cadastro'
            />
            <Button title="Cadastrar" />

        </SafeAreaView>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
