import { useState } from 'react';
import PropTypes from 'prop-types';
import db from '../conf/dexieConfig';

const FormularioEdicion = ({ citaAEditar, actualizarCita, cancelarCita }) => {
  const [citaId, actualizarCampos] = useState({
    id: citaAEditar.id,
    mascota: citaAEditar.mascota,
    propietario: citaAEditar.propietario,
    fecha: citaAEditar.fecha,
    hora: citaAEditar.hora,
    sintomas: citaAEditar.sintomas,
  });

  const [error, actualizarError] = useState(false);

  const actualizarState = (e) => {
    actualizarCampos({
      ...citaId,
      [e.target.name]: e.target.value,
    });
  };

  const submitCita = async () => {
    const { mascota, propietario, fecha, hora, sintomas } = citaId;

    if (
        mascota.trim() === '' ||
        propietario.trim() === '' ||
        fecha.trim() === '' ||
        hora.trim() === '' ||
        sintomas.trim() === ''
    ) {
        actualizarError(true);
        return;
    }

    actualizarError(false);
  
    try {
      // Actualizar la cita en la base de datos Dexie
      await db.citas.update(citaId.id, citaId);
  
      // Llamar a la función actualizarCita con la cita actualizada
      actualizarCita(citaId); // <-- Añadir esta línea
  
      // Reiniciar el form
      actualizarCampos({
        id: '',
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
      });
    } catch (error) {
      console.error('Error al actualizar la cita:', error);
    }
  };
  

  return (
    <>
      <h2>Modificar Cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios.</p>
      ) : null}

      <div className="card">
        <form>
          <div className="input-group">
            <label htmlFor="mascota">Mascota</label>
            <input id="mascota" type="text" name="mascota" onChange={actualizarState} placeholder="Nombre Mascota" defaultValue={citaAEditar.mascota} />

            <label htmlFor="dueno">Due&ntilde;o</label>
            <input id="dueno" type="text" name="propietario" onChange={actualizarState} placeholder="Nombre  Dueño de la mascota" defaultValue={citaAEditar.propietario} />

            <label htmlFor="fecha">Fecha</label>
            <input id="fecha" type="date" name="fecha" onChange={actualizarState} defaultValue={citaAEditar.fecha} />

            <label htmlFor="hora">Hora</label>
            <input id="hora" type="time" name="hora" onChange={actualizarState} defaultValue={citaAEditar.hora} />
          </div>

          <label htmlFor="sintomas">Síntomas</label>
          <textarea id="sintomas" name="sintomas" onChange={actualizarState} defaultValue={citaAEditar.sintomas}></textarea>
          <div className="form-buttons">
            <button className="btn editar" onClick={() => submitCita()}> Modificar </button>
            <button className="btn cancelar" onClick={() => cancelarCita(false)}> Cancelar </button>
          </div>
        </form>
      </div>
    </>
  );
};

FormularioEdicion.propTypes = {
  citaAEditar: PropTypes.object.isRequired,
  actualizarCita: PropTypes.func.isRequired,
  cancelarCita: PropTypes.func.isRequired,
};

export default FormularioEdicion;
