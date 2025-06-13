const API_URL = 'https://api.giphy.com/v1/gifs/search?api_key=';
const API_KEY = '0dwb5mLmLgJCQ3IJxbW3wz09rrzAeDid&q=';

const getGifs = async(category)=>{
    const url = `${API_URL}${API_KEY}${category}&limit=10`;

    const resp= await fetch(url);

    const { data } = await resp.json();
    const gifs = data.map((g)=>(
        {
            id: g.id,
            title: g.title,
            url: g.images.downsized_medium.url
        }
    ))
    // console.log(gifs)
    return gifs;
}

export default getGifs;
