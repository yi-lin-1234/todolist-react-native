import { Tabs } from "expo-router";
import { Text } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        // Name of the route to hide.
        name="index"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="[id]"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        // Name of the route to hide.
        name="edit/[id]"
        options={{
          // This tab will no longer show up in the tab bar.
          href: null,
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "tasks",
          tabBarLabel: "tasks",
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: "new",
          tabBarIcon: () => (
            <MaterialIcons name="add-box" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "history",
          tabBarIcon: () => (
            <FontAwesome name="history" size={24} color="black" />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
