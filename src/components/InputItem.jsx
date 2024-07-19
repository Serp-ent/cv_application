export function InputItem({ name, type = 'text' }) {
    return (
        <>
            <label>{name + ': '}
                <input type={type} />
            </label>
        </>
    );
}

