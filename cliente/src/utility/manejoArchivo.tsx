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
}