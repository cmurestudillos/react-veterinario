import { useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import db from '../../conf/dexieConfig';

const Header = () => {
  const inputFile = useRef(null);

  const downloadData = async () => {
    try {
      // Obtener citas de IndexedDB
      const citas = await db.citas.toArray();
      // Convertir el array de objetos a formato JSON
      const citasJSON = JSON.stringify(citas);
      // Crear un Blob con el contenido JSON
      const file = new Blob([citasJSON], { type: "application/json" });
      // Crear una URL para el Blob
      const url = URL.createObjectURL(file);
      // Crear un enlace temporal y hacer clic en él para iniciar la descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = 'citas.json';
      link.click();
      // Liberar el objeto URL creado
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };
  

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onFileSelected = async (file) => {
    const fileToUpload = file.target.files[0];
    
    if (typeof FileReader !== "undefined") {
      let fileReader = new FileReader();
      fileReader.onload = async () => {
        let contenidoFichero = fileReader.result;
        let citas = JSON.parse(contenidoFichero);

        // Limpiamos la base de datos antes de importar nuevos datos
        // await db.citas.clear();

        // Insertamos las nuevas citas en la base de datos Dexie
        await db.citas.bulkAdd(citas);

        window.location.reload();
      };
      fileReader.readAsText(fileToUpload);
    }
  };

  return ( 
    <header>
      <div className="header-left">
        <h3>Gestión de Citas y Pacientes</h3>
      </div>
      <div className="header-right">
        <a id="download" href="#!" onClick={() => downloadData()}>
          <FontAwesomeIcon icon="file-export" title="Exportar" />
        </a>
        <FontAwesomeIcon icon="file-upload" onClick={onButtonClick} title="Importar" />
        <input hidden onChange={onFileSelected} ref={inputFile} type="file" id="file" />            
      </div>
    </header> 
  );
}

export default Header;
