// import axios from "axios";

// export const fetchPizzas = async () => {
//   try {
//     const { data } = await fetch.get(
//       "https://64649b2d043c103502bdc4e9.mockapi.io/api/pizza/items"
//     );
//     return data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

async function fecthPizzas() {
  try {
    const data = await fetch(
      "https://64649b2d043c103502bdc4e9.mockapi.io/api/pizza/items"
    );
    const response = await data.json();

    console.log(response);
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("Fetched");
  }
}

fecthPizzas();
