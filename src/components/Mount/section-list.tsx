
interface CSectionList{
    data: any,
    subdata?: any,
    children: string
}

export const SectionList:React.FC<CSectionList> = ({data, children, subdata}) => {
    return(
        <div className={`col-xs-12 my-3 border-bottom`}>
            <span className="text-secondary">
            { children }
            </span>
            <br />
            <strong className="text-primary">
            { data }
            { subdata 
            ?  <sup> { subdata } </sup>
            : '' }
            </strong>
            <br />
        </div>

    )
}