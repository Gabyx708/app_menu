export default function formatDateWithTime(dateString: string): string {
    let date: Date = new Date(dateString);
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();
    let hour:number = date.getHours();
    let minutes:number = date.getMinutes();

    // Agregar un cero delante del mes si es menor que 10
    let formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
    
     // Agregar un cero delante de los minutos si son menores que 10
     let formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

    // Formatear la fecha como "dd-mm-yyyy"
    return `${day}/${formattedMonth} ,${hour}:${formattedMinutes} hs`;
}
