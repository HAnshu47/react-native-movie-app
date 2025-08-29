import { icons } from '@/constans/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  placeholder?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
}
export default function Search({ placeholder, onPress, onChangeText, value }: Props) {


  return (
    <View className='flex flex-row items-center border border-gray-600 py-3 px-4 rounded-full'>
      <Image source={icons.search} className='size-5' tintColor='#a8b5d8'   ></Image>


      <TextInput placeholder={placeholder} className='ml-2 flex-1 text-white'
        onPress={onPress}
        onChangeText={onChangeText}
        placeholderTextColor={'#a8b5d8'}
        value={value}
      />
    </View>
  )
}
