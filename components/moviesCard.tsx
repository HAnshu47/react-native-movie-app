import { icons } from '@/constans/icons';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';
interface props {
  item: any;
}

export default function Movies({ item }: props) {

  return (
    // 跳转事件不生效，需要Pressable 包裹，让任意区域变成可点击的区域
    // asChild 让 Link 不渲染自己，而是把逻辑交给 Pressable
    <Link href={`/movie/${item.id}`} asChild>
      <Pressable className='w-[30%] m-2  rounded-lg'>
        <Image
          source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }}
          className='w-full h-40 rounded-lg'
        />
        <View className='p-1'>
          {/* 名字 */}
          <Text className='text-white text-xs mt-1 text-left font-semibold truncate' numberOfLines={1} ellipsizeMode='tail'>{item.title}</Text>
          {/* 评分 */}
          <View className='flex-row items-center justify-space-x-1 '>
            <Image source={icons.star} className='w-4 h-4 mr-2' />
            <Text className='text-white text-xs  leading-5'>{item.vote_average.toFixed(1)}</Text>
          </View>
          {/* 上映时间&类型 */}
          <View className='flex-row items-center  justify-between'>
            <Text className='text-white text-xs  leading-5'>{item.release_date?.split('-')[0]}</Text>
            <Text className='text-white text-xs  leading-5'>{item.original_language}</Text>
          </View>
        </View>
      </Pressable>
    </Link >
  );
}
