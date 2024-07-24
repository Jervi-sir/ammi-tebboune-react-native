import React from 'react';
import { View, Text, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GeneralSkeleton } from './GeneralSkeleton';

const windowWidth = Dimensions.get('window').width;

export const EventCardSkeleton = () => {
  return (
    <View style={{ width: windowWidth, padding: 10, paddingHorizontal: 10 }}>
      <View
        style={{ position: 'relative', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}
      >
        <View style={{ flex: 1, gap: 7, justifyContent: 'flex-start', direction: 'rtl'}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <View style={{ backgroundColor: '#e0e0e0', height: 10, width: '30%' }} >
                <GeneralSkeleton />
              </View>
              <View style={{ backgroundColor: '#e0e0e0', height: 10, width: '50%' }} >
                <GeneralSkeleton />
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ backgroundColor: '#e0e0e0', height: 10, width: '80%' }} >
              <GeneralSkeleton />
            </View>
          </View>
          <View style={{ backgroundColor: '#e0e0e0', height: 10, width: '90%', marginTop: 5 }} >
            <GeneralSkeleton />
          </View>
          <View style={{ backgroundColor: '#e0e0e0', height: 10, width: '85%' }} >
            <GeneralSkeleton />
          </View>
        </View>
        <View style={{ flexShrink: 0 }}>
          <View style={{ position: 'relative', height: 100, width: 100, borderColor: 'black', borderWidth: 2, borderRadius: 10 }}>
            <View style={{ position: 'absolute', top: -7, left: -7, backgroundColor: '#e0e0e0', height: 100, width: 100, borderRadius: 10 }} >
              <GeneralSkeleton />
            </View>
          </View>
        </View>
      </View>
    </View >
  );
};
