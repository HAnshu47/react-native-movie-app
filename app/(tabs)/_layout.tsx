import { icons } from '@/constans/icons';
import { images } from '@/constans/image';
import { useScrollStore } from '@/store/scrollStore';
import { Tabs, useSegments } from 'expo-router';
import { Image, ImageBackground, Text, View } from 'react-native';

export default function TabsScreen() {
  const showDemoIcon = useScrollStore((s) => s.showDemoIcon);
  const flatListRef = useScrollStore((s) => s.flatListRef);
  const setShowDemoIcon = useScrollStore((s) => s.setShowDemoIcon);

  const segments = useSegments();
  const currentRoute = segments[0]; // 当前路由，比如 index/search/save/profile

  const TableIcon = ({ focused, title, icon }: { focused: boolean; title: string; icon: any }) => {
    if (focused) {
      return (
        <ImageBackground
          source={images.highlight}
          className="flex flex-1 flex-row items-center min-w-[112px] min-h-16 w-full mt-4 rounded-full overflow-hidden justify-center"
        >
          <Image source={icon} className="size-5" style={{ tintColor: '#151312' }} />
          <Text className="ml-2 font-semibold">{title}</Text>
        </ImageBackground>
      );
    }

    return (
      <View className="size-full items-center justify-center mt-4 rounded-full">
        <Image source={icon} className="size-5" style={{ tintColor: '#a8b5d8' }} />
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
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
        },
      }}
      screenListeners={{
        tabPress: (e) => {
          //  只在首页 && 点击首页时触发 "回到顶部"
          if (currentRoute === '(tabs)' && e.target?.includes('index')) {
            if (showDemoIcon && flatListRef?.current) {
              flatListRef.current.scrollToOffset({ offset: 0, animated: true });
              e.preventDefault(); // 阻止重复跳转
            }
          } else {
            //  切换到其他 tab 时，自动隐藏 Top，恢复成 home
            flatListRef?.current?.scrollToOffset({ offset: 0, animated: true });
            setShowDemoIcon(false);
          }
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TableIcon
              focused={focused}
              icon={showDemoIcon ? icons.top : icons.home}
              title={showDemoIcon ? 'Top' : 'Home'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TableIcon focused={focused} icon={icons.search} title="Search" />,
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TableIcon focused={focused} icon={icons.save} title="Save" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TableIcon focused={focused} icon={icons.person} title="Profile" />,
        }}
      />
    </Tabs>
  );
}
