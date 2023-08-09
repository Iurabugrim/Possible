"use client"


import {ICategory} from "@/types/Category.inteface";
import {FC} from "react";
import {Select} from "antd";

interface SelectCategoryProps {
    options : {value: string, label:string}[] | []
    onChange: (value: string) => void
    onSearch: (value: string) => void
}
const SelectCategory: FC<SelectCategoryProps> = ({options, onSearch, onChange}) => {
    return (
        <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            size={"large"}
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={options}
        />
    )
}

export default SelectCategory;