import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import PickerSelect from "react-native-picker-select";

import axios from "axios";

import { Feather } from "@expo/vector-icons";

import styles from "./styles";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home: React.FC = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }

    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const citiesNames = response.data.map(city => city.nome);

        setCities(citiesNames);
      });
  }, [selectedUf]);

  const handleNavigateToPoints = useCallback(() => {
    navigation.navigate("Points", {
      uf: selectedUf,
      city: selectedCity,
    });
  }, [selectedUf, selectedCity]);

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      imageStyle={{ width: 274, height: 368 }}
      style={styles.container}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coletas de forma eficiente.
        </Text>
      </View>

      {ufs.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <>
          <PickerSelect
            style={{
              placeholder: {
                color: "#7159c1",
              },
              viewContainer: {
                marginBottom: 8,
                borderColor: "#6C6C80",
                borderWidth: 1,
                borderRadius: 8,
              },
            }}
            onValueChange={value => {
              setSelectedUf(value);
            }}
            value={selectedUf}
            placeholder={{ label: "Selecione um Estado" }}
            items={ufs.map(uf => ({ label: uf, value: uf }))}
          />
          <PickerSelect
            style={{
              placeholder: {
                color: "#7159c1",
              },
              viewContainer: {
                borderColor: "#6C6C80",
                borderWidth: 1,
                borderRadius: 8,
              },
            }}
            onValueChange={value => {
              setSelectedCity(value);
            }}
            value={selectedCity}
            placeholder={{ label: "Selecione uma Cidade" }}
            items={cities.map(city => ({ label: city, value: city }))}
          />
        </>
      )}

      <View style={styles.footer}>
        <RectButton
          style={[styles.button, !selectedCity && { opacity: 0.7 }]}
          onPress={handleNavigateToPoints}
          enabled={!!selectedCity}
        >
          <View style={styles.buttonIcon}>
            <Text>
              <Feather name="arrow-right" color="#fff" size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

export default Home;
