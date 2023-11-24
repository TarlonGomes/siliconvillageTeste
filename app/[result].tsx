import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { getNumber } from "../config/firebase";
import { numbersType } from ".";
import { extenso } from "../utils/estenso";

const numberExt = function (c: number) {};

export default function Result() {
  const { result } = useLocalSearchParams();
  const [data, setData] = React.useState<numbersType | undefined>(undefined);

  React.useEffect(() => {
    if (typeof result === "string") {
      getNumber({ id: Number(result) }).then((r) => setData(r));
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        padding: 4,
        flexGrow: 1,
        backgroundColor: "#020617",
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontWeight: "700",
          fontSize: 20,
          marginTop: 40,
        }}
      >
        {data?.value}
      </Text>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontWeight: "700",
          fontSize: 20,
          marginTop: 4,
        }}
      >
        {extenso(data?.value)}
      </Text>
    </SafeAreaView>
  );
}
