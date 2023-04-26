import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import React, { useState, useEffect } from "react";
import { getTaskById, updateTask } from "../../api/client";

const Edit = () => {
  const [name, setName] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const { id } = useSearchParams();
  const [taskDetail, setTaskDetail] = useState({});

  //============================================================

  const [currentPriority, setCurrentPriority] = useState(null);
  const priorityList = [
    { label: "low", value: "low" },
    { label: "moderate", value: "moderate" },
    { label: "high", value: "high" },
    { label: "urgent", value: "urgent" },
  ];

  //============================================================

  const [currentDifficulty, setCurrentDifficulty] = useState(null);
  const difficultyList = [
    { label: "easy", value: "easy" },
    { label: "moderate", value: "moderate" },
    { label: "hard", value: "hard" },
  ];

  //============================================================

  const [currentEstimate, setCurrentEstimate] = useState(null);
  const estimateList = [
    { label: "mins", value: "mins" },
    { label: "hours", value: "hours" },
    { label: "days", value: "days" },
    { label: "weeks", value: "weeks" },
    { label: "months", value: "months" },
    { label: "years", value: "years" },
  ];

  //============================================================

  useEffect(() => {
    async function getTaskDetail() {
      const data = await getTaskById(id);
      setName(data.name);
      setCurrentPriority(data.priority);
      setCurrentDifficulty(data.difficulty);
      setCurrentEstimate(data.estimate);
    }
    getTaskDetail();
  }, []);

  //============================================================

  const handleOnUpdate = () => {
    //Check for the name TextInput
    if (!name.trim()) {
      alert("please enter name");
      return;
    }
    //Check for the priority dropdown
    if (currentPriority === null) {
      alert("please enter priority");
      return;
    }
    //Check for the difficulty dropdown
    if (currentDifficulty === null) {
      alert("please enter difficulty");
      return;
    }
    //Check for the estimate dropdown
    if (currentEstimate === null) {
      alert("please enter estimate");
      return;
    }
    //Checked Successfully
    //Do whatever you want
    try {
      const body = {
        name: name,
        priority: currentPriority,
        difficulty: currentDifficulty,
        estimate: currentEstimate,
      };

      updateTask(id, body);
    } catch (err) {
      console.error(err.message);
    }

    setName("");
    setCurrentPriority(null);
    setCurrentDifficulty(null);
    setCurrentEstimate(null);
    alert("success update task");
  };

  //============================================================

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 20,
          borderRadius: 15,
        }}
      >
        <TextInput
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          onChangeText={setName}
          value={name}
          placeholder="description"
          required
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={priorityList}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="priority level"
          value={currentPriority}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCurrentPriority(item.value);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={difficultyList}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="difficulty level"
          value={currentDifficulty}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCurrentDifficulty(item.value);
            setIsFocus(false);
          }}
        />
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={estimateList}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="estimate time to finish"
          value={currentEstimate}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setCurrentEstimate(item.value);
            setIsFocus(false);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "#FFC007",
            padding: 20,
            borderRadius: 15,
            alignItems: "center",
          }}
          onPress={handleOnUpdate}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              fontWeight: "600",
            }}
          >
            update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333",
    padding: 16,
    justifyContent: "center",
    alignContent: "center",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Edit;
