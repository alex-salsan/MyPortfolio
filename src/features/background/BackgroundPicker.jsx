const BackgroundPicker = ({ options, selectedId, onSelect }) => {
  return (
    <div className="backgroundPicker" role="group" aria-label="Fondo animado">
      <span className="backgroundPickerLabel" aria-hidden="true">Fondo</span>
      {options.map(({ id, label, description }) => (
        <button
          key={id}
          type="button"
          title={description}
          aria-pressed={id === selectedId}
          onClick={() => onSelect(id)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export default BackgroundPicker
