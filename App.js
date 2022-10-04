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
import ListadoGastos from './src/components/ListadoGastos';
import {generarID} from './src/helpers';

const App = () => {
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [presupuesto, setPresupuesto] = useState(0);
  const [gastos, setGastos] = useState([]);
  const [modal, setModal] = useState(false);
  const [gasto, setGasto] = useState({});

  const handleNuevoPresupuesto = presupuesto => {
    console.log('desde app', presupuesto);
    if (Number(presupuesto) > 0) {
      setIsValidPresupuesto(true);
    } else {
      Alert.alert('Error', 'El Presupuesto no puede ser 0 o menor');
    }
  };

  const handleGasto = gasto => {
    if ([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState,
      );
      setGastos(gastosActualizados);
    } else {
      // añadir el nuevo gasto al state
      gasto.id = generarID();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setModal(!modal);
  };

  const eliminarGasto = id => {
    Alert.alert(
      '¿Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'no', style: 'cancel'},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const gastosActualizados = gastos.filter(
              gastoState => gastoState.id !== id,
            );

            setGastos(gastosActualizados);
            setModal(!modal);
            setGasto({});
          },
        },
      ],
    );
  };

  return (
    <>
      <View>
        <StatusBar
          backgroundColor="#3B82F6"
          barStyle="light-content"></StatusBar>
      </View>

      <View style={styles.contenedor}>
        <ScrollView>
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

          {isValidPresupuesto && (
            <ListadoGastos
              gastos={gastos}
              setModal={setModal}
              setGasto={setGasto}
            />
          )}
        </ScrollView>

        {modal && (
          <Modal
            animationType="slide"
            visible={modal}
            onRequestClose={() => {
              setModal(!modal);
            }}>
            <FormularioGasto
              setModal={setModal}
              gasto={gasto}
              handleGasto={handleGasto}
              setGasto={setGasto}
              eliminarGasto={eliminarGasto}
            />
          </Modal>
        )}

        {isValidPresupuesto && (
          <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
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
    minHeight: 450,
  },
  pressable: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  imagen: {
    width: 60,
    height: 60,
  },
});

export default App;
