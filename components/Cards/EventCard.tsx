import React from 'react';
import { Text, View, Dimensions, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format, parseISO, isBefore } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '@/utils/Routes';
import { GeneralSkeleton } from '../Skeletons/GeneralSkeleton';

const windowWidth = Dimensions.get('window').width;

export const EventCard = ({ item }) => {
  const navigation = useNavigation();
  const eventDate = parseISO(item.event_date); // Parse the event date
  const currentDate = new Date(); // Get the current date
  
  const goToArticle = () => {
    navigation.navigate(Routes.ShowEvent, {
      itemId: item.id
    })
  }

  return (
    <View style={{ width: windowWidth, padding: 10, paddingHorizontal: 10 }}>
      <TouchableOpacity 
        onPress={goToArticle}
        style={{ position: 'relative', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}
      >
        <TouchableOpacity
          
          style={{ flex: 1, gap: 7, justifyContent: 'flex-start' }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {!isBefore(eventDate, currentDate) ? <ComingSoon /> : <View />} 
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ fontSize: 12, fontWeight: '400', color: '#878787', textAlign: 'right' }}>{ item.time_to_read_minutes } دقيقة قراءة</Text>
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}> - </Text>
              <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>{item.event_date_humanly_readable}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 4 }}>
            <Ionicons name='location-sharp' size={20} color={'#878787'} />
            <Text
              style={{ fontSize: 13, fontWeight: '400', color: '#878787', textAlign: 'right' }}
            >
              {item.wilaya} - {item.location}
            </Text>
          </View>
          <Text
            style={{ fontSize: 13, fontWeight: '400', color: '#878787', textAlign: 'right' }}
            numberOfLines={2}
            ellipsizeMode='tail'
          >
            {item.summary.slice(0, 20)}..
          </Text>
        </TouchableOpacity>
        <View style={{ flexShrink: 0 }}>
          <View style={{ position: 'relative', height: 100, width: 100, borderColor: 'black', borderWidth: 2, borderRadius: 10 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <ActivityIndicator />
            </View>
            <Image source={{ uri: item.thumbnail }} style={{ position: 'absolute', top: -7, left: -7, height: 100, width: 100, borderRadius: 10 }} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ComingSoon = () => {
  return (
    <View style={{ 
      backgroundColor: '#22B07E', borderRadius: 20,
      paddingHorizontal: 20, paddingVertical: 3
     }}>
      <Text style={{ color: 'white' }}>قادمة</Text>
    </View>
  )
}
