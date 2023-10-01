import { date } from 'quasar';
export function nowToTime() {
    const time = new Date();
    const h = time.getHours();
    const m = time.getMinutes();
    const s = time.getSeconds();

    return (
        h.toString().padStart(2, '0') +
        ':' +
        m.toString().padStart(2, '0') +
        ':' +
        s.toString().padStart(2, '0')
    );
}

export function nowToDate() {
    // const obj = date.extractDate(
    //     new Date().toDateString(),
    //     'ddd, DD MMMM YYYY',
    //     {
    //         days: [
    //             'Montag',
    //             'Dienstag',
    //             'Mittwoch',
    //             'Donnerstag',
    //             'Freitag',
    //             'Samstag ',
    //             'Sonntag',
    //         ],
    //         daysShort: ['Mon', 'Die', 'Mit', 'Don.', 'Fre', 'Sam', 'Son'],
    //         months: [
    //             'Januar',
    //             'Februar',
    //             'März',
    //             'April',
    //             'Mai',
    //             'Juni',
    //             'Juli',
    //             'August',
    //             'September',
    //             'Oktober',
    //             'November',
    //             'Dezember',
    //         ],
    //         monthsShort: [
    //             'Jan',
    //             'Feb',
    //             'März',
    //             'Apr',
    //             'Mai',
    //             'Jun',
    //             'Jul',
    //             'Aug',
    //             'Sep',
    //             'Okt',
    //             'Nov',
    //             'Dez',
    //         ],
    //     }
    // );

    const timeStamp = Date.now();

    return date.formatDate(timeStamp, 'ddd, DD MMMM YYYY');
}
