import React from 'react'

import cssClasses from './TripSegment.module.css'
import { SbbIcon } from '../Results/ResultItem/SbbIcon'

interface Props {
  icon: string
  text: string
  activeStep: number
  origin: any
  destination: any
}

export const TripSegment: React.FC<Props> = ({
  origin,
  destination,
  icon,
  text,
  activeStep,
}) => {
  return (
    <div className={cssClasses.Wrapper}>
      <div className={cssClasses.Parent}>

        {/* ------------------------------------------- */}
        <div className={`${cssClasses.Column} ${cssClasses.W10}`}>
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.FixedHeight}`}
          >
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

          </div>
        </div>
        {/* ------------------------------------------- */}


        {/* ------------------------------------------- */}
        <div className={`${cssClasses.Column} ${cssClasses.W40}`}>
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.FixedHeight}`}
          >
            <div className={cssClasses.Row}></div>
            <div className={cssClasses.Row}></div>
            <div className={cssClasses.Row}></div>
          </div>
          <div
            style={{ flexDirection: 'column' }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.Centered} ${cssClasses.Grow}`}
          >
            <div className={cssClasses.Row}><div className={cssClasses.Row}>
              <p className={cssClasses.text}>
                {origin.name}
              </p>
            </div>
              <div className={cssClasses.Row}>
                <p className={cssClasses.text}>
                  {origin.track && `Track ${origin.track}`}
                </p>
              </div>
              <div className={cssClasses.Row}>
                <p className={cssClasses.text}>
                  {origin.time}
                </p>
              </div></div>
          </div>
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.FixedHeight}`}
          >
            <div className={cssClasses.Row}></div>
            <div className={cssClasses.Row}></div>
            <div className={cssClasses.Row}></div>
          </div>
        </div>
        {/* ------------------------------------------- */}



        {/* ------------------------------------------- */}
        <div className={`${cssClasses.Column} ${cssClasses.W10}`}>
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
        {/* ------------------------------------------- */}


        {/* ------------------------------------------- */}
        <div className={`${cssClasses.Column} ${cssClasses.W40}`}>
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.FixedHeight}`}
          >
            <div className={cssClasses.Row}></div>
            <div className={cssClasses.Row}></div>
            <div className={cssClasses.Row}></div>
          </div>
          <div
            style={{ flexDirection: 'column' }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.Centered} ${cssClasses.Grow}`}
          >
            <div className={cssClasses.Row}><div className={cssClasses.Row}>
              <p className={cssClasses.text}>
                {destination.name}
              </p>
            </div>
              <div className={cssClasses.Row}>
                <p className={cssClasses.text}>
                  {destination.track && `Track ${destination.track}`}
                </p>
              </div>
              <div className={cssClasses.Row}>
                <p className={cssClasses.text}>
                  {destination.time}
                </p>
              </div></div>
          </div>
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            className={`${cssClasses.Row} ${cssClasses.H} ${cssClasses.FixedHeight}`}
          >
            <div className={cssClasses.Row}></div>
            <div className={cssClasses.Row}></div>
            <div className={cssClasses.Row}></div>
          </div>
        </div>
        {/* ------------------------------------------- */}
      </div>
    </div>
  )
}
