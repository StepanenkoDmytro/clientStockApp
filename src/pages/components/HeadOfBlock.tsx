import './header.css'

const HeadOfBlock: React.FC<{ name: string }> = ({ name }) => {
    return (
        <div className='head-of-block'>
            <p className='left-element'>{name}</p>
            <img className='right-element' src="/icons/question-icon.svg" alt="Icon" />
        </div>
    )
}

export default HeadOfBlock;