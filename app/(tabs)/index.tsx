import { Image, StyleSheet, Platform, TouchableOpacity, View, Text, FlatList, StatusBar, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getHomeData } from '../../constants/utils/api'
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';
import { Ionicons } from '@expo/vector-icons';
export default function HomeScreen() {
  const [isLoaded, setLoaded] = useState(false)

  const [data, setData] = useState([{
    score: 0,
    show: {
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
      webChannel: {
        id: null,
        name: "",
        country: {
          name: "",
          code: "",
          timezone: ""
        },
        officialSite: ""
      },
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
        self: { href: "" },
        previousepisode: { href: "", name: "" },
        nextepisode: { href: "", name: "" }
      }
    }
  }])
  const router = useRouter()
  

  const fetchData = async () => {
    const res = await getHomeData()
    setData(res)
    setLoaded(true)
    console.log(res.length)

  }

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


  useEffect(() => {
    fetchData()
  }, [])
  return (
    <View style={styles.container}>

      <View style={styles.searchArea}>

        <Text style={styles.heading}>
          Netflix clone
        </Text>




      </View>
      {
        isLoaded ? (
          <FlatList style={styles.list}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigate(item)}>
                <View style={styles.item}>
                  <Image source={{ uri: item.show.image?.medium || "https://static.tvmaze.com/uploads/images/medium_portrait/513/1283360.jpg" }} style={styles.img} />
                </View>
              </TouchableOpacity>

            )}
            keyExtractor={(item) => item.show._links.self.href}
            numColumns={3}  // Define number of columns
            columnWrapperStyle={styles.row}  // Style to apply spacing between the rows
          />
        ) : (
          <Text>Loading</Text>
        )
      }
      <StatusBar
        backgroundColor={'#524e4e'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 30,
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
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
    width: '98%',
    height: 60,

    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    // paddingHorizontal: 20,
    color: 'gray'

  },
  
  list: {
    width: '100%'
  },
  img: {
    width: 110,
    height: 200,
  
    resizeMode: 'cover',
    borderRadius: 8,
  },
  item: {
    flex: 1, // Make sure each item takes up equal space
    margin: 5, // Margin between items
  },
  row: {
    justifyContent: 'space-between', // Space out the columns in a row
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
  }
});
