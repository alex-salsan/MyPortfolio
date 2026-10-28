import { Suspense, useState } from 'react'
import BackgroundPicker from './BackgroundPicker'
import { BACKGROUNDS, readStoredBackgroundId, storeBackgroundId } from './backgrounds'
import './Background.css'

const Background = () => {
  const [selectedId, setSelectedId] = useState(readStoredBackgroundId)
  const { Component: SelectedBackground } = BACKGROUNDS.find(({ id }) => id === selectedId)

  const handleSelect = (id) => {
    setSelectedId(id)
    storeBackgroundId(id)
  }

  return (
    <>
      <Suspense fallback={null}>
        <SelectedBackground key={selectedId} />
      </Suspense>
      <BackgroundPicker options={BACKGROUNDS} selectedId={selectedId} onSelect={handleSelect} />
    </>
  )
}

export default Background
