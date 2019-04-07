import React, { useState, useEffect } from 'react'
import { Tile, Loader } from 'react-bulma-components/full'

const Img = ({ src, ...props }) => {
  return (
    <Tile
      className="box"
      kind="parent"
      style={{
        backgroundImage: 'url(' + src + ')',
        height: 200,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}
    />
  )
}
// const ImageCard = React.memo(({ image }) => {
//   const url = 'http://localhost:3000' + image.url
//   const [show, setShow] = useState(false)
//   const handleClose = e => {
//     if (e) {
//       e.stopPropagation()
//     }
//     setShow(false)
//   }
// })

// export default ImageCard
//   <Tile onClick={() => setShow(true)} kind="parent" size={3}>
//     <React.Suspense
//       fallback={
//         <Tile
//           className="box"
//           kind="parent"
//           style={{
//             height: 400,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}
//         >
//           <Loader style={{ height: 200, width: 200 }} />
//         </Tile>
//       }
//     >
//       <Img src={url} />
//     </React.Suspense>
//     <ImageView image={image} onClose={handleClose} show={show} />
//   </Tile>
// )

const Thumb = ({ thumb }) => {
  return (
    <Tile kind="parent" size={2}>
      <Img src={thumb.thumbUrl} />
    </Tile>
  )
}

export default Thumb
