"use client"
import Search from "antd/es/input/Search";
import { FC } from "react";

interface SearchFieldProps {
    onSearch: (value: string) => void
}

const SearchField: FC<SearchFieldProps> = ({onSearch}) => {
    return (
        <Search placeholder="Search..." size={"large"} onSearch={onSearch}/>
    )
}

export default SearchField;