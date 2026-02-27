import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

const CLAVE_CORRECTA = "1234";

const LoginScreen = () => {
  const [clave, setClave] = useState("");
  const [mostrarError, setMostrarError] = useState(false);
  const router = useRouter();

  const handleIngresar = () => {
    if (clave === CLAVE_CORRECTA) {
      setMostrarError(false);
      router.push("/calculadora/calculadora");
      return;
    }

    setMostrarError(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingresa tu clave</Text>
      <TextInput
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonWrap}>
        <Button title="Ingresar" onPress={handleIngresar} />
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={mostrarError}
        onRequestClose={() => setMostrarError(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Clave incorrecta</Text>
            <View style={styles.buttonWrap}>
              <Button title="Cerrar" onPress={() => setMostrarError(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    gap: 12,
  },
  label: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    padding: 10,
    borderRadius: 6,
    width: "100%",
    maxWidth: 320,
    alignSelf: "center",
  },
  buttonWrap: {
    width: "100%",
    maxWidth: 320,
    alignSelf: "center",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    gap: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default LoginScreen;
