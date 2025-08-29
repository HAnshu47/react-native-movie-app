import MoviesCard from '@/components/moviesCard';
import { icons } from '@/constans/icons';
import { images } from '@/constans/image';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import SearchBar from '../../components/searchBar';
import { getSearchMovies } from '../../service/api';
export default function Index() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]); // 存储拼接后的列表
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [total_count, setTotalCount] = useState(0)

  const fetchMovies = async (keyword: string, pageNum: number) => {
    setLoading(true);
    try {
      const res = await getSearchMovies({ query: keyword, page: pageNum });
      // 拼接数据
      setMovies((prev) => [...prev, ...res.results]);
      setTotalCount(res.total_results)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(keyword, page);
  }, [page, keyword]);

  const handleScrollListLoad = () => {
    // 滚动加载列表
    if (!loading) setPage((p) => p + 1);
  };
  const timeoutRef = useRef<number | null>(null);

  const searchMovie = (text: string) => {

    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setKeyword(text);
    // 设置新的定时器
    timeoutRef.current = setTimeout(() => {
      // 清楚搜索结果清楚之前的数据
      setMovies([]);
      fetchMovies(text, 1);
    }, 500) as unknown as number;
  };

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} resizeMode='cover' className='flex-1 w-full absolute' />
      <View className='items-center mt-20 mb-10 mx-5'>

        <Image source={icons.logo} className='w-10 h-10 mx-auto mb-10' />
        <SearchBar
          onChangeText={searchMovie}
          placeholder='搜索'
          value={keyword}
        />
        {
          keyword && (
            <Text className='text-white text-lg font-bold my-4 size-18 w-full px-4'>
              Search Result for {keyword}，found {total_count} results in total
            </Text>
          )
        }

      </View>
      {movies && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3} // 三列显示
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }} // 控制换行间距
          renderItem={({ item }) => (
            <MoviesCard item={item} />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          onEndReached={() =>
            handleScrollListLoad()
          }
          onEndReachedThreshold={0.1}
        />
      )}
    </View>

  );
}
