import { PropsWithChildren } from 'react';
// import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Icons: React.FC<PropsWithChildren<{ name: string }>> = ({ name }) => {
  if (name === 'circle')
    return <Icon name="circle-thin" size={38} color="#F7CD2E" />;

  if (name === 'cross') return <Icon name="times" size={38} color="#38CC77" />;

  return null;
};

export default Icons;

// const styles = StyleSheet.create({
//   square: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#D3D3D3',
//     borderColor: 'black',
//     borderWidth: 1,
//   },
// });
