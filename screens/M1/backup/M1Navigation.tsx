import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ListRenderItem, FlatList, ScrollView, RefreshControl, Text } from 'react-native'
import { MaterialTabBar, MaterialTabItem, Tabs, useFocusedTab } from 'react-native-collapsible-tab-view'
import { HeaderArticleSection } from './HeaderArticleSection'
import { StatusBarTop } from '../../components/StatusBarTop'
import axios from 'axios'
import { Api } from '../../utils/Api'
import { ArticleCard } from '../../components/Cards/ArticleCard'
import { ActivityIndicator } from 'react-native-paper'

const HEADER_HEIGHT = 250

const Header = () => {
  return <HeaderArticleSection />
}

export const M1Navigation: React.FC = () => {

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
        <StatusBarTop theme='dark' />
      <Tabs.Container
        renderHeader={Header}
        headerHeight={HEADER_HEIGHT} // optional
        headerContainerStyle={{ borderColor: 'transparent', shadowColor: 'transparent' }}
        renderTabBar={props => <CustomTabBar {...props} />}
      >
        <Tabs.Tab name="0">
          <SectionA category={'أحدث الأخبار'} />
        </Tabs.Tab>
        <Tabs.Tab name="1">
          <SectionA category={'الإنجازات'} />
        </Tabs.Tab>
        <Tabs.Tab name="2">
          <SectionA category={'الأحداث الأخيرة'} />
        </Tabs.Tab>
      </Tabs.Container>
    </View>
  )
}

const SectionA = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSkeleton, setIsSkeleton] = useState(true);

  const fetchArticles = async (pageNum = 1, refreshing = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(Api.base + Api.listArticles, {
        params: {
          category,
          page: pageNum,
        },
      });
      const newArticles = response.data.articles;
      setArticles((prevArticles) =>
        refreshing ? newArticles : [...prevArticles, ...newArticles]
      );
      setHasMore(response.data.pagination.nextPageUrl !== null);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
      setIsSkeleton(false);
      if (refreshing) setRefreshing(false);
    }
  };

  const loadMore = () => {
    if (!hasMore || loading) return;
    setPage((prevPage) => prevPage + 1);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setIsSkeleton(true);
    setPage(1);
    fetchArticles(1, true);
  };

  useEffect(() => {
    setIsSkeleton(true);
    fetchArticles(page);
  }, [category, page]);

  // if (isSkeleton) 
  //   return (
  //     <ScrollView
  //       style={{ backgroundColor: 'white' }}
  //     >
  //       <ArticleCardSkeleton />
  //       <ArticleCardSkeleton />
  //       <ArticleCardSkeleton />
  //       <ArticleCardSkeleton />
  //     </ScrollView>
  //   );
  
  return (
      <Tabs.FlatList
        data={articles}
        renderItem={({ item }) => <ArticleCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        // refreshControl={   disabled cuz not working on Android but does in iOS
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        ListFooterComponent={loading && !refreshing ? <View style={{paddingTop: 40}}><ActivityIndicator /></View> : null}
      />
  )
}


const CustomTabBar = (props) => {
  const focusedTab = useFocusedTab();
  const tabs = [
    'أحدث الأخبار', 'الإنجازات', 'الأحداث الأخيرة'
  ]

  return (
    <MaterialTabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'transparent' }}
      scrollEnabled
      TabItemComponent={(tabProps) => (
        <MaterialTabItem
          {...tabProps}
          pressColor={'black'}
          labelStyle={{
            backgroundColor: focusedTab === tabProps.index ? 'transparent' : 'black',
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 7,
            overflow: 'hidden',
            fontWeight: '500',
          }}
          label={tabs[Number(tabProps.label)]}
          inactiveOpacity={0.6}
          focusable={false}
          activeColor='#fff'
          inactiveColor='#9C9C9C'
        />
      )}
    />
  );
};

