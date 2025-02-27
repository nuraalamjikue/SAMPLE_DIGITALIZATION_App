import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  StatusBar,
  BackHandler,
  Animated,
  NativeModules,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import instance from '../Axiosinstance';
import Immersive from 'react-native-immersive';
//import AndroidSystemBars from 'react-native-system-bars';

const Dashboard = () => {
  const {getEmployeeCode, getPassword, getRoleID} = useSelector(
    state => state.userInfo,
  );
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [MenuPermissionDate, setMenuPermissionDate] = useState([]);
  //Loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      MenuPermissionDatehandelar();
      Immersive.on();
      Immersive.setImmersive(true);

      // AndroidSystemBars.enableFullScreenMode(
      //   'sticky-immersive',
      //   /*preventResizing (optional)*/ true,
      // );
    }
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to Exit Apps?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isFocused]);

  const MenuPermissionDatehandelar = () => {
    instance
      .get(`Menu_Permission/Menu_Permission/${getEmployeeCode}`)
      .then(response => {
        setMenuPermissionDate(response.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const showAlert = () => {
    Alert.alert('Option selected');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C76E3" />
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={MenuPermissionDate}
        horizontal={false}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[styles.card, {backgroundColor: item.Color}]}
              onPress={() => {
                navigation.navigate(item.Link);
              }}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.Title}</Text>
                <Image
                  style={styles.icon}
                  source={{
                    uri: 'https://img.icons8.com/ios/40/000000/settings.png',
                  }}
                />
              </View>
              {/* <Image style={styles.cardImage} source={{uri: item.image}} /> */}
              <View style={styles.cardFooter}>
                <Text style={styles.subTitle}>{item.members} members</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor: '#E6E6E6',
  },
  listContainer: {
    alignItems: 'center',
  },
  /******** card **************/
  card: {
    // marginHorizontal: 2,
    // marginVertical: 2,
    flexBasis: '45%',
    borderTopWidth: 0.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderRightColor: 'rgba(0,0,0,0.2)',
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderLeftColor: 'rgba(0,0,0,0.1)',

    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    //shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 1.41,
    elevation: 4,
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 12,
    flex: 1,
    color: '#FFFFFF',
  },
  icon: {
    height: 20,
    width: 20,
  },
});
export default Dashboard;
