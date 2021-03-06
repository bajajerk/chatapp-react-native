import { Platform, StatusBar, StyleSheet } from 'react-native';
import { Liquidity } from '../../screens/BasePage/Liquidity/Liquidity';
import { HelperMethod } from '../HelperMethod/HelperMethod';

export const helperStyle = StyleSheet.create({
  basePageContainer: {
    paddingLeft: Liquidity.measurements.spacing3,
    paddingRight: Liquidity.measurements.spacing3,
    paddingTop: Liquidity.measurements.spacing2,
    paddingBottom: Liquidity.measurements.spacing2,
  },
  androidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  maxHeightContainer: {
    height: HelperMethod.getMaxHeight(),
    backgroundColor: Liquidity.colors.main.white,
  },
});
