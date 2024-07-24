import React, { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator, ScrollView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Api } from "@/utils/Api";
import { Dimensions } from 'react-native';
import { SkeletonScreen } from "./SkeletonScreen";
import { HtmlWrapper } from "@/components/HtmlWrapper";

const windowWidth = Dimensions.get('window').width;

export const EventScreen = ({ route }) => {
  const navigation = useNavigation();
  const { itemId } = route.params;
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(`${Api.base}${Api.getThisEvent}${itemId}`);
        setEvent(response.data.event);
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
        <Text>Error loading event details.</Text>
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
            {event.thumbnail ? (
              <Image
                source={{ uri: event.thumbnail }}
                style={{ width: '100%', height: 500 }}
              />
            ) : (
              <View style={{ width: '100%', height: 500, backgroundColor: 'black' }}></View>
            )}
          </View>
        </View>
        <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 30, marginTop: -40, gap: 10 }}>
          {/* Title */}
          <View>
            <Text style={{ fontSize: 24, fontWeight: '600', color: 'black', textAlign: 'right' }}>
              {event.title}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: '400', color: 'black', textAlign: 'right' }}>
              {event.event_date}
            </Text>
            <View style={{ flexDirection: 'row-reverse', gap: 4 }}>
              <Ionicons name='location-sharp' size={20} color={'#878787'} />
              <Text style={{ fontSize: 14, fontWeight: '400', color: 'black', textAlign: 'right' }}>
                {event.wilaya} - {event.location}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 15, fontWeight: '400', color: '#9C9C9C', textAlign: 'right' }}>
            {event.created_at_humanly_readable} - {event.time_to_read_minutes} دقائق قراءة
          </Text>
          {/* HTML Content */}
          <HtmlWrapper content={event.content} />
        </View>
      </ScrollView>
    </>
  );
};
