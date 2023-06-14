import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Animated,
  Easing,
  PanResponder,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//CUSTOM IMPORTS
import {images} from '../resource/images';
import styles from './stopwatchStyle';

const Stopwatch = () => {
  const [time, setTime] = useState(0); // set 0
  const [running, setRunning] = useState(false); // initialy --> not running
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null); // useRef need to use in interval cases
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [currentRotation, setCurrentRotation] = useState(0);
  const [lapDurations, setLapDurations] = useState([]);

  const startStopwatch = () => {
    if (running) {
      // If the stopwatch is running
      clearInterval(intervalRef.current);
    } else {
      const startTime = Date.now() - time; // If the stopwatch is not running---> to get exact start time
      intervalRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setRunning(!running); // Toggle--> state is updated when starting or stopping the stopwatch.
    // setRunning('');
    setIsStopwatchRunning(!isStopwatchRunning);
    setCurrentRotation(animated.__getValue());
    startRotation();
  };

  const lapTimer = () => {
    if (running) {
      const lapTime = time - laps.reduce((a, b) => a + b, 0); // Calculate the lap time by subtracting the total of previous lap times from the current time
      setLapDurations([...lapDurations, lapTime]); // Store the lap duration.
      setLaps([...laps, lapTime]); // Store the lap time.
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setRunning(false);
    setLaps([]);
    stopRotation();
  };

  const showTime = time => {
    // 1 minute = 60 seconds * 1,000 milliseconds/second = 60,000 milliseconds
    const mins = Math.floor(time / 60000); // 60000msec to get min calculation
    const secs = Math.floor((time % 60000) / 1000); // same
    const millisecs = Math.floor((time % 1000) / 10);

    return (
      <Text>
        <Text>{mins < 10 ? '0' + mins : mins}:</Text>
        <Text>{secs < 10 ? '0' + secs : secs}.</Text>
        <Text style={styles.blueTime}>
          {millisecs < 10 ? '0' + millisecs : millisecs}
        </Text>
      </Text>
    );
  };

  const animated = useRef(new Animated.Value(0)).current;
  const rotate = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const rotateOpposit = animated.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  const animate = () => {
    if (!isStopwatchRunning) {
      startRotation();
    }
    animated.setValue(currentRotation);
    Animated.loop(
      Animated.timing(
        animated,
        {
          toValue: 1,
          duration: 40000,
          useNativeDriver: true,
          easing: Easing.linear,
        },
        [],
      ),
    ).start(() => {
      animate(); // Recursive call to restart the animation
    });
  };

  useEffect(() => {
    animate();
    setCurrentRotation(animated.__getValue());
  }, [!isStopwatchRunning]);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 40000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ).start();
  };

  const stopRotation = () => {
    animated.stopAnimation();
    animated.setValue(0);
  };

  useEffect(() => {
    if (isStopwatchRunning) {
      startRotation();
    } else {
      stopRotation();
    }
  }, [isStopwatchRunning]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        if (isStopwatchRunning) {
          // Handle the event when pointer is moved inside the circle
          console.log('Pointer moved inside the circle');
        }
      },
    }),
  ).current;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Animated.View
            style={[
              styles.rotate,
              {
                transform: [
                  {rotate: rotate},
                  {translateY: hp('5.8%')}, // Adjust the X-axis translation value
                  {translateX: -wp('17%')},
                ],
              },
            ]}>
            <Animated.View
              style={[styles.dot, {transform: [{rotate: rotateOpposit}]}]}
              {...panResponder.panHandlers}>
              <Text style={styles.dotText}>.</Text>
            </Animated.View>
          </Animated.View>
          <Text style={styles.time}>{showTime(time)}</Text>
        </View>

        <ScrollView style={styles.lapContainer}>
          {laps.map((lap, e) => (
            <View key={e} style={styles.lapText}>
              <Text style={styles.blueText}>0{e + 1}</Text>
              <Text style={styles.lapTime}>{showTime(lap)}</Text>
              <Text style={styles.lapDuration}>
                +{showTime(lapDurations[e])}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={resetTimer}>
          <Image source={images.reset} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={startStopwatch}>
          <Image source={running ? images.pause : images.play} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={lapTimer}
          disabled={!running}>
          <Image source={images.flag} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Stopwatch;
