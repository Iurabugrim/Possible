import {Pagination} from "antd";
import {FC} from "react";

interface PaginationFieldProps {
    total: number
    currentPage: number
    onChange: (value: number) => void
    pageSize: number
}

const PaginationField: FC<PaginationFieldProps> = ({total, onChange, currentPage, pageSize}) => {
    return (
        <Pagination defaultCurrent={1} current={currentPage} total={total} onChange={onChange} pageSize={pageSize}/>
    )
}

export default PaginationField;