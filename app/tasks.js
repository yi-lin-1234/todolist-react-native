import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { getSortedData } from "../api/client";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [refetch, setRefetch] = useState(false);

  //==========================================================

  useEffect(() => {
    async function getTask() {
      const data = await getSortedData("id", "ascending");
      setTasks(data);
    }
    getTask();
  }, [refetch]);

  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          backgroundColor: "#017BFE",
          padding: 10,
          borderRadius: 15,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => setRefetch(!refetch)}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            fontWeight: "600",
          }}
        >
          refresh
        </Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {tasks.map((task, index) => (
          <TouchableOpacity
            key={index}
            style={styles.taskContainer}
            onPress={() => router.push(`/${task.id}`)}
          >
            <Text style={styles.taskTitle}>{task.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333",
  },
  scrollView: {
    marginTop: 20,
  },
  taskContainer: {
    backgroundColor: "#444",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
});

export default Tasks;
