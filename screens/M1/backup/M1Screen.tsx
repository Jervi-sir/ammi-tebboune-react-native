import React, { useEffect, useState, useRef } from 'react';
import { View, useWindowDimensions, StyleSheet, ActivityIndicator, Text, TouchableOpacity, Animated, Platform, ScrollView, RefreshControl, FlatList } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import axios from 'axios';
import { Api } from '@/utils/Api';
import { ArticleCardSkeleton } from '@/components/Skeletons/ArticleCardSkeleton';
import { ArticleCard } from '@/components/Cards/ArticleCard';
import { StatusBarTop } from '@/components/StatusBarTop';

export const M1Screen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [scenes, setScenes] = useState({});
  const [loading, setLoading] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchTabData = async () => {
      try {
        const response = await axios.get(Api.base + Api.listCategories);
        const tabs = response.data.categories;

        const newRoutes = tabs.map((tab, idx) => ({
          key: `tab-${idx}`,
          title: tab.name,
        }));

        const newScenes = tabs.reduce((acc, tab, idx) => {
          acc[`tab-${idx}`] = () => (
            <TabArticleSection category={tab.name} scrollY={scrollY} />
          );
          return acc;
        }, {});

        setRoutes(newRoutes);
        setScenes(newScenes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tabs:', error);
        setLoading(false);
      }
    };

    fetchTabData();
  }, []);

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

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const isFocused = props.navigationState.index === i;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => setIndex(i)}
              style={[
                styles.tabItem,
                isFocused ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Text style={isFocused ? styles.activeText : styles.inactiveText}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <StatusBarTop />
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
            Categories
          </Text>
        </View>
      </Animated.View>
      <ScrollView
        style={{ backgroundColor: 'white' }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <TabView
          initialLayout={{ width: layout.width }}
          navigationState={{ index, routes }}
          renderScene={SceneMap(scenes)}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </ScrollView>
    </>
  );
};

const TabArticleSection = ({ category, scrollY }) => {
  const API_URL = Api.base + Api.listArticles; 
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
      const response = await axios.get(API_URL, { params: { category, page } });
      const { articles: newData, pagination } = response.data;
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
  }, [category]);

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

  return (
    <>
      {
        !skeletonTriggered
          ?
          <ScrollView
            style={{ backgroundColor: 'white' }}
          >
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
          </ScrollView>
          :
          <FlatList
            style={{ backgroundColor: 'white' }}
            data={data}
            renderItem={({ item }) => (<ArticleCard item={item} />)}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            ListFooterComponent={() => (
              loading ? <ActivityIndicator size="large" color="#0000ff" /> : <View style={{ height: 20 }}></View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  activeTab: {
    backgroundColor: 'black',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  activeText: {
    color: 'white',
  },
  inactiveText: {
    color: 'black',
  },
});
