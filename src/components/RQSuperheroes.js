import React from "react";
import { useSuperHeroData } from "../hooks/useSuperHeroData";
import { useParams } from "react-router-dom";

const RQSuperheroes = () => {
  const { heroId } = useParams();
  console.log(heroId);
  const { isLoading, data, isError, error } = useSuperHeroData(heroId);
  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      {data?.data.name} -- {data?.data.alterEgo}
    </div>
  );
};

export default RQSuperheroes;
