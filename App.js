import React from 'react'
import 'react-native-gesture-handler'
import HomeNavigation from './src/navigation'
import Toast from 'react-native-toast-message'

export default function App() {
  return (
    <>
      <HomeNavigation />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
}
