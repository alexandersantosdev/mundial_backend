import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsString, IsNotEmpty, IsIn, Matches, ValidateNested, IsNumber, IsDate, MinDate } from "class-validator";

export class Item {
    @IsNotEmpty({ message: 'O nome do item do orçamento deve ser enviado' })
    @IsString({ message: 'O nome do item do orçamento deve ser um texto válido' })
    name: string;
    @IsNotEmpty({ message: 'O valor do item do orçamento deve ser enviado' })
    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }, { message: 'O tipo do valor do item não é um número decimal válido' })
    price: number;
    @IsNotEmpty({ message: 'A quantidade do item do orçamento deve ser enviado' })
    @IsInt({ message: 'A quantidade do item deve ser um inteiro válido maior que zero' })
    quantity: number;
}

export class CreateBudgetDto {

    userId?: string;
    number: number;
    @IsString({ message: 'O nome do cliente do orçamento deve ser enviado e deve ser um texto válido' })
    client: string;
    @IsString({ message: 'O telefone do cliente do orçamento deve ser enviado e deve ser um texto válido' })
    @Matches('(?:(^\\+\\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\\d{4,5}).?(\\d{4})', undefined, { message: 'O telefone do cliente do orçamento deve ser válido', each: true })
    phone: string;
    @IsInt({ message: 'O valor total do orçamento deve ser enviado' })
    amount: number;
    @IsString({ message: 'O status do orçamento deve ser enviado e deve ser um texto válido' })
    @IsIn(["OPEN", "CLOSED", "CANCELED", "EXPIRED"], { message: 'O status do orçamento deve ser um dos seguintes: OPEN, CLOSED, CANCELED, EXPIRED' })
    status: string;
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'A data de criação do orçamento deve ser uma data válida' })
    @MinDate(new Date(new Date().setDate(new Date().getDate() - 1)), { message: 'A data de criação do orçamento deve ser maior ou igual ao dia de hoje' })
    date: Date;
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: 'A data de validade do orçamento deve ser uma data válida' })
    @MinDate(new Date(new Date().setDate(new Date().getDate() + 4)), { message: 'A data de validade do orçamento deve ser no mínimo 5 dias após o dia de hoje' })
    validateUntil: Date;

    @IsArray({ message: 'Os itens do orçamento devem ser enviados' })
    @ArrayNotEmpty({ message: 'Os itens do orçamento devem ser enviados' })
    @ValidateNested({ each: true })
    @Type(() => Item)
    items: Item[];
    note: string;
}
