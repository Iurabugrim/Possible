import { IsString } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    label: string

    @IsString()
    value: string

    @IsString()
    color: string
}
