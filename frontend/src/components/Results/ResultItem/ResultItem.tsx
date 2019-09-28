import React from 'react'
import cssClasses from './ResultItem.module.css'
import _round from 'lodash/round'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons'
import { SearchResult } from '../../../models/SearchResult'
import { ActivityIcon } from './ActivityIcon'
import { Dot } from './Dot'

interface Props {
  data: SearchResult
}

export const ResultItem: React.FC<Props> = props => {
  const { price, start, end, discount, categories } = props.data

  let highestCategories = Object.entries(categories).sort((a, b) => b[1] - a[1])
  let max = highestCategories[0][1];
  let min = highestCategories[4][1];
  const scale = (num: number, in_min: number, in_max: number, out_min: number, out_max: number) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  let nrOfDots: number[] = [];

  for (let value in highestCategories) {
    let x = highestCategories[value][1];
    let scaledValue = scale(x, min, max, 1, 3);
    let rounded = Math.round(scaledValue);
    nrOfDots.push(rounded);
  }


  const createDots = (nr: number) => {
    let res = [];
    for (let i = 0; i < nr; i++) {
      res.push(<Dot />)
    }
    return res;
  }

  return (
    <div className={cssClasses.Wrapper}>
      <div
        className={`${cssClasses.ParentContainer} ${cssClasses.ResultItemContainer}`}
      >
        <div className={`${cssClasses.Column} ${cssClasses.W20}`}>
          <div className={cssClasses.CategoryColumn}>
            {
              [0, 1, 2].map((v, i) => (
                <div className={`${cssClasses.Row} ${cssClasses.Padded}`}>
                  <div className={`${cssClasses.Row} ${cssClasses.W50}`}>
                    <ActivityIcon
                      size={'small'}
                      activity={highestCategories[v][0]}
                      weight={3}
                    />
                  </div>

                  <div className={`${cssClasses.Row} ${cssClasses.W50} ${cssClasses.LeftAlign}`}>
                    {
                      createDots(nrOfDots[v])
                    }
                  </div>
                </div>
              ))
            }



          </div>
        </div>
        <div className={`${cssClasses.Column} ${cssClasses.W30}`}>
          <div className={`${cssClasses.Row} ${cssClasses.fixedHeight}`}>
            <div className={cssClasses.ActivityColumn}></div>
          </div>
          <div className={`${cssClasses.Row} ${cssClasses.Padded}`}>
            {start}
          </div>
          <div className={`${cssClasses.Row}`}>
            <FontAwesomeIcon className={'fa-2x'} icon={faLongArrowAltRight} />
          </div>
          <div className={`${cssClasses.Row} ${cssClasses.fixedHeight}`}>
            {start}
          </div>
        </div>
        <div className={`${cssClasses.Column} ${cssClasses.W30}`}>
          <div className={`${cssClasses.Row} ${cssClasses.fixedHeight}`}></div>
          <div className={`${cssClasses.Row} ${cssClasses.Padded}`}>{end}</div>
          <div className={`${cssClasses.Row}`}>
            <FontAwesomeIcon className={'fa-2x'} icon={faLongArrowAltLeft} />
          </div>
          <div className={`${cssClasses.Row} ${cssClasses.fixedHeight}`}></div>
        </div>
        <div className={`${cssClasses.LastColumn} ${cssClasses.W20}`}>
          <div className={`${cssClasses.Row}`}>
            <div className={cssClasses.DiscountWrapper}>
              <div className={cssClasses.Discount}>
                <div className={cssClasses.DiscountValue}>
                  {_round(discount, 0) + '%'}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${cssClasses.Row} ${cssClasses.Price} ${cssClasses.fixedHeight}`}
          >
            <div style={{ marginRight: '2px' }}>{(price / 100).toFixed(2)}</div>
            <div>.-</div>
          </div>
        </div>
      </div>
    </div>
  )
}
