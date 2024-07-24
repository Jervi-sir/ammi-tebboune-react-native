import { ArticleCard } from "@/components/Cards/ArticleCard";
import { ArticleCardSkeleton } from "@/components/Skeletons/ArticleCardSkeleton";
import { Api } from "@/utils/Api";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, ScrollView, Text, View } from "react-native";

export const CategoryScreen = ({ category }) => {
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

  if (isSkeleton) 
    return (
      <ScrollView
        style={{ backgroundColor: 'white' }}
      >
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </ScrollView>
    );

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <FlatList
        data={articles}
        renderItem={({ item }) => <ArticleCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={loading && !refreshing ? <LoadingIndicator /> : null}
      />
    </View>
  );
};

const LoadingIndicator = () => (
  <View style={{ padding: 10 }}>
    <Text>Loading...</Text>
  </View>
);
