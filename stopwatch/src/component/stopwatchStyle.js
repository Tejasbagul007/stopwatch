import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//CUSTOM IMPORTS
import {colors} from '../resource/colors';

const circleSize = hp('31.3%');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  app: {
    flex: 1,
    backgroundColor: colors.faintBlack,
  },
  timerContainer: {
    marginTop: hp('7%'),
    borderWidth: wp('0.9%'),
    borderColor: colors.grey,
    borderStyle: 'dotted',
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    position: 'absolute',
    fontSize: wp('10%'),
    color: 'white',
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  blueTime: {
    color: colors.blue,
  },
  buttons: {
    position: 'absolute',
    marginTop: hp('86%'),
    marginBottom: hp('30%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll',
  },
  button: {
    padding: wp('4%'),
    marginRight: wp('9%'),
    marginLeft: wp('8%'),
  },
  lapContainer: {
    marginTop: wp('10%'),
  },
  rotate: {
    position: 'absolute',
    width: wp('9%'),
  },
  dot: {
    width: wp('5%'),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotText: {
    marginLeft: wp('18%'),
    marginBottom: wp('7%'),
    width: wp('20%'),
    fontSize: wp('13%'),
    color: colors.blue,
  },

  lapText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('8%'),
  },
  blueText: {
    color: colors.blue,
    fontSize: wp('4%'),
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    marginRight: wp('10%'),
  },
  lapTime: {
    color: 'white',
    fontSize: wp('4%'),
    marginRight: wp('25%'),
  },
  lapDuration: {
    color: 'white',
    marginLeft: wp('8%'),
  },
});

export default styles;
