import { icons } from '@/constans/icons';
import { images } from '@/constans/image';
import { useScrollStore } from '@/store/scrollStore';
import { Tabs } from 'expo-router';
import { Image, ImageBackground, Text, View } from 'react-native';

export default function TabsScreen() {
  const showDemoIcon = useScrollStore((s) => s.showDemoIcon);

  const TableIcon = ({ focused, title, icon }: { focused: boolean; title: string; icon: any }) => {
    if (focused) {
      return (
        <ImageBackground
          source={images.highlight}
          className='flex flex-1 flex-row items-center min-w-[112px] min-h-16 w-full mt-4 rounded-full overflow-hidden justify-center items-center'

        >
          <Image
            source={icon}
            className='size-5'
            style={{ tintColor: '#151312' }}
          />
          <Text className='ml-2 font-semibold'>{title}</Text>

        </ImageBackground>

      )
    }

    return (
      <View className='size-full items-center justify-center mt-4 rounded-full'>
        <Image
          source={icon}
          className='size-5'
          style={{ tintColor: '#a8b5d8' }}
        />
      </View>)
  }

  return (
    <Tabs screenOptions={{
      headerShown: false, tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0d23',
        },
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
      }
      }}

    >
      <Tabs.Screen name="index" options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TableIcon focused={focused} icon={showDemoIcon ? icons.top : icons.home} title={showDemoIcon ? 'Top' : "home"} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TableIcon focused={focused} icon={icons.search} title="search" />,
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TableIcon focused={focused} icon={icons.save} title="save" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TableIcon focused={focused} icon={icons.person} title="profile" />,
        }}
      />
    </Tabs>
  );
}
