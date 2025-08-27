import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
export default function TabsScreen() {

  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="search" options={{ headerShown: false }} />
      <Tabs.Screen name="save" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
}
const styles = StyleSheet.create({});
