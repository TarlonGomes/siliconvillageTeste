import { Link } from "expo-router";
import { View, Text, Button, Alert } from "react-native";
import React from "react";
import { getNumbers, insertNumber } from "../config/firebase";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
let nextPage: null | string = null;

export type numbersType = {
  Id: number;
  value: number;
};

export default function Home() {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState<numbersType[]>([]);

  React.useEffect(() => {
    getNumbers().then((c) => setData(c as numbersType[]));
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 4,
        flexGrow: 1,
        backgroundColor: "#020617",
      }}
    >
      <TextInput
        onChangeText={(v) => setValue(v)}
        placeholder="Insira um número"
        inputMode="decimal"
        style={{
          width: "100%",
          backgroundColor: "#64748b",
          marginVertical: 6,
          padding: 4,
          borderRadius: 5,
          paddingHorizontal: 8,
        }}
        placeholderTextColor={"#f1f5f9"}
      />

      <TouchableOpacity
        onPress={async () => {
          const n = Number(value);
          if (isNaN(n)) {
            Alert.alert("Caractere inválido");
            return;
          }
          const res = await insertNumber({ number: n });
          const newNumbers = await getNumbers();
          setData(newNumbers);
          nextPage = String(res.randomId);
        }}
        style={{
          width: "100%",
          backgroundColor: "#0284c7",
          padding: 8,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Inserir
        </Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        ListHeaderComponent={() => (
          <View
            style={{
              marginVertical: 16,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "800" }}>
              Escolha um Número
            </Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <Link href={`/${item.Id}`} asChild>
            <TouchableOpacity
              style={{
                width: "100%",
                padding: 5,
                backgroundColor: "#1e40af",
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "800",
                  fontSize: 16,
                  textAlign: "center",
                }}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
}
