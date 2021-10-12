import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import estilos from "../VideogameDetails/VideogameDetails.module.css";
import { getGameDetails, clearGameDetails } from "../../actions/actions";
import { useParams } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";

const VideogameDetails = () => {

    function renderSwitch(key) {
        key = Math.floor(key)
        return <h1>{'⭐'.repeat(key)}</h1>
    }

  const gameDetails = useSelector((state) => state.gameDetail);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(clearGameDetails());
    dispatch(getGameDetails(id));
  }, []);

  return gameDetails.name ? (
    <div>
      <div className={estilos.contenedor_details_top}>
        <div className={estilos.contenedor_nombre}>
          <p>{gameDetails.name}</p>
          <span>{renderSwitch(gameDetails.rating)}</span>
        </div>
        <div>
          <img
            className={estilos.imagen_de_fondo}
            src={gameDetails.aditional_image}
            alt="Not Found"
          />
        </div>
      </div>

        <div>
            <h1>Description : </h1>
            <p>{gameDetails.description}</p>
        </div>

      <div>



        <div className={estilos.contenedor_abajo}>
        <div className={estilos.contenedor_plataformas}>
          <h1>Plataformas:{" "}</h1>
          {gameDetails.platforms.map((plat) => {
            return (
              <div>
                <p>{plat.name}</p>
              </div>
            );
          })}
        </div>
        <div className={estilos.contenedor_generos}>
          <h1>Generos:{" "}</h1>
          {gameDetails.genres.map((genre) => {
            return (
              <div>
                <p>{genre.name}</p>
              </div>
            );
          })}
        </div>
        <div className={estilos.contenedor_date}>
            <h1>Release Date: </h1>
        <p>{gameDetails.released_date}</p>
        </div>
        </div>

      </div>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default VideogameDetails;
