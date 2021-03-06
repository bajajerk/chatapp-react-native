export type Align = 'leading' | 'center' | 'trailing';

export interface TextProps {
  isEmphasis?: boolean;
  color?: string;
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  backgroundColor?: string;
}

export interface TypeBaseProps extends TextProps {
  fontSize: number;
}
