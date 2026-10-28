import { useState } from 'react'
import ButtonPlayground from './playgrounds/ButtonPlayground'
import FormPlayground from './playgrounds/FormPlayground'
import './ComponentsShowcase.css'

const TABS = [
  { id: 'button', label: 'Button', Playground: ButtonPlayground },
  { id: 'form', label: 'Form', Playground: FormPlayground },
]

const ComponentsShowcase = () => {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id)
  const { Playground } = TABS.find(({ id }) => id === activeTabId)

  return (
    <div className="showcaseWrapper">
      <div className="showcaseTabs" role="tablist" aria-label="Componentes">
        {TABS.map(({ id, label }) => {
          const isActive = id === activeTabId

          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={isActive}
              aria-controls={`panel-${id}`}
              className={`tabBtn ${isActive ? 'tabActive' : ''}`}
              onClick={() => setActiveTabId(id)}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div
        className="showcaseContent"
        role="tabpanel"
        id={`panel-${activeTabId}`}
        aria-labelledby={`tab-${activeTabId}`}
      >
        <Playground />
      </div>
    </div>
  )
}

export default ComponentsShowcase
