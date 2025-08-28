import MoviesCard from '@/components/moviesCard';
import { icons } from '@/constans/icons';
import { images } from '@/constans/image';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, View } from 'react-native';
import SearchBar from '../../components/searchBar';
import { getPopularMovies } from '../../service/api';
import useFetch from '../../service/useFetch';

export default function Index() {
  const router = useRouter();
  const latestMovieList = useFetch(getPopularMovies, true, { sort_by: 'popularity.desc', page: 1 });

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

        {latestMovieList.data && (
          <FlatList
            data={latestMovieList.data.results}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3} // 三列显示
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }} // 控制换行间距
            ListHeaderComponent={ListHeader} // 放置 logo、搜索框、标题
            renderItem={({ item }) => (
              <MoviesCard item={item} />
            )}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
   
  );
}
