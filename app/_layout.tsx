import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";

export default function Layout() {
  return (
    <>
      <StatusBar backgroundColor="#334155" style="light" />
      <Stack
        screenOptions={{
          headerBackground: () => (
            <View
              style={{
                backgroundColor: "#334155",
                flexGrow: 1,
              }}
            ></View>
          ),
          headerTitle: (props) => (
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "900",
              }}
            >
              {props.children}
            </Text>
          ),
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Siliconvillage Teste",
          }}
        />
        <Stack.Screen
          name="[result]"
          options={{
            title: "Siliconvillage Teste",
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </>
  );
}
