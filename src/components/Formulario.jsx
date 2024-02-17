import { useState } from 'react';
import PropTypes from 'prop-types';
import db from '../conf/dexieConfig';

const Formulario = ({ crearCita }) => {
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: '',
  });

  const [error, actualizarError] = useState(false);

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  const actualizarState = (e) => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value,
    });
  };

  const submitCita = (e) => {
    e.preventDefault();
  
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
  
    const nuevaCita = {
      mascota,
      propietario,
      fecha,
      hora,
      sintomas,
    };
  
    // Agregar cita a Dexie
    db.citas.add(nuevaCita).then((id) => {
      // Obtener el ID asignado por Dexie y actualizar el estado local de citas
      nuevaCita.id = id;
      // Llamar a la función crearCita con la nueva cita
      crearCita(nuevaCita);
    });
  
    // Reiniciar el formulario
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: '',
    });
  };

  return (
    <>
      <h2>Crear Cita</h2>
      <hr />

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios.</p>
      ) : null}

      <div className="card">
        <form onSubmit={submitCita}>
          <div className="input-group">
            <label htmlFor="mascota">Mascota</label>
            <input id="mascota" type="text" name="mascota" placeholder="Nombre Mascota" onChange={actualizarState} value={mascota} />

            <label htmlFor="dueno">Dueño</label>
            <input id="dueno" type="text" name="propietario" placeholder="Nombre Dueño de la mascota" onChange={actualizarState} value={propietario} />

            <label htmlFor="fecha">Fecha</label>
            <input id="fecha" type="date" name="fecha" onChange={actualizarState} value={fecha} />

            <label htmlFor="hora">Hora</label>
            <input id="hora" type="time" name="hora" onChange={actualizarState} value={hora} />
          </div>

          <label htmlFor="sintomas">Síntomas</label>
          <textarea id="sintomas" name="sintomas" onChange={actualizarState} value={sintomas}></textarea>

          <button className="btn confirmar" type="submit"> Agregar Cita </button>
        </form>
      </div>
    </>
  );
};

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired,
};

export default Formulario;
