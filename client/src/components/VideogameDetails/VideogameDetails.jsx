import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import estilos from "../VideogameDetails/VideogameDetails.module.css";
import { getGameDetails, clearGameDetails } from "../../actions/actions";
import { useParams } from "react-router-dom";
import LoadingPage from "../LoadingPage/LoadingPage";
import imagenN from '../../media/images/image-not-found.png'

const VideogameDetails = () => {

  function checkURL(url) {
    if (typeof url !== 'string') return false;
    return (url.match(/\.(jpg|jpeg|gif|png)$/) != null);
  }

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
  }, [dispatch, id]);

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
            src={checkURL(gameDetails.aditional_image) ? gameDetails.aditional_image : imagenN }
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
              <div key={plat.name}>
                <p>{plat.name}</p>
              </div>
            );
          })}
        </div>
        <div className={estilos.contenedor_generos}>
          <h1>Generos:{" "}</h1>
          {gameDetails.genres.map((genre) => {
            return (
              <div key={genre.name}>
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
