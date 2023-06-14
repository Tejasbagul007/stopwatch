import {View} from 'react-native';
import React from 'react';
import Stopwatch from './stopwatch/src/component/stopwatch';
import styles from './stopwatch/src/component/stopwatchStyle';


function App() {
  return (
    <View style={styles.app}>
      <Stopwatch/>
    </View>
  );
}

export default App;




