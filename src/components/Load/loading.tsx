interface CLoading {
    type: string
}

export const Loading:React.FC<CLoading> = ({type, children}) => {
    return(
        <div className={`alert alert-${type}`}>{children}</div>
    )
}