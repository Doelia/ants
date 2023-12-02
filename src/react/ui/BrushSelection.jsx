export default function BrushSelection({brushType, setBrushType}) {


    function select(brush) {
        if (brushType === brush) {
            setBrushType('null')
        } else {
            setBrushType(brush)
        }
    }

    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}} className="brushselection">
            <button className={brushType === 'clear' ? 'active' : ''} onClick={() => select('clear')}>
                <i className="fa-solid fa-eraser"></i>
                Clear
            </button>
            <button className={brushType === 'food' ? 'active' : ''} onClick={() => select('food')}>
                <img src="/fruits/fraise.png" alt="" />
                Food
            </button>
            <button className={brushType === 'wall' ? 'active' : ''} onClick={() => select('wall')}>
                <div className="square" style={{background: 'black'}}></div>
                Wall
            </button>
            <button className={brushType === 'odor_food' ? 'active' : ''} onClick={() => select('odor_food')}>
                <div className="square" style={{background: '#ff00ff', opacity: .5}}></div>
                Food odor
            </button>
            <button className={brushType === 'odor_home' ? 'active' : ''} onClick={() => select('odor_home')}>
                <div className="square" style={{background: '#00ffff', opacity: .5}}></div>
                Nest odor
            </button>
        </div>
    )
}
