//DOM CON TYPESCRIPT
const canvas = document.getElementById("canvas");

// SE INFIERE QUE DENTRO DEL IF YA SOLO QUEDA REPORAR UN HTMLCanvasElement
if (canvas instanceof HTMLCanvasElement) {
  // <---- Inferencia
  const ctx = canvas.getContext("2d");
}

function mostrarLongitud(objecto: number | string) {
  if (typeof objecto === "string") {
    return objecto.length;
  }

  return objecto.toString().length;
}

mostrarLongitud(1);
