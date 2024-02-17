import { useEffect, useState } from 'react';
import './assets/css/index.css';
import './plugins/fontawesome';
import db from './conf/dexieConfig';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';
import Formulario from './components/Formulario';
import FormularioEdicion from './components/FormularioEdicion';
import Cita from './components/Cita';
import Titulo from './components/shared/Titulo';

function App() {
  const [isEdit, setEdicion] = useState(false);
  const [citas, guardarCitas] = useState([]);
  const [citaAEditar, modificarCita] = useState({});
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  useEffect(() => {
    // Obtener citas de Dexie al cargar la aplicación
    db.citas.toArray().then((citasGuardadas) => {
      guardarCitas(citasGuardadas);
    });
  }, []);

  const crearCita = (cita) => {
    // Añadir cita a Dexie
    db.citas.add(cita);
    // Actualizar el estado local de citas
    guardarCitas([...citas, cita]);
  };

  const actualizarCita = (citaEditada) => {
    // Actualizar cita en Dexie
    db.citas.update(citaEditada.id, citaEditada);
    // Actualizar el estado local de citas
    const nuevasCitas = citas.map((cita) =>
      cita.id === citaEditada.id ? citaEditada : cita
    );
    guardarCitas(nuevasCitas);
    setEdicion(false);
  };

  const editarCita = (id) => {
    // Obtener la cita a editar de Dexie
    db.citas.where('id').equals(id).first().then((cita) => {
      setEdicion(true);
      modificarCita(cita);
    });
  };

  const eliminarCita = (id) => {
    // Eliminar cita de Dexie
    db.citas.delete(id);
    // Actualizar el estado local de citas
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  const cancelarCita = () => {
    setEdicion(false);
  };

  return (
    <>
      <Header />
      <main>
        <section id="form-section">
          {isEdit ? (
            <FormularioEdicion citaAEditar={citaAEditar} actualizarCita={actualizarCita} cancelarCita={cancelarCita} />
          ) : (
            <Formulario crearCita={crearCita} />
          )}
        </section>

        <section id="content-section">
          <Titulo titulo={titulo} />
          <hr />
          <div className="scroll-data">
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} editarCita={editarCita} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
