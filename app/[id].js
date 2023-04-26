import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import { getTaskById } from "../api/client";
import { updateStatusToFinished, deleteTask } from "../api/client";

const TaskDetails = () => {
  const { id } = useSearchParams();
  const [taskDetail, setTaskDetail] = useState({});
  const [refetch, setRefetch] = useState(false);
  const router = useRouter();

  //=========================================================

  async function completeTask() {
    try {
      await updateStatusToFinished(id);
      router.push(`/tasks`);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function deleteById() {
    try {
      await deleteTask(id);
      router.push(`/tasks`);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    async function getTaskDetail() {
      const data = await getTaskById(id);
      setTaskDetail(data);
    }
    getTaskDetail();
  }, [refetch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>id: {taskDetail.id}</Text>
      <Text style={styles.text}>title: {taskDetail.name}</Text>
      <Text style={styles.text}>priority: {taskDetail.priority}</Text>
      <Text style={styles.text}>difficulty: {taskDetail.difficulty}</Text>
      <Text style={styles.text}>estimate: {taskDetail.estimate}</Text>
      <Text style={styles.text}>created: {taskDetail.created}</Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#28A745",
          padding: 10,
          borderRadius: 15,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={completeTask}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            fontWeight: "600",
          }}
        >
          done
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#FFC007",
          padding: 10,
          borderRadius: 15,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => router.push(`/edit/${id}`)}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            fontWeight: "600",
          }}
        >
          edit
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#DC3444",
          padding: 10,
          borderRadius: 15,
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={deleteById}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            fontWeight: "600",
          }}
        >
          delete
        </Text>
      </TouchableOpacity>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c2c2e",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3a3a3c",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default TaskDetails;
