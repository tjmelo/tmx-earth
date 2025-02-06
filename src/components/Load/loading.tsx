import React from "react"
import { ILoading } from "../../interfaces"

export const Loading:React.FC<ILoading> = ({type, children}: ILoading) => {
    return(
        <div className={`alert alert-${type} my-2`}>{children}</div>
    )
}
