import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Link href="/profile">Profile</Link>
      <Link href="/movie/demo">Home</Link>
    </View>
  );
}
