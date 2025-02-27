// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   Alert,
//   FlatList,
// } from 'react-native';

// const Sidebar = () => {
//   const optionlist = [
//     {
//       id: 1,
//       title: 'You',
//       color: '#FF4500',
//       image: 'https://img.icons8.com/color/70/000000/name.png',
//     },
//     {
//       id: 2,
//       title: 'Home',
//       color: '#87CEEB',
//       image: 'https://img.icons8.com/office/70/000000/home-page.png',
//     },
//     {
//       id: 3,
//       title: 'Love',
//       color: '#4682B4',
//       image: 'https://img.icons8.com/color/70/000000/two-hearts.png',
//     },
//     {
//       id: 4,
//       title: 'Family',
//       color: '#6A5ACD',
//       image: 'https://img.icons8.com/color/70/000000/family.png',
//     },
//     {
//       id: 5,
//       title: 'Friends',
//       color: '#FF69B4',
//       image: 'https://img.icons8.com/color/70/000000/groups.png',
//     },
//     {
//       id: 6,
//       title: 'School',
//       color: '#00BFFF',
//       image: 'https://img.icons8.com/color/70/000000/classroom.png',
//     },
//     {
//       id: 7,
//       title: 'Things',
//       color: '#00FFFF',
//       image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
//     },
//     {
//       id: 8,
//       title: 'World',
//       color: '#20B2AA',
//       image: 'https://img.icons8.com/dusk/70/000000/globe-earth.png',
//     },
//     {
//       id: 9,
//       title: 'Remember',
//       color: '#191970',
//       image: 'https://img.icons8.com/color/70/000000/to-do.png',
//     },
//     {
//       id: 10,
//       title: 'Game',
//       color: '#008080',
//       image: 'https://img.icons8.com/color/70/000000/basketball.png',
//     },
//   ];

//   const [options, setOptions] = useState(optionlist);

//   const clickEventListener = item => {
//     Alert.alert(item.title);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         style={styles.list}
//         contentContainerStyle={styles.listContainer}
//         data={options}
//         horizontal={false}
//         numColumns={2}
//         keyExtractor={item => {
//           return item.id;
//         }}
//         renderItem={({item}) => {
//           return (
//             <View>
//               <TouchableOpacity
//                 style={[styles.card, {backgroundColor: item.color}]}
//                 onPress={() => {
//                   clickEventListener(item);
//                 }}>
//                 <Image style={styles.cardImage} source={{uri: item.image}} />
//               </TouchableOpacity>

//               <View style={styles.cardHeader}>
//                 <View style={{alignItems: 'center', justifyContent: 'center'}}>
//                   <Text style={[styles.title, {color: item.color}]}>
//                     {item.title}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 40,
//     backgroundColor: '#fff',
//   },
//   list: {
//     paddingHorizontal: 5,
//     backgroundColor: '#fff',
//   },
//   listContainer: {
//     alignItems: 'center',
//   },
//   /******** card **************/
//   card: {
//     shadowColor: '#474747',
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,

//     elevation: 12,
//     marginVertical: 20,
//     marginHorizontal: 40,
//     backgroundColor: '#e2e2e2',
//     //flexBasis: '42%',
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardHeader: {
//     paddingVertical: 17,
//     paddingHorizontal: 16,
//     borderTopLeftRadius: 1,
//     borderTopRightRadius: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardContent: {
//     paddingVertical: 12.5,
//     paddingHorizontal: 16,
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingTop: 12.5,
//     paddingBottom: 25,
//     paddingHorizontal: 16,
//     borderBottomLeftRadius: 1,
//     borderBottomRightRadius: 1,
//   },
//   cardImage: {
//     height: 50,
//     width: 50,
//     alignSelf: 'center',
//   },
//   title: {
//     fontSize: 24,
//     flex: 1,
//     alignSelf: 'center',
//     fontWeight: 'bold',
//   },
// });

// export default Sidebar;

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Sidebar = () => {
  const data = [
    {
      id: 1,
      title: 'You',
      color: '#FF4500',
      members: 8,
      //image: 'https://img.icons8.com/color/70/000000/name.png',
      Link: 'Dashboard',
    },
    {
      id: 1,
      title: 'Home',
      color: '#87CEEB',
      members: 6,
      //image: 'https://img.icons8.com/office/70/000000/home-page.png',
      Link: 'Dashboard',
    },
    {
      id: 2,
      title: 'Love',
      color: '#4682B4',
      members: 12,
      // image: 'https://img.icons8.com/color/70/000000/two-hearts.png',
      Link: 'Dashboard',
    },
    {
      id: 3,
      title: 'Family',
      color: '#6A5ACD',
      members: 5,
      //image: 'https://img.icons8.com/color/70/000000/family.png',
      Link: 'Dashboard',
    },
    {
      id: 4,
      title: 'Friends',
      color: '#FF69B4',
      members: 6,
      // image: 'https://img.icons8.com/color/70/000000/groups.png',
      Link: 'Dashboard',
    },
    {
      id: 5,
      title: 'School',
      color: '#00BFFF',
      members: 7,
      //image: 'https://img.icons8.com/color/70/000000/classroom.png',
      Link: 'Dashboard',
    },
    {
      id: 6,
      title: 'Things',
      color: '#00FFFF',
      members: 8,
      // image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
      Link: 'Dashboard',
    },
    {
      id: 8,
      title: 'World',
      color: '#20B2AA',
      members: 23,
      // image: 'https://img.icons8.com/dusk/70/000000/globe-earth.png',
      Link: 'Dashboard',
    },
    {
      id: 9,
      title: 'Remember',
      color: '#191970',
      members: 45,
      // image: 'https://img.icons8.com/color/70/000000/to-do.png',
      Link: 'Dashboard',
    },
    {
      id: 9,
      title: 'Game',
      color: '#008080',
      members: 13,
      //image: 'https://img.icons8.com/color/70/000000/basketball.png',
      Link: 'Dashboard',
    },
  ];

  const [options, setOptions] = useState(data);

  const showAlert = () => {
    Alert.alert('Option selected');
  };
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContainer}
        data={options}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[styles.card, {backgroundColor: item.color}]}
              onPress={() => {
                navigation.navigate(item.Link);
              }}>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
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
export default Sidebar;
