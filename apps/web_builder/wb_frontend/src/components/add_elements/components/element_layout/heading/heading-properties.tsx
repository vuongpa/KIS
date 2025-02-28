 export interface HeadingPropertiesDefaults {
    color: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string | number;
    textTransform: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
    textDecoration: 'underline' | 'overline' | 'line-through' | 'none';
    letterSpacing: string;
    lineHeight: string;
    textAlign: 'left' | 'center' | 'right';
    textStroke?: string; 
  } 
  export const getHeadingPropertiesDefaults = (): HeadingPropertiesDefaults=> ({
    color: '#FF0000', 
    fontFamily: 'Arial, sans-serif', 
    fontSize: '32px', 
    fontWeight: '700', 
    textTransform: 'capitalize', 
    textDecoration: 'underline', 
    letterSpacing: '1px', 
    lineHeight: '20px', 
    textAlign: 'center',
    textStroke: '1px #333', 
  })