export default function formatDate(dateString: string): string {

    let date: Date = new Date(dateString);
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1;
    let year: number = date.getFullYear();

    // Agregar un cero delante del mes si es menor que 10
    let formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

    // Formatear la fecha como "dd-mm-yyyy"
    return `${day}/${formattedMonth}`;
}
