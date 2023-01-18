import { useState } from "react";
import {
  useAddSuperHeroesData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";
import { Link } from "react-router-dom";
//polling fetching data in regular intervals

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
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
  const { mutate: addHero } = useAddSuperHeroesData();
  // console.log(isFetching);

  const handleClick = (e) => {
    e.preventDefault();
    const hero = { name, alterEgo };
    addHero(hero);
    name("");
    alterEgo("");
  };
  if (isLoading) {
    return <h2>Loading ...</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <form>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="alterEgo"
          onChange={(e) => {
            setAlterEgo(e.target.value);
          }}
        />
        <button onClick={handleClick}>send</button>
      </form>
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
              key={hero.id}
              style={{
                backgroundColor: "green",
                border: "none",
                padding: "10px",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <Link to={`/rq-super-heroes/${hero.id}`}> {hero.name}</Link>
            </div>
          );
        })}
        {/* {data?.map((heroname) => {
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
        })} */}
      </div>
    </>
  );
};
