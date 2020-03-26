import months from './months';

const getDateFormat = (DATE) => {
  const date = new Date(DATE);
  const getMonth = date.getMonth();
  const month = months[getMonth];
  const day = date.getDate();
  const year = date.getFullYear();
  const newDate = `${month} ${day}, ${year}`
  return newDate;
}

export default getDateFormat