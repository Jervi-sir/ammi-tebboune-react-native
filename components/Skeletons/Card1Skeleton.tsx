import { View } from "react-native";
import { GeneralSkeleton } from "./GeneralSkeleton";

export const Card1Skeleton = () => {
  return (
    <View style={{ maxWidth: 200, gap: 10 }}>
      <View style={{ backgroundColor: 'gray', width: 200, height: 200, borderRadius: 10 }} >
        <GeneralSkeleton />
      </View>
      <View style={{ backgroundColor: 'gray', height: 20, borderRadius: 10, marginTop: 2 }} >
        <GeneralSkeleton />
      </View>
      <View style={{ backgroundColor: 'gray', height: 10, width: '60%', marginLeft: 'auto', borderRadius: 10 }} >
        <GeneralSkeleton />
      </View>
    </View>
  );
};