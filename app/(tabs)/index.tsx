import MoviesCard from '@/components/moviesCard';
import { icons } from '@/constans/icons';
import { images } from '@/constans/image';
import { useScrollStore } from '@/store/scrollStore';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import SearchBar from '../../components/searchBar';
import { getPopularMovies } from '../../service/api';
export default function Index() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]); // 存储拼接后的列表
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await getPopularMovies({ sort_by: 'popularity.desc', page: pageNum });
      // 拼接数据
      setMovies((prev) => [...prev, ...res.results]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleScrollListLoad = () => {
    // 滚动加载列表
    if (!loading) setPage((p) => p + 1);
    console.log('滚动加载列表')
  };
  const setShowDemoIcon = useScrollStore((s) => s.setShowDemoIcon);
  const handleScrollList = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    if (y > 50) {
      setShowDemoIcon(true);
    } else {
      setShowDemoIcon(false);
    }
  }
  const flatListRef = useRef<FlatList>(null);
  const setFlatListRef = useScrollStore((s) => s.setFlatListRef);
  useEffect(() => {
    setFlatListRef(flatListRef); // 把 ref 存到全局
  }, [setFlatListRef, flatListRef]);

  // FlatList 的头部组件
  const ListHeader = () => (
    <>
      <Image source={icons.logo} className='w-10 h-10 mx-auto mt-20 mb-10' />
      <SearchBar onPress={() => router.push('/search')} placeholder='搜索' />
      <Text className='text-white text-lg font-bold my-4 size-18 w-full'>Latest Movies</Text>
    </>
  );

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} resizeMode='cover' className='flex-1 w-full absolute' />

      {movies && (
        <FlatList
          ref={flatListRef}
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // 三列显示
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }} // 控制换行间距
          ListHeaderComponent={ListHeader} // 放置 logo、搜索框、标题
          renderItem={({ item }) => (
            <MoviesCard item={item} />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          onScroll={(e) => handleScrollList(e)}
          onEndReached={() =>
            handleScrollListLoad()
          }
          onEndReachedThreshold={0.1}
        />
      )}
    </View>

  );
}
