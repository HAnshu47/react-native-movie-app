import { icons } from '@/constans/icons';
import { Image, Text, View } from 'react-native';

interface props {
  item: any;
}

export default function Movies({ item }: props) {

  return (

    <View className='w-[30%] m-2  rounded-lg'>
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
    </View>
  );
}
