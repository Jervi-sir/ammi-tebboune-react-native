import React from 'react';
import { View, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { GeneralSkeleton } from './GeneralSkeleton';
const windowWidth = Dimensions.get('window').width;

export const ArticleCardSkeleton = () => {
  return (
    <View style={{ width: windowWidth, padding: 10, paddingHorizontal: 10 }}>
      <TouchableOpacity
        style={{ position: 'relative', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}
      >
        <View style={{ flex: 1, gap: 7, justifyContent: 'flex-end', direction: 'rtl' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#e0e0e0', width: 100, height: 20 }}>
              <GeneralSkeleton />
            </View>
          </View>
          <View style={{ backgroundColor: '#e0e0e0', height: 10, width: '60%', marginVertical: 5 }} >
            <GeneralSkeleton />
          </View>
          <View style={{ backgroundColor: '#e0e0e0', height: 10, width: '80%' }} >
            <GeneralSkeleton />
          </View>
          <View style={{ backgroundColor: '#e0e0e0', height: 10, width: '70%' }} >
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
      </TouchableOpacity>
    </View>
  );
};
