import reactLogo from "../assets/react.svg";
import url_Api from "../services/api.services";

export const descargaArchivo = async (pdf:string) => {
    const response = await fetch(`${url_Api.apiArchivo}/d/${pdf}`);
    if (!response.ok) {
    throw new Error('Error al descargar el PDF');
    }
    // Código para descargar el PDF, si es necesario
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', pdf);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
};

export const cargarImagen = async (img: string) => {
    if(img != "null" && img != "" && img != null){
        const response = await fetch(`${url_Api.apiArchivo}/${img}`);
        if (!response.ok) {
            throw new Error('Error al mostrar IMG');
        }
        const blob = await response.blob(); // Obtener el contenido de la respuesta como un blob
        const imgUrl = URL.createObjectURL(blob); // Crear una URL para el blob (contenido de la imagen)
        return imgUrl || reactLogo; // Si la URL está vacía, usar reactLogo
    }
    return reactLogo;
};