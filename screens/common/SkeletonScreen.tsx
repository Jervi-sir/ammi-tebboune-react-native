import { useNavigation } from "@react-navigation/native";
import { Platform, ScrollView, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { GeneralSkeleton } from "@/components/Skeletons/GeneralSkeleton";

export const SkeletonScreen = () => {
  const navigation = useNavigation();
  return (
    <>
    <ScrollView>
      <View style={{ position: 'relative' }}>
        {/* Go Back */}
        <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? 40 : 20, left: 20, zIndex: 99 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 46, height: 46, backgroundColor: '#e0e0e0', borderRadius: 28,
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Ionicons name="chevron-back" size={30} color={'white'} />
          </TouchableOpacity>
        </View>

        {/* Image Skeleton */}
        <View style={{ width: '100%', height: 500, backgroundColor: '#e0e0e0' }}>
          <GeneralSkeleton />
        </View>
      </View>
      <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 30, marginTop: -40, gap: 2 }}>
        {/* Title Skeleton */}
        <View style={{ backgroundColor: '#e0e0e0', height: 30, width: '60%', marginBottom: 10 }} >
          <GeneralSkeleton />
        </View>
        <View style={{ backgroundColor: '#e0e0e0', height: 20, width: '40%', marginBottom: 20 }} >
          <GeneralSkeleton />
        </View>
        {/* Content Skeleton */}
        <View style={{ backgroundColor: '#e0e0e0', height: 200, width: '100%' }} >
          <GeneralSkeleton />
        </View>
      </View>
    </ScrollView>
  </>
  )
}
