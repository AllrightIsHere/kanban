import { CreateColumnDTO } from "./dto";
import { Column } from "./entity";

export interface ColumnRepository {
    create: (columnDTO: CreateColumnDTO) => Promise<Column>;
}
