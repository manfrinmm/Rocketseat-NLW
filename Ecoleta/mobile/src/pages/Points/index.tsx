import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import MapView, { Marker } from "react-native-maps";

import { Feather as Icon } from "@expo/vector-icons";
import * as Location from "expo-location";

import styles from "./styles";
import api from "../../services/api";

interface ItemProps {
  id: number;
  image: string;
  title: string;
  image_url: string;
}

interface PointProps {
  id: number;
  image_url: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface ParamsProps {
  city: string;
  uf: string;
}

const Points: React.FC = () => {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [points, setPoints] = useState<PointProps[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as ParamsProps;

  useEffect(() => {
    api.get("/items").then(response => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get("/points", {
        params: {
          city: routeParams.city,
          uf: routeParams.uf,
          items: selectedItems,
        },
      })
      .then(response => {
        setPoints(response.data);
      });
  }, [routeParams, selectedItems]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "✨ Aopa...",
          "Precisamos da sua permissão para obter a localização.",
        );

        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleNavigateToDetail = useCallback((point_id: number) => {
    navigation.navigate("Detail", { point_id });
  }, []);

  const handleSelectItems = useCallback(
    (id: number) => {
      const itemAlreadySelected = selectedItems.includes(id);

      if (itemAlreadySelected) {
        setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        return;
      }

      setSelectedItems([...selectedItems, id]);
    },
    [selectedItems],
  );

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={20} color="#34cb79" />
        </TouchableOpacity>

        <Text style={styles.title}>😀 Bem Vindo.</Text>
        <Text style={styles.description}>
          Encontre no mapa um ponto de coleta.
        </Text>

        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              loadingEnabled={initialPosition[0] === 0}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map(point => (
                <Marker
                  key={String(point.id)}
                  style={styles.mapMarker}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  onPress={() => {
                    handleNavigateToDetail(point.id);
                  }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image
                      style={styles.mapMarkerImage}
                      source={{
                        uri: point.image_url,
                      }}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {items.map(item => (
            <TouchableOpacity
              style={[
                styles.item,
                selectedItems.includes(item.id) && styles.selectedItem,
              ]}
              activeOpacity={0.6}
              key={String(item.id)}
              onPress={() => {
                handleSelectItems(item.id);
              }}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title} </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Points;
