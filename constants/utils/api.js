const getHomeData = async () => {
  try {
    const response = await fetch('https://api.tvmaze.com/search/shows?q=all');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return []
}

const searchSearchTerm = async (searchTerm) => {
  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  return []
}

const selfMovie =async(url)=>{
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {}
}
export { getHomeData ,selfMovie,searchSearchTerm}