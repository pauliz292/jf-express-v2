import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ProductListScreen from '../components/product/productList';
import ApprovalScreen from '../components/activity/approval';

const FirstRoute = () => (
     <ProductListScreen />
);

const SecondRoute = () => (
     <ApprovalScreen />
);

const renderScene = SceneMap({
     first: FirstRoute,
     second: SecondRoute,
});

export default function TabViewLayout() {
     const layout = useWindowDimensions();

     const [index, setIndex] = React.useState(0);
     const [routes] = React.useState([
          { key: 'first', title: 'Product List' },
          { key: 'second', title: 'Approval List' },
     ]);

     return (
          <TabView
               navigationState={{ index, routes }}
               renderScene={renderScene}
               onIndexChange={setIndex}
               initialLayout={{ width: layout.width }}
          />
     );
}