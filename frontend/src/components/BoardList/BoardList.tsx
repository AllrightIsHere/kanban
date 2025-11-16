import type { Board } from "../../types";
import { Button } from "../ui";
import "./BoardList.css";

interface BoardListProps {
  boards: Board[];
  selectedBoardId: number | null;
  onSelectBoard: (id: number) => void;
  onCreateBoard: () => void;
}

export function BoardList({
  boards,
  selectedBoardId,
  onSelectBoard,
  onCreateBoard,
}: BoardListProps) {
  return (
    <div className="board-list">
      <div className="board-list-header">
        <h1 className="board-list-title">Quadros Kanban</h1>
        <Button onClick={onCreateBoard} variant="primary">
          + Novo Quadro
        </Button>
      </div>
      {boards.length === 0 ? (
        <p className="board-list-empty">Nenhum quadro encontrado</p>
      ) : (
        <div className="board-list-items">
          {boards.map((board) => (
            <button
              key={board.id}
              className={`board-list-item ${
                selectedBoardId === board.id ? "active" : ""
              }`}
              onClick={() => onSelectBoard(board.id)}
            >
              {board.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
