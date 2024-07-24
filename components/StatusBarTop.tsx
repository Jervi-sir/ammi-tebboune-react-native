import { useEffect, useState } from 'react';
import { Dimensions, View, Platform} from 'react-native'
import { NativeModules, StatusBar } from 'react-native';
const {StatusBarManager} = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const viewportHeight = Dimensions.get('window').height;
const WINDOW_HEIGHT = Dimensions.get('window').height;

let statusBarHeight = 0;

if (Platform.OS === 'android') {
   statusBarHeight = 0;
} else {
   statusBarHeight = 44;
}

const VIEWPORT_HEIGHT = WINDOW_HEIGHT - statusBarHeight;

export const StatusBarTop = ({ theme  = 'light' }) => {
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [barStyle, setBarStyle] = useState('dark-content');

  const height = viewportHeight - VIEWPORT_HEIGHT;
  useEffect(() => {
    if(theme === 'dark') {
      setBackgroundColor('black')
      setBarStyle('light-content')
    } else {
      setBackgroundColor('white')
      setBarStyle('dark-content')
    }
  }, [theme])
  return(
    <>  
      <View style={{ backgroundColor: backgroundColor, height }} >
        <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      </View>
    </>
  )
}
{/* <>  
  <View style={{height: STATUSBAR_HEIGHT + 20, width: '100%', backgroundColor: Colors.background}}>
    <SB barStyle={currentTheme === 'light' ? 'dark-content' : 'light-content'}/>
  </View>
  <View style={{paddingTop: 1, paddingBottom: 5, height: 1, backgroundColor: Colors.background}}></View>
</> */}