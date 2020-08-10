import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { api } from "@shared/services";

import Header from "../../Components/Header";
import TeacherItem, { Teacher } from "../../Components/TeacherItem";
import styles from "./styles";

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem("@proffy:favorites").then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response) as Teacher[];
        const favoritedTeachersIds = favoritedTeachers.map(
          teacher => teacher.id,
        );

        setFavorites(favoritedTeachersIds);
      }
    });
  }, []);

  const searchTeachers = useCallback(async () => {
    try {
      const response = await api.get("/classes", {
        params: {
          week_day,
          time,
          subject,
        },
      });

      setTeachers(response.data);
      setIsFiltersVisible(false);

      loadFavorites();
    } catch (error) {
      Alert.alert("Erro ao buscar dados", "Por favor, verifique os campos");
    }
  }, [loadFavorites, subject, time, week_day]);

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFiltersVisible(state => !state);
  }, []);

  const headerRightButton = (
    <BorderlessButton onPress={handleToggleFiltersVisible}>
      <Feather name="filter" size={20} color="#fff" />
    </BorderlessButton>
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Header title="Proffys disponíveis" headerRight={headerRightButton}>
          {isFiltersVisible && (
            <View style={styles.searchForm}>
              <Text style={styles.label}>Matéria</Text>
              <TextInput
                style={styles.input}
                placeholder="Qual a matéria?"
                placeholderTextColor="#c1bccc"
                value={subject}
                onChangeText={setSubject}
              />

              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#c1bccc"
                    value={week_day}
                    onChangeText={setWeek_day}
                  />
                </View>

                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Qual horário?"
                    placeholderTextColor="#c1bccc"
                    value={time}
                    onChangeText={setTime}
                  />
                </View>
              </View>

              <RectButton style={styles.submitButton} onPress={searchTeachers}>
                <Text style={styles.submitButtonText}>Filtrar</Text>
              </RectButton>
            </View>
          )}
        </Header>
      </KeyboardAvoidingView>

      <FlatList
        data={teachers}
        keyExtractor={({ id }) => String(id)}
        renderItem={({ item: teacher }) => (
          <TeacherItem
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 124,
        }}
      />
    </View>
  );
};

export default TeacherList;
