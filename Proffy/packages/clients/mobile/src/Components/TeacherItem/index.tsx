import React, { useCallback, useState } from "react";
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import AsyncStorage from "@react-native-community/async-storage";
import { api } from "@shared/services";

import heartOutLineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import styles from "./styles";

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar_url: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const { id, subject, cost, name, avatar_url, whatsapp, bio } = teacher;

  const handleLinkToWhatsapp = useCallback(() => {
    api.post("/connections", {
      user_id: id,
    });

    Linking.openURL(`whatsapp://send?phone=${whatsapp}`);
  }, [id, whatsapp]);

  const handleToggleFavorites = useCallback(async () => {
    const favorites = await AsyncStorage.getItem("@proffy:favorites");

    let favoritesArray: Teacher[] = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoriteIndex = favoritesArray.findIndex(
        teacherItem => teacherItem.id === teacher.id,
      );

      favoritesArray.splice(favoriteIndex, 1);

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }

    await AsyncStorage.setItem(
      "@proffy:favorites",
      JSON.stringify(favoritesArray),
    );
  }, [isFavorited, teacher]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: avatar_url }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subject}>{subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora <Text style={styles.priceValue}>{cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited && styles.favorited]}
            onPress={handleToggleFavorites}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutLineIcon} />
            )}
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
