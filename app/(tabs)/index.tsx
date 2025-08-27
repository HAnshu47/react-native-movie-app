import { icons } from '@/constans/icons';
import { images } from '@/constans/image';
import { useRouter } from 'expo-router';
import { Image, ScrollView, View } from 'react-native';
import SearchBar from '../../components/searchBar';
import { getMovie } from '../../service/api';
import useFetch from '../../service/useFetch';
export default function Index() {
  const router = useRouter();
  const { data } = useFetch(() => getMovie({ query: '' }));
console.log(data);
  return (
    <View className='flex-1 bg-primary' >
      {/* 背景图片 */}
      <Image source={images.bg} resizeMode='cover' className='flex-1 w-full absolute
     ' />
      {/* 滚动列表 */}

      <ScrollView className='flex-1 px-4'>
        <Image source={icons.logo} className='w-10 h-10 mx-auto mt-20 mb-10' ></Image>
        <SearchBar onPress={() => router.push('/search')} placeholder='搜索' />
         
      </ScrollView>
      {/* logo */}


    </View>);
}
