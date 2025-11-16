import { CreateBoardDTO } from "./dto";
import { Board } from "./entity";

export interface BoardRepository {
    findAll: () => Promise<Board[]>;
    findById: (id: number) => Promise<Board>;
    create: (boardDTO: CreateBoardDTO) => Promise<Board>;
}
