import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Linking,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import * as MailComposer from "expo-mail-composer";

import styles from "./styles";
import api from "../../services/api";

interface ParamsProps {
  point_id: number;
}

interface ItemProps {
  id: number;
  image: string;
  title: string;
  image_url: string;
}

interface DataProps {
  point: {
    id: number;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    uf: string;
    city: string;
  };
  items: Array<ItemProps>;
}

const Detail: React.FC = () => {
  const [data, setData] = useState<DataProps>({} as DataProps);

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as ParamsProps;

  useEffect(() => {
    api.get(`/points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    });
  }, []);

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleWhatsapp = useCallback(() => {
    Linking.openURL(
      `whatsapp://send?phone=${data.point?.whatsapp}&text=Tenho interesse sobre coleta de resíduos`,
    );
  }, []);

  const handleMailComposer = useCallback(() => {
    MailComposer.composeAsync({
      subject: "Interesse na coleta de resíduos",
      recipients: [data.point?.email],
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!data.point ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack}>
              <Icon name="arrow-left" size={20} color="#34cb79" />
            </TouchableOpacity>

            <Image
              style={styles.pointImage}
              source={{
                uri: data.point.image_url,
              }}
            />

            <Text style={styles.pointName}>{data.point.name}</Text>
            <Text style={styles.pointItems}>
              {data.items.map(item => item.title).join(", ")}
            </Text>

            <View style={styles.address}>
              <Text style={styles.addressTitle}>{data.point.name}</Text>
              <Text style={styles.addressContent}>
                {data.point.city}, {data.point.uf}
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <RectButton style={styles.button} onPress={handleWhatsapp}>
              <FontAwesome name="whatsapp" size={20} color="#fff" />
              <Text style={styles.buttonText}>Whatsapp</Text>
            </RectButton>

            <RectButton style={styles.button} onPress={handleMailComposer}>
              <Icon name="mail" size={20} color="#fff" />
              <Text style={styles.buttonText}>E-mail</Text>
            </RectButton>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Detail;
