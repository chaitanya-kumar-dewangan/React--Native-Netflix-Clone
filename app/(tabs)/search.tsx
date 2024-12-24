import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { searchSearchTerm } from '@/constants/utils/api';
import { useRouter } from 'expo-router';

const search = () => {
  // const [data, setData] = useState([{
  //   score: 0,
  //   show: {
  //     id: null,
  //     url: "",
  //     name: "",
  //     type: "",
  //     language: "",
  //     genres: [],
  //     status: "",
  //     runtime: null,
  //     averageRuntime: null,
  //     premiered: "",
  //     ended: null,
  //     officialSite: "",
  //     schedule: {
  //       time: "",
  //       days: []
  //     },
  //     rating: {
  //       average: null
  //     },
  //     weight: null,
  //     network: {
  //       id: null,
  //       name: "",
  //       country: {
  //         name: "",
  //         code: "",
  //         timezone: ""
  //       },
  //       officialSite: ""
  //     },
  //     webChannel: {
  //       id: null,
  //       name: "",
  //       country: {
  //         name: "",
  //         code: "",
  //         timezone: ""
  //       },
  //       officialSite: ""
  //     },
  //     dvdCountry: null,
  //     externals: {
  //       tvrage: null,
  //       thetvdb: null,
  //       imdb: ""
  //     },
  //     image: {
  //       medium: "",
  //       original: ""
  //     },
  //     summary: "",
  //     updated: null,
  //     _links: {
  //       self: { href: "" },
  //       previousepisode: { href: "", name: "" },
  //       nextepisode: { href: "", name: "" }
  //     }
  //   }
  // }])

  const [data, setData] = useState([])
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = (item: any) => {
    // Convert the movie object to a JSON string
    // const movieData = JSON.stringify(item);

    // Push data with the `params` as a stringified JSON
    router.push({
      pathname: '/details',
      // params: { movie: movieData }, // passing the movie data as string
      params: { movie: item.show._links.self.href }, // passing the movie data as string
    });
  };
  const fetchData = async () => {

    const res = await searchSearchTerm(searchTerm)

    console.log(res)
    setData(res)
  }


  const ResultItem = ({ item }:any) => {
    return (

  <TouchableOpacity onPress={() => navigate(item)}>
      <View style={[styles.card, styles.row]}>
        <View style = {styles.column}>

        <Text style={styles.textHeading}>{item.show.name}</Text>
        <Text style={styles.textContent}>{item.show.rating.average || '?'}/10</Text>
        <Text style={styles.textContent}>Watch Time: {item.show.averageRuntime}</Text>
        <Text style={styles.textMedium}>{item.show.language}</Text>
        </View>


        <Image style={styles.featuredImage}
          source={{ uri: item?.show?.image?.medium || '' }}
        />
      </View>
      </TouchableOpacity>
    )
  }
  return (<View style={styles.container}>

    <View style={styles.row}>

      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.searchField}
        placeholder='Search'
        placeholderTextColor={'gray'}
      />
      <Ionicons style={styles.searchIcon}
        onPress={fetchData}
        name='search' size={30}
        color={'white'} />
    </View>
    <View style={styles.section}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.show.url}
        renderItem={({ item }) => <ResultItem item={item} />}
      />
    </View>
  </View>


  )
}

export default search

const styles = StyleSheet.create({
  container: {
    // paddingTop: 30,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#121212',
  },

  card: {
    margin: 5,
    width: '95%',
    minHeight: 150,
    padding: 5,
    borderRadius: 20,

    backgroundColor: '#4d4848'
  },
  featuredImage: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    color: 'white'
  },
  section: {
    width: '100%',
    height: '85%',
    // backgroundColor:'#242121'
  },
  searchArea: {
    width: '98%',
    height: 50,

    // marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1

  },
  searchField: {
    width: '90%',
    height: 60,

    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,

    paddingHorizontal: 20,
    color: 'gray'

  },
  row: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  column:{
flex:1
  },

  textHeading:{
fontSize:25,

fontWeight:'bold'  },


textContent:{
fontSize:16,
color:'#756d6d'
},
textMedium:{
fontSize:22,
color:'#9e9393'
},
  searchIcon: {
    width: 60,
    height: 60,
    padding: 10
  }
})