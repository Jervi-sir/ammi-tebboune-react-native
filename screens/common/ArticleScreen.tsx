import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Api } from "@/utils/Api";
import { Dimensions } from 'react-native';
import { SkeletonScreen } from "./SkeletonScreen";
import { HtmlWrapper } from "@/components/HtmlWrapper";

const windowWidth = Dimensions.get('window').width;

export const ArticleScreen = ({ route }) => {
  const navigation = useNavigation();
  const { itemId } = route.params;
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(`${Api.base}${Api.getThisArticle}${itemId}`);
        setArticle(response.data.article);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getItem();
  }, [itemId]);

  if (loading) {
    return <SkeletonScreen />;
  }

  if (error) {
    return (
      <View>
        <Text>Error loading article details.</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView>
        <View style={{ position: 'relative' }}>
          {/* Go Back */}
          <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? 40 : 20, left: 20, zIndex: 99 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                width: 46, height: 46, backgroundColor: 'white', borderRadius: 28,
                alignItems: 'center', justifyContent: 'center'
              }}
            >
              <Ionicons name="chevron-back" size={30} color={'black'} />
            </TouchableOpacity>
          </View>

          {/* Image */}
          <View>
            {article.thumbnail ? (
              <Image
                source={{ uri: article.thumbnail }}
                style={{ width: '100%', height: 500 }}
              />
            ) : (
              <View style={{ width: '100%', height: 500, backgroundColor: 'black' }}></View>
            )}
          </View>
        </View>
        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 30, marginTop: -40, gap: 2 }}>
          {/* Title */}
          <Text style={{ fontSize: 24, fontWeight: '600', color: 'black', textAlign: 'right' }}>
            {article.title}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: '400', color: '#9C9C9C', textAlign: 'right' }}>
            {article.created_at_humanly_readable} - {article.time_to_read_minutes} دقائق قراءة
          </Text>
          {/* HTML Content */}
          <View style={{ marginTop: 10, direction: 'rtl' }}>
            <HtmlWrapper content={article.content} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
