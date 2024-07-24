import { useNavigation } from "@react-navigation/native";
import { Text, View, Dimensions, Image, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native";
import { Routes } from "@/utils/Routes";
const windowWidth = Dimensions.get('window').width;

export const ArticleCard = ({ item }) => {
  const navigation = useNavigation();

  const goToArticle = () => {
    navigation.navigate(Routes.ShowArticle, {
      itemId: item.id
    })
  }

  return (
    <View style={{ width: windowWidth, padding: 10, paddingHorizontal: 10 }}>
      <TouchableOpacity 
        onPress={goToArticle}
        style={{ position: 'relative', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}
      >
        <View style={{ flex: 1, gap: 7, justifyContent: 'flex-start' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'black' }}>{ item.published_date_humanly_readable }</Text>
          </View>
          <Text style={{ fontSize: 12, fontWeight: '400', color: '#878787', textAlign: 'right' }}>{ item.time_to_read_minutes } دقيقة قراءة</Text>
          <Text
            style={{ fontSize: 13, fontWeight: '400', color: '#878787', textAlign: 'right' }}
            numberOfLines={2} // Limits the number of lines
            ellipsizeMode='tail' // Adds an ellipsis at the end if the text is too long
          >
            { item.summary.slice(0, 20) }...
          </Text>
        </View>
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
