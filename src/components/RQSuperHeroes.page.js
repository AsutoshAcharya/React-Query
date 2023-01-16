import { useState } from "react";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

//polling fetching data in regular intervals

export const RQSuperHeroesPage = () => {
  const [polling, setPolling] = useState(null);
  const onSuccess = (data) => {
    // if (data?.data?.length > 3) {
    //   setPolling(true);
    // }
    console.log("perform side effect after data fetching", data);
    // console.log(data);
  };
  const onError = () => {
    console.log("perform side effect after encountering error");
  };
  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);
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
        {/* {data?.data.map((hero) => {
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
        })} */}
        {data?.map((heroname) => {
          return (
            <div
              key={heroname}
              style={{
                backgroundColor: "green",
                border: "none",
                padding: "10px",
                borderRadius: "10px",
                color: "white",
              }}
            >
              {heroname}
            </div>
          );
        })}
      </div>
    </>
  );
};
