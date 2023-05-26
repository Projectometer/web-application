export function nowToTime() {
  const time = new Date();
  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  return h.toString().padStart(2, '0') + ':' +
    m.toString().padStart(2, '0') + ':' +
    s.toString().padStart(2, '0');
}

export function nowToDate() {
  const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
  const days = ['So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.'];
  const d = new Date();
  const month = months[d.getMonth()];
  const day = days[d.getDay()];
  return day + ' ' + d.getDate() + '  ' + month + '  ' + d.getFullYear();
}
