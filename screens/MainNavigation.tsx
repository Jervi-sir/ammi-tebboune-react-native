import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { M1Screen } from "./M1/M1Screen";
import { M2Screen } from "./M2/M2Screen";
import { M3Screen } from "./M3/M3Screen";
import { Routes } from "@/utils/Routes";
import { HomeIcon } from "@/assets/icons/menu/HomeIcon";
import { EventIcon } from "@/assets/icons/menu/EventIcon";
import { UserIcon } from "@/assets/icons/menu/UserIcon";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

const TabScreen = [
  { key: 'M1', routeName: Routes.M1, component: M1Screen, Icon: HomeIcon, IconActive: () => <HomeIcon isActive={true} /> },
  { key: 'M2', routeName: Routes.M2, component: M2Screen, Icon: EventIcon, IconActive: () => <EventIcon isActive={true} /> },
  { key: 'M3', routeName: Routes.M3, component: M3Screen, Icon: UserIcon, IconActive: () => <UserIcon isActive={true} /> },
  // { key: 'test', routeName: 'test', component: MScreen, Icon: UserIcon, IconActive: () => <UserIcon isActive={true} /> },
  // { key: 'arabic', routeName: 'arabic', component: ArabicHtml, Icon: UserIcon, IconActive: () => <UserIcon isActive={true} /> },
];

export const MainNavigation = () => {
  return (
    <>
      <Tab.Navigator
        initialRouteName={Routes.M2}
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarInactiveTintColor: 'black',
          tabBarActiveTintColor: 'black',
          tabBarStyle:{
            backgroundColor: 'white', 
            borderTopColor: 'black',
            borderTopWidth: 2,
            height: Platform.OS === "ios" ? 80 : 60
          },
          tabBarHideOnKeyboard: true

        }}
      >
      {
          TabScreen.map((tab, index) => (
            <Tab.Screen
              key={index}
              name={tab.routeName}
              component={tab.component}
              options={{
                tabBarIcon: ({ focused, color }) => (
                  focused
                  ?
                  <>
                    <tab.IconActive />
                    {/* <View style={{ backgroundColor: Colors.iconGender, width: 7, height: 7, borderRadius: 12}}></View> */}
                  </>
                  :
                  <tab.Icon />
                ),
              }}
            />
          ))
        }
      </Tab.Navigator>
    </>
  );
};