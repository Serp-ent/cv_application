import "../styles/InputItem.css"

export function InputItem({
    label,
    name,
    type = 'text',
    onInput,
    value,
}) {
    return (
        <>
            <label className="formGroup">
                <div>{label + ': '}</div>
                <input name={name} type={type} onChange={onInput} value={value} />
            </label>
        </>
    );
}

