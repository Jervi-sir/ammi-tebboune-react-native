import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView, RefreshControl, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import { Api } from '@/utils/Api';
import { ArticleCardSkeleton } from '@/components/Skeletons/ArticleCardSkeleton';
import { ArticleCard } from '@/components/Cards/ArticleCard';
import { StatusBarTop } from '@/components/StatusBarTop';

const Tab = createMaterialTopTabNavigator();

const tabs = [
  { name: 'a', category: 'الأحداث الأخيرة', value: 'latest_news' },
  { name: 'b', category: 'الإنجازات', value: 'achievements' },
  { name: 'c', category: ' الأخبار', value: 'news' },
];

export const M1Screen = () => {
  return (
    <>
      <StatusBarTop />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarAndroidRipple: { borderless: false },
          tabBarScrollEnabled: true,
          tabBarStyle: {
            backgroundColor: 'white',
            elevation: 0, // Remove shadow on Android
            shadowOpacity: 0, // Remove shadow on iOS
            borderBottomWidth: 0, // Remove bottom border
            height: 70,
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'transparent', // Set to transparent to avoid overlap
          },
          tabBarLabel: ({ focused }) => (
            <View style={[styles.tabItem, focused ? styles.activeTab : styles.inactiveTab]}>
              <Text style={focused ? styles.activeText : styles.inactiveText}>
                {route.params.category_arabic_name}
              </Text>
            </View>
          ),
        })}
        
      >
        {tabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={TabArticleSection}
            initialParams={{ category: tab.value, category_arabic_name: tab.category }}
            
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

const TabArticleSection = ({ route }) => {
  const { category } = route.params;

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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 120, // Fixed width for each tab
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
    color: 'gray',
  },
});

