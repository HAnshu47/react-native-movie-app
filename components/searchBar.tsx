import { icons } from '@/constans/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  placeholder?: string;
  onPress?: () => void;
}
export default function Search({ placeholder, onPress }: Props) {

  const onChangeText = (text: string) => {
    console.log('onChangeText', text)
  }
  return (
    <View className='flex flex-row items-center border border-gray-600 py-3 px-4 rounded-full'>
      <Image source={icons.search} className='size-5' tintColor='#a8b5d8'   ></Image>


      <TextInput placeholder={placeholder} className='ml-2 flex-1 text-white'
        onPress={onPress}
        onChangeText={(text) => onChangeText}
        placeholderTextColor={'#a8b5d8'}
      />
    </View>
  )
}
