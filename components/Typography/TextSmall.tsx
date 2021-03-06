import React from 'react';
import { TypeBase } from './TypeBase/TypeBase';
import { TextProps } from './schema';
import { Liquidity } from '../../utils/Liquidity/Liquidity';

export const TextSmall: React.FC<TextProps> = ({
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
  backgroundColor,
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
      backgroundColor={backgroundColor}
      fontSize={Liquidity.measurements.text.small}
    >
      {children}
    </TypeBase>
  );
};
