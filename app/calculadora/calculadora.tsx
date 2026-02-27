import React, { useMemo, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

const CalculadoraScreen = () => {
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState<number[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const promedio = useMemo(() => {
    if (notas.length === 0) {
      return 0;
    }

    const suma = notas.reduce((acc, item) => acc + item, 0);
    return suma / notas.length;
  }, [notas]);

  const handleAgregar = () => {
    const valorNormalizado = nota.trim().replace(",", ".");
    const valorNumerico = Number(valorNormalizado);

    if (!valorNormalizado || Number.isNaN(valorNumerico) || valorNumerico < 0 || valorNumerico > 5) {
      setError("No valida");
      return;
    }

    setNotas((prev) => [...prev, valorNumerico]);
    setNota("");
    setError("");
  };

  const handleBorrar = () => {
    setNotas([]);
    setNota("");
    setError("");
  };

  const handleSalir = () => {
    router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de notas</Text>

      <TextInput
        value={nota}
        onChangeText={setNota}
        placeholder="Nota (0 a 5)"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.buttonWrap}>
        <Button title="Agregar" onPress={handleAgregar} />
      </View>

      <Text style={styles.promedio}>Promedio: {promedio.toFixed(2)}</Text>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerText]}>#</Text>
          <Text style={[styles.cell, styles.headerText]}>Nota</Text>
        </View>

        {notas.length === 0 ? (
          <View style={styles.row}>
            <Text style={styles.emptyText}>No hay notas registradas</Text>
          </View>
        ) : (
          notas.map((item, index) => (
            <View style={styles.row} key={`${item}-${index}`}>
              <Text style={styles.cell}>{index + 1}</Text>
              <Text style={styles.cell}>{item.toFixed(2)}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.buttonWrap}>
        <Button title="Borrar" onPress={handleBorrar} />
      </View>
      <View style={styles.buttonWrap}>
        <Button title="Salir" onPress={handleSalir} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 15,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 6,
    padding: 10,
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  promedio: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  table: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 6,
    overflow: "hidden",
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  headerRow: {
    backgroundColor: "#efefef",
  },
  cell: {
    width: "50%",
    fontSize: 15,
  },
  headerText: {
    fontWeight: "700",
  },
  emptyText: {
    width: "100%",
    textAlign: "center",
    color: "#666",
  },
  buttonWrap: {
    width: "100%",
    maxWidth: 320,
    alignSelf: "center",
  },
});

export default CalculadoraScreen;
