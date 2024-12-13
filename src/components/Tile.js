export const Tile = ({flag, className, value, onClick, playertTurn}) => {
    let hoverClass = null;
    if((value == null && playertTurn != null) && flag){
        console.log(flag)
        hoverClass = `${playertTurn}-hover`;
    }
    return (
        <div className={`tile ${className} ${hoverClass}`} onClick={onClick}>{value}</div>
    )
}