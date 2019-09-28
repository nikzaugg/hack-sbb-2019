import React from 'react'
import cssClasses from './ResultItem.module.css'
import _round from 'lodash/round'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLongArrowAltRight,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons'
import posed from 'react-pose'

import { SearchResult } from '../../../models/SearchResult'
import { ActivityIcon } from './ActivityIcon'

interface Props {
  data: SearchResult
  onChoose: Function
}

const Box = posed.div({
  hoverable: true,
  draggable: 'x',
  dragBounds: { left: '-15%', right: '0' },
  init: { scale: 1 },
  dragEnd: {
    x: 0,
    y: 0,
    transition: { type: 'physics' },
  },
})

export const ResultItem: React.FC<Props> = ({ data, onChoose }) => {
  const { bestOut, bestReturn, price, start, end, discount, categories } = data

  let highestCategories = Object.entries(categories).sort((a, b) => b[1] - a[1])

  return (
    <Box onDragEnd={() => onChoose(bestOut.id, bestReturn.id)}>
      <div className={cssClasses.Wrapper}>
        <div
          className={`${cssClasses.ParentContainer} ${cssClasses.ResultItemContainer}`}
        >
          <div className={`${cssClasses.Column} ${cssClasses.W20}`}>
            <div className={cssClasses.CategoryColumn}>
              <div className={`${cssClasses.Row} ${cssClasses.Padded}`}>
                <ActivityIcon
                  size={'big'}
                  activity={highestCategories[0][0]}
                  weight={1}
                />
              </div>
              <div className={`${cssClasses.Row} ${cssClasses.Padded}`}>
                <ActivityIcon
                  size={'small'}
                  activity={highestCategories[1][0]}
                  weight={3}
                />
                <ActivityIcon
                  size={'small'}
                  activity={highestCategories[2][0]}
                  weight={2}
                />
              </div>
            </div>
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
              <div style={{ marginRight: '2px' }}>
                {(price / 100).toFixed(2)}
              </div>
              <div>.-</div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  )
}
