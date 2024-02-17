import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from '../conf/dexieConfig';

const Cita = ({ cita, eliminarCita, editarCita }) => {
  const btnEditar = (id) => {
    editarCita(id);
  };

  const eliminarCitaDexie = (id) => {
    // Eliminar la cita de la base de datos Dexie
    db.citas.delete(id).then(() => {
      // Llamar a la función eliminarCita con el ID de la cita
      eliminarCita(id);
    });
  };

  return (
    <div className="card">
      <div className="card-content">
        <p><strong>Mascota:</strong> <span>{cita.mascota}</span>{" "}</p>
        <p><strong>Dueño:</strong> <span>{cita.propietario}</span>{" "}</p>
        <p><strong>Fecha:</strong> <span>{cita.fecha}</span>{" "}</p>
        <p><strong>Hora:</strong> <span>{cita.hora}</span>{" "}</p>
        <p><strong>Sintomas:</strong> <span>{cita.sintomas}</span>{" "}</p>
      </div>
      <div className="card-buttons">
        <button className="btn editar" onClick={() => btnEditar(cita.id)}>Editar <FontAwesomeIcon icon="edit" title="Editar" /></button>
        <button className="btn cancelar" onClick={() => eliminarCitaDexie(cita.id)}> Eliminar <FontAwesomeIcon icon="trash" title="Eliminar" /></button>
      </div>
    </div>
  );
};

Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired,
  editarCita: PropTypes.func.isRequired,
};

export default Cita;
