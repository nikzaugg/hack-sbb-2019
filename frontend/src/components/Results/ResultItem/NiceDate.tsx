import React from 'react'

interface Props {
  date: string
}

export const NiceDate: React.FC<Props> = ({ date }) => {
  console.log(date)
  let _date = new Date(date)
  let datevalues = {
    year: _date.getFullYear(),
    month: _date.getMonth() + 1,
    date: _date.getDate(),
    hours: _date.getHours(),
    minutes: _date.getMinutes(),
    seconds: _date.getSeconds(),
  }

  return <span>{datevalues.hours + ' : ' + datevalues.minutes}</span>
}
