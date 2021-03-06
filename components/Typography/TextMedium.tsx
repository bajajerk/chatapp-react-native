import React from 'react';
import { TypeBase } from './TypeBase/TypeBase';
import { TextProps } from './schema';
import { Liquidity } from '../../screens/BasePage/Liquidity/Liquidity';

export const TextMedium: React.FC<TextProps> = ({
  isEmphasis,
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
  children,
}) => {
  return (
    <TypeBase
      isEmphasis={isEmphasis}
      color={color}
      padding={padding}
      margin={margin}
      paddingLeft={paddingLeft}
      paddingBottom={paddingBottom}
      paddingTop={paddingTop}
      paddingRight={paddingRight}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
      fontSize={Liquidity.measurements.text.medium}
    >
      {children}
    </TypeBase>
  );
};