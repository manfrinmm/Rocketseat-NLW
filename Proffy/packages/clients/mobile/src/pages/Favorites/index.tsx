import React, { useCallback, useState, useEffect } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import Header from "../../Components/Header";
import TeacherItem, { Teacher } from "../../Components/TeacherItem";
import styles from "./styles";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem("@proffy:favorites").then(response => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);

        setFavorites(favoritedTeachers);
      }
    });
  }, []);

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <View style={styles.container}>
      <Header title="Meus Proffys favoritos" />

      <FlatList
        data={favorites}
        keyExtractor={({ id }) => String(id)}
        renderItem={({ item: teacher }) => (
          <TeacherItem teacher={teacher} favorited />
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 124,
        }}
      />
    </View>
  );
};

export default Favorites;
