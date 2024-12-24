import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams, useNavigation, useRouter } from 'expo-router'
import { selfMovie } from '@/constants/utils/api'

const details = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const { movie } = useGlobalSearchParams()
  const [current, setCurrent] = useState(movie)
  const [self, setSelf] = useState({
    id: null,
    url: "",
    name: "",
    type: "",
    language: "",
    genres: [],
    status: "",
    runtime: null,
    averageRuntime: null,
    premiered: "",
    ended: null,
    officialSite: "",
    schedule: {
      time: "",
      days: []
    },
    rating: {
      average: null
    },
    weight: null,
    network: {
      id: null,
      name: "",
      country: {
        name: "",
        code: "",
        timezone: ""
      },
      officialSite: ""
    },
    webChannel: null,
    dvdCountry: null,
    externals: {
      tvrage: null,
      thetvdb: null,
      imdb: ""
    },
    image: {
      medium: "",
      original: ""
    },
    summary: "",
    updated: null,
    _links: {
      self: {
        href: ""
      },
      previousepisode: {
        href: "",
        name: ""
      },
      nextepisode: {
        href: "",
        name: ""
      }
    }
  })
  // const parsedMovie = JSON.parse(movie);

  const getSelfDetails = async () => {

    const res = await selfMovie(current)
    console.log(res)
    setSelf(res)

  }
  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
    getSelfDetails()

  }, [])
  return (
    <ScrollView>

      <View style={styles.container}>
        <View style={styles.movieItem}>

          <Image

            source={{ uri: self?.image?.original || self?.image?.medium || '' }}
            style={styles.movieImage}

          />
          <View style={styles.row}>

            <Text style={styles.header}>{self.name}</Text>
            <Text style={styles.sectionTitle}>{self.rating.average}/10</Text>
          </View>

          <View style={styles.section}>
            ////////////////////////////////////////////////////////////
            <Text style={styles.movieTitle}>{self.summary}</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.sectionTitle}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {
                setCurrent(self._links.previousepisode.href)
              }}>
                <Text style={styles.sectionTitle}>Next</Text>
              </TouchableOpacity>
            </View>
           
            <Text style={styles.sectionTitle}>Runtime: {self?.averageRuntime}</Text>
            

            </View>
            <View style={styles.section}>
            <Text style={styles.content}>Genres: {self?.genres}</Text>
            <Text style={styles.content}>Language: {self.language}</Text>
            <Text style={styles.content}>Official Site: {self.officialSite}</Text>
            </View>

        
          </View>


        <StatusBar
          backgroundColor={'#121212'}
        />
      </View>
    </ScrollView>
  )
}

export default details


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  content:{
    fontSize:15,
    color:'red',
    margin:10
  },
  horizontalList: {
    marginVertical: 10,
  },
  section: {
    margin: 10,
    backgroundColor: '#151f1f',
    // width:'100%',
    minHeight: 140,
    padding:10,
    borderRadius: 10,

  },
  movieItem: {
    // marginRight: 10,
    // width: '100%',
  },
  button: {
    width: 100,
    height: 50, marginHorizontal: 20,


    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10
    // borderWidth: 1
  },
  movieImage: {
    width: '100%',
    height: 500,
    padding: 10,
    borderRadius: 10,

  },

  movieTitle: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },

  row: {
    // flex:1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});