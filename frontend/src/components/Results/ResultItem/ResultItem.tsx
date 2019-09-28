import React from 'react'
import cssClasses from './ResultItem.module.css'
import { SbbIcon } from './SbbIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faCity,
  faHiking,
} from '@fortawesome/free-solid-svg-icons'
import { rappenToSwissFrancs } from '../../../utils/currency'
import { Activity } from '../../../models/Activity'

interface Props {
  id: number
  from: string
  to: string
  date: string
  price: number
  category: string
  discount: number
  vehicles: string[]
}

const MOCK_CATEGORIES: Activity[] = [
  { id: 1, name: 'City Trip', icon: faCity },
  { id: 2, name: 'Hiking', icon: faHiking },
]

export const ResultItem: React.FC<Props> = ({
  id,
  from,
  to,
  date,
  price,
  category,
  discount,
  vehicles,
}) => {
  let _date = new Date(date)
  let datevalues = {
    year: _date.getFullYear(),
    month: _date.getMonth() + 1,
    date: _date.getDate(),
    hours: _date.getHours(),
    minutes: _date.getMinutes(),
    seconds: _date.getSeconds(),
  }

  return (
    <div className={cssClasses.Wrapper}>
      <div
        className={`${cssClasses.ParentContainer} ${cssClasses.ResultItemContainer}`}
      >
        <div className={`${cssClasses.Column} ${cssClasses.W20}`}>
          <div className={cssClasses.CategoryColumn}>
            <div className={cssClasses.Row}>
              <FontAwesomeIcon
                className={'fa-2x'}
                icon={category === 'city' ? faCity : faHiking}
              />
            </div>
            <div className={cssClasses.Row}>
              {category === 'city' ? 'CIty Trip' : 'Hiking'}
            </div>
          </div>
        </div>
        <div className={`${cssClasses.Column} ${cssClasses.W30}`}>
          <div className={`${cssClasses.Row} ${cssClasses.fixedHeight}`}>
            <div className={cssClasses.ActivityColumn}>
              {' '}
              {vehicles.map((vehicle, i) => (
                <div
                  key={i}
                  className={`${cssClasses.ColumnOneThird} ${cssClasses.ActivityIcon}`}
                >
                  <SbbIcon icon={vehicle} />
                </div>
              ))}
            </div>
          </div>
          <div className={`${cssClasses.Row} ${cssClasses.Padded}`}>
            {datevalues.hours + ' : ' + datevalues.minutes}
          </div>
          <div className={`${cssClasses.Row}`}>
            <FontAwesomeIcon className={'fa-2x'} icon={faLongArrowAltRight} />
          </div>
          <div className={`${cssClasses.Row} ${cssClasses.fixedHeight}`}>
            {datevalues.date + '.' + datevalues.month + '.' + datevalues.year}
          </div>
        </div>
        <div className={`${cssClasses.Column} ${cssClasses.W30}`}>
          <div className={`${cssClasses.Row} ${cssClasses.fixedHeight}`}></div>
          <div className={`${cssClasses.Row} ${cssClasses.Padded}`}>
            {datevalues.hours + ' : ' + datevalues.minutes}
          </div>
          <div className={`${cssClasses.Row}`}>
            <FontAwesomeIcon className={'fa-2x'} icon={faLongArrowAltLeft} />
          </div>
          <div className={`${cssClasses.Row} ${cssClasses.fixedHeight}`}></div>
        </div>
        <div className={`${cssClasses.LastColumn} ${cssClasses.W20}`}>
          <div className={`${cssClasses.Row}`}>
            <div className={cssClasses.DiscountWrapper}>
              <div className={cssClasses.Discount}>
                <div className={cssClasses.DiscountValue}>{discount + '%'}</div>
              </div>
            </div>
          </div>

          <div
            className={`${cssClasses.Row} ${cssClasses.Price} ${cssClasses.fixedHeight}`}
          >
            <div style={{ marginRight: '2px' }}>
              {rappenToSwissFrancs(price)}
            </div>
            <div>.-</div>
          </div>
        </div>
      </div>
    </div>
  )
}
