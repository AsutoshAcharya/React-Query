import axios from "axios";
import { useQuery,useMutation } from "react-query";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    // staleTime: 0,
    // refetchOnMount: true,
    // refetchOnWindowFocus: false,

    // refetchInterval: polling === null ? 3000 : false,
    // refetchIntervalInBackground: true,
    enabled: false,
    onSuccess,
    onError,
    // select: (data) => {
    //   const superHeroNames = data.data.map((hero) => {
    //     return hero.name;
    //   });
    //   console.log(superHeroNames);
    //   return superHeroNames;
    // },
  });
};
const addSuperHero=(hero)=>{
  return axios.post("http://localhost:4000/superheroes",hero);
}

export const useAddSuperHeroesData=()=>{
  return useMutation(addSuperHero);
}
