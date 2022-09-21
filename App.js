import React from 'react';
import {useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);

  const handleNuevoPresupuesto = presupuesto => {
    console.log('desde app', presupuesto);
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El Presupuesto no puede ser 0 o menor');
    }
  };

  return (
    <>
      <View>
        <StatusBar
          backgroundColor="#3B82F6"
          barStyle="light-content"></StatusBar>
      </View>

      <View style={styles.contenedor}>
        <View style={styles.header}>
          <Header />
          {isValidPresupuesto ? (
            <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} />
          ) : (
            <NuevoPresupuesto
              presupuesto={presupuesto}
              setPresupuesto={setPresupuesto}
              handleNuevoPresupuesto={handleNuevoPresupuesto}
            />
          )}
        </View>

        {modal && (
          <Modal
            animationType="slide"
            visible={modal}
            onRequestClose={() => {
              setModal(!modal);
            }}>
            <FormularioGasto setModal={setModal} />
          </Modal>
        )}

        {isValidPresupuesto && (
          <Pressable onPress={() => setModal(!modal)}>
            <Image
              style={styles.imagen}
              source={require('./src/img/nuevo-gasto.png')}
            />
          </Pressable>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {
    backgroundColor: '#3B82F6',
  },
  imagen: {
    width: 60,
    height: 60,
    position: 'absolute',
    top: 120,
    right: 20,
  },
});

export default App;
