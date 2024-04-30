import { ILoading } from "../../interfaces"

export const Loading:React.FC<ILoading> = ({type, children}: ILoading) => {
    return(
        <div className={`alert alert-${type}`}>{children}</div>
    )
}
