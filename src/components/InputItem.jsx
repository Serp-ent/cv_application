import "../styles/InputItem.css"

export function InputItem({
    name,
    type = 'text',
    onInput,
    value,
}) {
    return (
        <>
            <label>
                <div>{name + ': '}</div>
                <input type={type} onChange={onInput} value={value} />
            </label>
        </>
    );
}

