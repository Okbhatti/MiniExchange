import React from 'react';

import { ActivityIndicator, Dimensions, Modal, View } from 'react-native';
import { theme } from '../utils/helper';

interface Props {
  visible: boolean;
}

export const Loader: React.FC<Props> = ({ visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
          backgroundColor: theme.color.background,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size={'small'} color={theme.color.blue} />
      </View>
    </Modal>
  );
};
