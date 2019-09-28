import React from 'react'

interface Props {
  icon: string
}

export const SbbIcon: React.FC<Props> = ({ icon }) => {
  if (icon === 'train') {
    return (
      <svg id="SBB_oev_tram_r" viewBox="0 0 20 20" width="100%" height="100%">
        <path d="M8.7 3.5c-.1-.1-.1-.1-.1-.2 0-.2.1-.3.3-.3.1 0 .1 0 .2.1l3.2 3.2h2.6c.5 0 .9.3 1 .7l1.6 5.2v2.4c0 .2-.1.3-.3.3H2.5v-3.7h3c.2 0 .3-.1.3-.3V7.2c0-.2-.1-.3-.3-.3h-3v-.6h9L8.7 3.5zm5.7 8.7c0 .2.1.3.3.3h1.9c.2 0 .3-.1.3-.3v-.1l-1.5-4.9c-.1-.2-.2-.3-.5-.3s-.5.2-.5.5v4.8zm-1.5-.1c0 .3.2.5.5.5s.5-.2.5-.5V7.3c0-.3-.2-.5-.5-.5s-.5.2-.5.5v4.8zm-2.1-4.9c0-.2-.1-.3-.3-.3H6.7c-.2 0-.3.1-.3.3V11c0 .2.1.3.3.3h3.8c.2 0 .3-.1.3-.3V7.2zm.5.1v4.8c0 .3.2.5.5.5s.5-.2.5-.5V7.3c0-.3-.2-.5-.5-.5s-.5.2-.5.5z"></path>
        <path
          d="M10.3 15.6h3.1c-.3.6-.9 1.1-1.6 1.1-.6-.1-1.3-.5-1.5-1.1zm-3.8 0h3.1c-.3.6-.9 1.1-1.6 1.1-.6-.1-1.2-.5-1.5-1.1zm11 1.3h-15v.6h15zm0-14.4h-15v.3h15z"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    )
  } else {
    return <div>icon</div>
  }
}
