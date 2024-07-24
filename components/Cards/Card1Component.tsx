import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Routes } from "@/utils/Routes";
import { GeneralSkeleton } from "../Skeletons/GeneralSkeleton";

export const Card1Component = ({ item }) => {
  const navigation = useNavigation();
  const goToArticle = () => {
    navigation.navigate(Routes.ShowArticle, {
      itemId: item.id
    })
  }

  return (
    <>
      <TouchableOpacity
        onPress={goToArticle}
        style={{ maxWidth: 200,  paddingVertical: 10,gap: 10 }}
      >
        <View style={{ position: 'relative', backgroundColor: '#D9D9D9', width: 200, height: 200, overflow: 'hidden', borderRadius: 10 }}>
          <GeneralSkeleton />
          <Image source={{ uri: item.thumbnail }} style={{ position: 'absolute', height: '100%', width: '100%' }} />
        </View>
        <View>
          <Text style={{ fontSize: 16, color: 'white', textAlign: 'right' }}>{item.title}</Text>
          <Text style={{ fontSize: 8, color: 'gray', opacity: 0.8, textAlign: 'right' }}>
            منذ {item.created} دقيقة
            -{' '}
            {item.time_to_read_minutes} دقائق قراءة
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};