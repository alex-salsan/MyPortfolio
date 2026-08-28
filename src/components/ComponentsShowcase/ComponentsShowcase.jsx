import { useState } from 'react'
import ButtonPlayground from './Playground/ButtonPlayground/ButtonPlayground'
import FormPlayground from './Playground/FormPlayground/FormPlayground'
import './ComponentsShowcase.css'

const tabs = ['Button', 'Form']

const ComponentsShowcase = () => {
  const [activeTab, setActiveTab] = useState('Button')

  return (
    <div className="showcaseWrapper">
      <div className="showcaseTabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tabBtn ${activeTab === tab ? 'tabActive' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="showcaseContent">
        {activeTab === 'Button' && <ButtonPlayground />}
        {activeTab === 'Form' && <FormPlayground />}
      </div>
    </div>
  )
}

export default ComponentsShowcase