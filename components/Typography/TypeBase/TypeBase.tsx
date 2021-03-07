import React from 'react';
import { Text } from 'react-native';
import { Liquidity } from '../../../utils/Liquidity/Liquidity';
import { TypeBaseProps } from '../schema';

export const TypeBase: React.FC<TypeBaseProps> = ({
  isEmphasis,
  fontSize,
  color,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  backgroundColor,
  children,
}) => {
  return (
    <Text
      style={{
        fontSize,
        color: color || Liquidity.colors.main.defaultTextColor,
        padding,
        margin,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
        paddingRight,
        paddingLeft,
        paddingTop,
        paddingBottom,
        fontWeight: isEmphasis ? '700' : '400',
        backgroundColor,
      }}
      numberOfLines={3}
    >
      {children}
    </Text>
  );
};
