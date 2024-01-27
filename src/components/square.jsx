export const Square = ({children, isselect, updateBoard, index}) => {
    const className = `square ${isselect ? 'is-selected' : ''}`
    const handleClick = () => {updateBoard(index)}
    return(
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }