import React from 'react';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation corretamente

export default function Home() {
  const navigation = useNavigation();

  const navigateToCadastro = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Tela HOME</Text>
      <Button title="Cadastro" onPress={navigateToCadastro} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
