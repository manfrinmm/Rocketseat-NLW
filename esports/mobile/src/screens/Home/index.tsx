import React from "react";
import { FlatList, Image, View } from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";
import GameCard from "../../components/GameCard";
import Heading from "../../components/Heading";
import { GAMES } from "../../utils/games";
import { styles } from "./styles";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={GAMES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard data={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}
