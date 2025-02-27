//import liraries

import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ToastAndroid,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import instance from '../Axiosinstance';
import DeviceInfo from 'react-native-device-info';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {
  setCurrentPassword,
  setEmployeeCodetoolkit,
  setRoleID,
  setCreateByID,
  setEveryDeviceMacAddress,
} from '../store/reducers/userInfoSlice';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {TextInput, Button} from 'react-native-paper';
import {useNetInfo} from '@react-native-community/netinfo';
import {useIsFocused} from '@react-navigation/native';

// create a component
const Login = () => {
  const [EmployeeID, setEmployeeID] = useState('');
  const [pass, setpass] = useState('');
  const [UserID, setUserID] = useState('');
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  //QR Scanner
  const [isOpenCamera, setIsOpenCamera] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [cameraType, setcameraType] = useState('front');
  const [flashlightEnabled, setFlashlightEnabled] = useState(false);
  const [macaddress, setMacaddress] = useState('');

  useEffect(() => {
    if (isFocused) {
      DeviceInfo.getUniqueId().then(uniqueId => {
        if (uniqueId.length > 0) {
          setMacaddress(uniqueId);
        }
      });
    }
  }, [isFocused]);

  const handleOnRead = e => {
    if (e.data) {
      setScannedData(e.data);
      setIsOpenCamera(false);

      var viewDetails = {
        EmployeeCordNo: e.data,
      };
      navigation.navigate('Operator_daily_info', viewDetails);
    }
  };

  const No_internet = () => {
    Toast.show({
      text1: 'No internet connection',
      text2: 'Please add internet connection',
      type: 'error',
      time: 5000,
    });
  };

  const LoginHendelar = () => {
    //Check for the Name TextInput

    if (EmployeeID == '') {
      alert('Please Enter Email');
      return;
    }
    if (EmployeeID === 'null') {
      alert('Please Enter Email');
      return;
    }
    //Check for the Email TextInput
    if (pass == '') {
      alert('Please Enter Password');
      return;
    }

    var data = {
      userName: EmployeeID,
      password: pass,
    };

    instance.post('/Login', JSON.stringify(data)).then(res => {
      if (res.data == 'Login Successfully.') {
        instance
          .get('/Menu_Permission/EmployeDetalies/' + EmployeeID)
          .then(response => {
            var result = response.data[0];
            AsyncStorage.setItem('token', result.EmployeeId);

            dispatch(setEmployeeCodetoolkit(EmployeeID));
            dispatch(setCurrentPassword(pass));
            dispatch(setRoleID(result.RoleId));
            dispatch(setCreateByID(result.ReqID));
            dispatch(setEveryDeviceMacAddress(macaddress));

            navigation.navigate('Dashboard');

            setEmployeeID('');
            setpass('');
            ToastAndroid.showWithGravityAndOffset(
              'Login Successfully',
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              50,
            );
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        alert(res.data);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* QRCodeScanner area */}
      {!isOpenCamera ? (
        <View>
          <StatusBar barStyle="light-content" backgroundColor="#2C76E3" />
          <Image
            source={require('../Img/app_header.png')}
            style={{width: '100%', height: '35%'}}
          />
          <View
            style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              marginTop: '30%',
            }}>
            <TextInput
              label={<Text style={{color: '#000'}}>Employee Code</Text>}
              style={{backgroundColor: '#F2F2F2', width: '80%'}}
              left={<TextInput.Icon icon="email" />}
              theme={{colors: {primary: '#F23E3E'}}}
              value={EmployeeID}
              defaultValue={EmployeeID}
              onChangeText={text => setEmployeeID(text)}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: 50,
              alignItems: 'center',
              marginTop: '3%',
            }}>
            <TextInput
              mode="flat"
              label={<Text style={{color: '#000'}}>Password</Text>}
              secureTextEntry
              style={{backgroundColor: '#F2F2F2', width: '80%'}}
              left={<TextInput.Icon icon="eye" />}
              theme={{colors: {primary: '#F23E3E'}}}
              value={pass}
              defaultValue={pass}
              onChangeText={text => setpass(text)}
            />
          </View>
          <View
            style={{
              width: '80%',
              height: 50,
              marginLeft: '10%',
              marginTop: '5%',
            }}>
            <Button
              mode="contained"
              style={{backgroundColor: '#1566E0', borderRadius: 8}}
              contentStyle={{height: 44, width: '100%'}}
              labelStyle={{color: 'white', fontSize: 18}}
              onPress={() => {
                if (netInfo.isConnected) {
                  LoginHendelar();
                  //getFcmToken();
                  //requestUserPermission();
                } else {
                  No_internet();
                }
              }}>
              Login
            </Button>
          </View>
        </View>
      ) : (
        <SafeAreaView>
          {isOpenCamera && (
            <QRCodeScanner
              cameraStyle={{
                height: deviceHeight,
                width: deviceWidth,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              onRead={data => {
                handleOnRead(data);
                // GetBarCodeDataByLavelWise(data);
              }}
              flashMode={
                !flashlightEnabled
                  ? RNCamera.Constants.FlashMode.off
                  : RNCamera.Constants.FlashMode.torch
              }
              reactivate={true}
              reactivateTimeout={3000}
              showMarker={true}
              cameraType={cameraType}
              ref={node => {
                scanner = node;
              }}
            />
          )}

          <View style={{flexDirection: 'row', marginLeft: 5, margin: 5}}>
            <View style={{width: '25%'}}>
              {!isOpenCamera ? null : (
                <Button
                  icon={
                    cameraType == 'front' ? 'camera-front' : 'backup-restore'
                  }
                  mode="text"
                  style={{
                    backgroundColor: '#1566E0',
                    borderRadius: 8,
                    marginTop: 50,
                    marginLeft: 5,
                    width: '100%',
                  }}
                  labelStyle={{color: '#fff'}}
                  onPress={() => {
                    cameraType == 'front'
                      ? setcameraType('back')
                      : setcameraType('front');
                  }}>
                  {cameraType == 'front' ? (
                    <Text style={{fontSize: 10}}>Front </Text>
                  ) : (
                    <Text style={{fontSize: 10}}>Back </Text>
                  )}
                </Button>
              )}
            </View>

            <View style={{width: '48%'}}>
              {!isOpenCamera ? null : (
                <Button
                  icon="qrcode-scan"
                  mode="text"
                  style={{
                    backgroundColor: '#1566E0',
                    borderRadius: 8,
                    marginTop: 50,
                    marginLeft: 10,
                    width: '100%',
                  }}
                  labelStyle={{color: '#fff'}}
                  onPress={() => {
                    setIsOpenCamera(!isOpenCamera);
                  }}>
                  <Text style={{fontSize: 10}}>QR Seanner Off </Text>
                </Button>
              )}
            </View>

            <View style={{width: '25%'}}>
              {!isOpenCamera ? null : (
                <Button
                  icon={
                    !flashlightEnabled
                      ? 'lightbulb-on-outline'
                      : 'lightbulb-off-outline'
                  }
                  mode="text"
                  style={{
                    backgroundColor: '#1566E0',
                    borderRadius: 8,
                    marginTop: 50,
                    marginLeft: 15,
                    width: '90%',
                  }}
                  labelStyle={{color: '#fff'}}
                  onPress={() => {
                    setFlashlightEnabled(!flashlightEnabled);
                  }}>
                  {!flashlightEnabled ? (
                    <Text style={{fontSize: 12}}>Light Off </Text>
                  ) : (
                    <Text style={{fontSize: 12}}>Light on </Text>
                  )}
                </Button>
              )}
            </View>
          </View>
        </SafeAreaView>
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {!isOpenCamera ? (
          <Button
            style={{
              backgroundColor: '#4285F4',
              borderRadius: 8,
              height: 100,
              width: 150,
            }}
            icon="qrcode-scan"
            mode="text"
            labelStyle={{
              color: '#fff',
              fontSize: 80,
              justifyContent: 'center',
              alignSelf: 'center',
              marginLeft: 10,
            }}
            onPress={() => {
              setIsOpenCamera(!isOpenCamera);
            }}></Button>
        ) : null}
      </View>
      <View style={{width: '19%', alignSelf: 'center', marginTop: 20}}>
        <Button
          mode="contained"
          style={{backgroundColor: '#1566E0', borderRadius: 8}}
          contentStyle={{height: 44, width: '100%'}}
          labelStyle={{color: 'white', fontSize: 12}}
          onPress={() => {
            navigation.navigate('Operator_daily_info');
          }}>
          Operator
        </Button>
      </View>

      <Text>{scannedData}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

//make this component available to the app
export default Login;
