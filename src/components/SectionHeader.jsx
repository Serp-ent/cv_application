import '../styles/SectionHeader.css'

export function SectionHeader({ title }) {
    return (
        <div className="sectionHeader">
            <h3>{title}</h3>
            <button>save</button>
        </div>
    );
}