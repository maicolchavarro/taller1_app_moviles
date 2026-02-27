import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";

const PerfilScreen = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla principal</Text>
      <View style={styles.buttonWrap}>
        <Button
          title={show ? "Iniciar sesion" : "Ir a login"}
          onPress={() => {
            setShow((prev) => !prev);
            router.push("/login/login");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
    fontSize: 20,
    fontWeight: "600",
  },
  buttonWrap: {
    width: "100%",
    maxWidth: 320,
    alignSelf: "center",
  },
});

export default PerfilScreen;
