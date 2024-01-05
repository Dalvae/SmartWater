import { FC, useContext } from "react";
import "./RegistrarDevolucion.css";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import { useNavigate } from "react-router-dom";
import { DevolucionParcial } from "./DevolucionParcial";
import { DevolucionTotal } from "./DevolucionTotal";
import { PrestamosContext } from "../PrestamosContext";

const RegistrarDevolucion: FC = () => {

    const {selectedOption, setSelectedOption} = useContext(PrestamosContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Prestamos');
    };

    const handleOptionChange = () => {
        setSelectedOption(!selectedOption);
    };

    return(
        <>
        <PageTitle titulo="Prestamos" icon="../Prestamos-icon.svg" />
        <div className="RegistrarDevolucion-titulo">
            <button className="RegistrarDevolucion-btn" onClick={handleClick}>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </button>
            <span>Registrar devolución</span>
        </div>
        <div className="RegistrarDevolucion-switch-contenido">
            <div
                className={`RegistrarDevolucion-switch-option ${selectedOption === false ? "selected" : ""}`}
                onClick={() => handleOptionChange()}
            >
                Parcial
            </div>
            <div
                className={`RegistrarDevolucion-switch-option ${selectedOption === true ? "selected" : ""}`}
                onClick={() => handleOptionChange()}
            >
                Total
            </div>
        </div>
        {
            selectedOption === false ?
            <DevolucionParcial/>
            :
            <DevolucionTotal/>
        }
        </>
    )
}

export{RegistrarDevolucion}