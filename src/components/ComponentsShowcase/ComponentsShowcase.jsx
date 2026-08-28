// ComponentsShowcase.jsx
import { useState } from 'react'
import Button from '../Button/Button'
import Form from '../Form/Form'
import Toggle from '../Toggle/Toggle'
import './ComponentsShowcase.css'

const tabs = ['Button', 'Form', 'Toggle']

const codeSnippets = {
  Button: `<Button variant="primary">Click me</Button>`,
  Form: `<Input label="Email" type="email" error="..." />`,
  Toggle: `<Toggle />`
}

const ComponentsShowcase = () => {
  const [activeTab, setActiveTab] = useState('Button')
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="showcaseWrapper">
      <div className="showcaseTabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tabBtn ${activeTab === tab ? 'tabActive' : ''}`}
            onClick={() => { setActiveTab(tab); setShowCode(false) }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* <div className="showcaseContent">
        {activeTab === 'Button' && (
          <div className="variantsRow">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="disabled" disabled>Disabled</Button>
            <Button variant="primary" icon="✓">Con icono</Button>
          </div>
        )}
        {activeTab === 'Form' && <Form />}
        {activeTab === 'Toggle' && <Toggle />}
      </div>

      <button className="toggleCodeBtn" onClick={() => setShowCode(!showCode)}>
        {showCode ? 'Ocultar código ▴' : 'Ver código ▾'}
      </button>

      {showCode && (
        <pre className="codeBlock">
          <code>{codeSnippets[activeTab]}</code>
        </pre>
      )} */}
    </div>
  )
}

export default ComponentsShowcase