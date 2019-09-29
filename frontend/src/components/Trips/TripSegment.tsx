import React from 'react'

import cssClasses from './TripSegment.module.css'
import { SbbIcon } from '../Results/ResultItem/SbbIcon'

interface Props {
  icon: string
  text: string
  activeStep: number
}

export const TripSegment: React.FC<Props> = ({ icon, text, activeStep }) => {
  return (
    <div className={cssClasses.Wrapper}>
      <div className={cssClasses.Parent}>
        <div className={`${cssClasses.Column} ${cssClasses.W25}`}>
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.FixedHeight}`}
          >
            <div className={cssClasses.Row}>
              {' '}
              <p style={{ fontSize: '0.8em', fontWeight: 800 }}>Bern</p>
            </div>
            <div className={cssClasses.Row}>
              {' '}
              <p style={{ fontSize: '0.8em', fontWeight: 800 }}>Track 31</p>
            </div>
            <div className={cssClasses.Row}>
              {' '}
              <p style={{ fontSize: '0.8em', fontWeight: 800 }}>12:10</p>
            </div>
          </div>
          <div
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.Centered} ${cssClasses.Grow}`}
          >
            <SbbIcon icon={icon} />
          </div>
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.FixedHeight}`}
          >
            <div className={cssClasses.Row}>
              {' '}
              <p style={{ fontSize: '0.8em', fontWeight: 800 }}>Bern</p>
            </div>
            <div className={cssClasses.Row}>
              {' '}
              <p style={{ fontSize: '0.8em', fontWeight: 800 }}>Track 31</p>
            </div>
            <div className={cssClasses.Row}>
              {' '}
              <p style={{ fontSize: '0.8em', fontWeight: 800 }}>12:10</p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------- */}
        <div className={`${cssClasses.Column} ${cssClasses.W25}`}>
          <div
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.Grow}`}
          >
            <div
              className={`${cssClasses.Column} ${cssClasses.W50} ${cssClasses.BorderRight}`}
            ></div>
            <div
              className={`${cssClasses.Column} ${cssClasses.W50} ${cssClasses.BorderLeft}`}
            ></div>
          </div>
          <div
            style={{ height: '10px' }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.Centered}`}
          >
            <div className={`${cssClasses.BlackDot}`}></div>
          </div>
          <div
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.Grow}`}
          >
            <div
              className={`${cssClasses.Column} ${cssClasses.W50} ${cssClasses.BorderRight}`}
            ></div>
            <div
              className={`${cssClasses.Column} ${cssClasses.W50} ${cssClasses.BorderLeft}`}
            ></div>
          </div>
        </div>
        <div className={`${cssClasses.Column} ${cssClasses.W60}`}>
          <div
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.Grow}`}
          >
            <div style={{ padding: '5px' }}>{text}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
