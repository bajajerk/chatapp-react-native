import { Liquidity } from '../../utils/Liquidity/Liquidity';
import { StyleSheet } from 'react-native';
import { BConstant } from '../../utils/BConstant/BConstant';

export const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    flexShrink: 0,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Liquidity.colors.main.white,
  },
  pageContainer: {
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    minHeight: BConstant.webScreenHeight,
    maxWidth: BConstant.webScreenWidth,
    margin: 8,
  },
  footerContainer: {
    // backgroundColor: theme.palette.secondary.dark,
    flexShrink: 0,
    // padding: theme.spacing(1),
  },
  basePageContainer: {
    paddingLeft: Liquidity.measurements.spacing3,
    paddingRight: Liquidity.measurements.spacing3,
    paddingTop: Liquidity.measurements.spacing2,
    paddingBottom: Liquidity.measurements.spacing2,
  },
  mobileBody: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: Liquidity.colors.main.white,
  },
});
