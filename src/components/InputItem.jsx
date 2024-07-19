import "../styles/InputItem.css"

export function InputItem({ name, type = 'text' }) {
    return (
        <>
            <label>
                <div>{name + ': '}</div>
                <input type={type} />
            </label>
        </>
    );
}

