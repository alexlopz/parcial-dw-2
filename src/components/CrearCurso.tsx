import { useState } from "react";

const CrearCurso = () => {
  const [nombre, setNombre] = useState("");
  const [creditos, setCreditos] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [succes, setSucces] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      nombre,
      creditos: parseInt(creditos, 10),
      descripcion,
    };

    try {
      const response = await fetch(
        "https://test-deploy-12.onrender.com/cursos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSucces(true);
        console.log("Curso guardado:", data);
      } else {
        console.error("Error al guardar el curso");
        alert("Ocurrió un error al guardar el curso");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Error de red");
      setSucces(false);
    }
  };

  const limpiar = () => {
    setNombre("");
    setCreditos("");
    setDescripcion("");
    setSucces(false);
  };

  return (
    <div
      className="card mt-5"
      style={{
        width: "600px",
        margin: "auto",
        padding: "20px",
      }}
    >
      <form onSubmit={handleSubmit}>
        {succes && (
          <div className="alert alert-success" role="alert">
            Curso creado con exito!
          </div>
        )}

        <div className="mb-3 row">
          <label htmlFor="nombreCurso" className="col-sm-4 col-form-label">
            Nombre del curso
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              id="nombreCurso"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="creditos" className="col-sm-4 col-form-label">
            Créditos
          </label>
          <div className="col-sm-8">
            <input
              type="number"
              className="form-control"
              id="creditos"
              value={creditos}
              onChange={(e) => setCreditos(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="descripcion" className="col-sm-4 col-form-label">
            Descripción
          </label>
          <div className="col-sm-8">
            <textarea
              className="form-control"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
        </div>
        <div style={{ marginTop: "20px" }} className="container text-center">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button className="btn btn-warning ms-4" onClick={limpiar}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearCurso;
