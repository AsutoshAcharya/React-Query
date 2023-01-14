import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

//polling fetching data in regular intervals

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const [polling, setPolling] = useState(false);
  const onSuccess = (data) => {
    if (data.data.length > 3) {
      setPolling(true);
    }
    console.log("perform side effect after data fetching", data);
  };
  const onError = () => {
    console.log("perform side effect after encountering error");
  };
  const { isLoading, data, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      // staleTime: 0,
      // refetchOnMount: true,
      // refetchOnWindowFocus: false,

      refetchInterval: !polling ? false : 3000,
      // refetchIntervalInBackground: true,

      enabled: false,
      onSuccess,
      onError,
    }
  );
  // console.log(isFetching);
  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button
        onClick={refetch}
        style={{
          backgroundColor: "green",
          border: "none",
          padding: "10px",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Fetch heroes
      </button>
      <br />
      <br />
      <div
        style={{
          gap: "5px",
          display: "flex",
        }}
      >
        {data?.data.map((hero) => {
          return (
            <div
              key={hero.name}
              style={{
                backgroundColor: "green",
                border: "none",
                padding: "10px",
                borderRadius: "10px",
                color: "white",
              }}
            >
              {hero.name}
            </div>
          );
        })}
      </div>
    </>
  );
};
