import { Platform } from 'react-native';
import { BConstant } from '../../utils/BConstant/BConstant';

export class HelperMethod {
  static isWeb() {
    return Platform.OS === 'web';
  }

  static getMaxHeight() {
    return this.isWeb() ? BConstant.webScreenHeight : '100%';
  }
}
