const BASE_URL = 'https://dry-fortress-11373.herokuapp.com/api/v1/'
// const LOCAL_URL = 'http://localhost:3000/api/v1'

export function fetchArtworks(){
  let artworks;
  fetch(`${BASE_URL}artworks`).then(function(res){
    artworks = res.json
  });
  return {
    artworks
  }
}
//
// export function createCocktail(params){
//   const cocktail = fetch(`${BASE_URL}/cocktails`,
//     {method: 'POST',
//     body: JSON.stringify(params),
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }});
//
//   return {
//     type: 'CREATE_COCKTAIL',
//     payload: params.cocktail
//   }
// }
