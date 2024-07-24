import { EventCard } from "@/components/Cards/EventCard";
import { EventCardSkeleton } from "@/components/Skeletons/EventCardSkeleton";
import { Api } from "@/utils/Api";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Platform, RefreshControl, ScrollView, StatusBar, Text, View } from "react-native";

const API_URL = Api.base + Api.listEvents; // Update the endpoint accordingly

export const M2Screen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [skeletonTriggered, setSkeletonTriggered] = useState(false);

  const fetchData = async (page, refreshing = false) => {
    if (loading || (!hasNextPage && !refreshing)) return;
    setLoading(true);
    try {
      const response = await axios.get(API_URL, { params: { page } });
      const { data: newData, pagination } = response.data;
      setData(refreshing ? newData : [...data, ...newData]);
      setPage(pagination.currentPage + 1);
      setHasNextPage(pagination.currentPage < pagination.lastPage);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setSkeletonTriggered(true);
      if (refreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    setSkeletonTriggered(false);
    fetchData(page);
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasNextPage) {
      fetchData(page);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchData(1, true);
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, Platform.OS === 'ios' ? 150 : 100],
    outputRange: [Platform.OS === 'ios' ? 100 : 70, 0],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <>
      <StatusBar />
      {/* Top */}
      <Animated.View style={{
        backgroundColor: 'black',
        height: headerHeight,
        justifyContent: 'center',
        alignItems: 'flex-end',
        opacity: headerOpacity,
      }}>
        <View style={{
          paddingTop: Platform.OS === 'ios' ? 50 : 5,
        }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
            الأحداث القادمة
          </Text>
        </View>
      </Animated.View>
      {/* Content */}
      {
        !skeletonTriggered
          ?
          <ScrollView
            style={{ backgroundColor: 'white' }}
          >
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </ScrollView>
          :

          <Animated.FlatList
            data={data}
            renderItem={({ item }) => (<EventCard item={item} />)}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            ListFooterComponent={() => (
              loading ? <ActivityIndicator size="large" color="#0000ff" /> : <View style={{ height: 20 }}></View>
            )}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
          />
      }
    </>
  );
};