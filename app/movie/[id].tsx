import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { icons } from '@/constans/icons'
import { getMovieDetails } from '../../service/api'
import useFetch from '../../service/useFetch'
import { formatRuntime } from '../../utils/format'

const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const { data } = useFetch(getMovieDetails, true, { id });
  const [showbtn, setShowbtn] = useState(true)
  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event;

    // 判断是否滚动到底部
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      setShowbtn(false)
      return
    }
    setShowbtn(true)
  }

  return (
    <View className='static flex-1 bg-primary h-full'>
      <ScrollView className='flex-1 bg-primary h-full'

        contentContainerStyle={{
          paddingBottom: 50
        }}
        onScroll={({ nativeEvent }) => { handleScroll(nativeEvent) }}

      >
        {/* 图片 */}
        <Image className='w-full h-[550px]  '
          resizeMode="cover"
          source={
            data?.backdrop_path
              ? { uri: 'https://image.tmdb.org/t/p/w500' + data.backdrop_path }
              : icons.play //可能没数据
          }

        />
        <View className='ml-4'>
          {/* 名称 */}
          <Text className='text-white text-2xl font-bold my-4 ' >{data?.title}</Text>
          {/* 年份 / 时长 */}
          <Text className='text-white text-base font-medium my-2  text-light-100 font-blod' >{data?.release_date?.split('-')[0]} · {formatRuntime(data?.runtime)}</Text>
          {/* 评分 */}
          <View className='w-40 h-10  rounded-lg bg-dark-100 flex-row items-center justify-start px-2' >
            <Image source={icons.star} className='w-4 h-4 mr-2'></Image>
            <Text className='text-white text-xs'>{data?.vote_average.toFixed(1)}</Text>
            <Text className='text-light-100 text-xs ml-2' >({data?.vote_count}_Votes)</Text>

          </View>
          {/* 简介 */}
          <View className='my-2'>
            <Text className='text-light-100 my-3 text-base font-bold'>Overview</Text>
            <Text className='text-light-200 text-base font-bold'>{data?.overview}</Text>
          </View>
          {/* 导演 */}
          <View className='my-2'>
            <Text className='text-light-100 my-3 text-base font-bold'>Genres</Text>
            <Text className='text-light-200 text-base font-bold'>{data?.genres?.map((genre: any) => genre.name).join(', ')}</Text>
          </View>
          {/* 预算/ 收入 */}
          <View className='my-2'>
            <Text className='text-light-100 my-3 text-base font-bold'>Budget / Revenue</Text>
            <Text className='text-light-200 text-base font-bold'> ${data?.budget} / ${data?.revenue}</Text>
          </View>
          {/* 制作公司 Production Companies */}
          <View className='my-2'>
            <Text className='text-light-100 my-3 text-base font-bold'>Production Companies</Text>
            <Text className='text-light-200 text-base font-bold'>{data?.production_companies?.map((company: any) => company.name).join(', ')}</Text>
          </View>
        </View>

      </ScrollView>
      {showbtn && (
        <TouchableOpacity className=' bg-light-100  w-48 h-10  text-center  absolute bottom-10 left-1/2 -translate-x-1/2 rounded-lg'>
          <Text
            className='font-bold text-dark-100 leading-10 text-center'
            onPress={() => { router.back() }}  >Back</Text>
        </TouchableOpacity>
      )}

    </View>
  )
}

export default MovieDetails

