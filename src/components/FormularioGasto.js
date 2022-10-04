import React, {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import globalStyles from '../styles';

const FormularioGasto = ({
  setModal,
  handleGasto,
  setGasto,
  gasto,
  eliminarGasto,
}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setId(gasto.id);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorBotones}>
        <Pressable
          onPress={() => {
            setModal(false);
            setGasto({});
          }}
          style={[styles.btn, styles.btnCancelar]}>
          <Text style={styles.btnTexto}>Cancelar</Text>
        </Pressable>
        <Pressable
          onPress={() => eliminarGasto(id)}
          style={[styles.btn, styles.btnEliminar]}>
          <Text style={styles.btnTexto}>Eliminar</Text>
        </Pressable>
      </View>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>
          {gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}
        </Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre Gasto Ej. Comida"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad de Gasto Ej. 300"
            keyboardType="numeric"
            value={cantidad}
            onChangeText={setCantidad}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Categoria Gasto</Text>
          <Picker
            selectedValue={categoria}
            onValueChange={valor => {
              setCategoria(valor);
            }}>
            <Picker.Item label="---Selecciona---" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Gastos Varios" value="gastos" />
            <Picker.Item label="Ocio" value="ocio" />
            <Picker.Item label="Salud" value="salud" />
            <Picker.Item label="Suscripciones" value="suscripciones" />
          </Picker>
        </View>

        <Pressable
          style={styles.submitBtn}
          onPress={() => handleGasto({nombre, cantidad, categoria, id, fecha})}>
          <Text style={styles.submitBtnTexto}>
            {gasto?.nombre ? 'Guardar cambios gasto' : 'Agregar Gasto'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#1e40ef',
    flex: 1,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    flex: 1,
  },
  btnCancelar: {
    backgroundColor: '#db2777',
  },
  btnEliminar: {
    backgroundColor: 'red',
  },
  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748b',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748b',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: '#3b82f6',
    padding: 10,
    marginTop: 20,
  },
  submitBtnTexto: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default FormularioGasto;
