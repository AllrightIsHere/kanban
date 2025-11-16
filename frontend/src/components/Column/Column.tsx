import { useDroppable } from "@dnd-kit/core";
import type { Column as ColumnType } from "../../types";
import { Card } from "../Card";
import "./Column.css";

interface ColumnProps {
  column: ColumnType;
  onDeleteCard: (id: number) => void;
  onAddCard: (columnId: number) => void;
  onEditCard: (card: import("../../types").Card) => void;
}

export function Column({
  column,
  onDeleteCard,
  onAddCard,
  onEditCard,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`column ${isOver ? "column-drag-over" : ""}`}
    >
      <div className="column-header">
        <h2 className="column-title">{column.name}</h2>
        <span className="column-count">{column.cards?.length || 0}</span>
      </div>
      <div className="column-cards">
        {column.cards?.length === 0 && (
          <div className="column-empty-placeholder">Solte cartões aqui</div>
        )}
        {column.cards?.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={onDeleteCard}
            onEdit={onEditCard}
          />
        ))}
      </div>
      <button className="column-add-btn" onClick={() => onAddCard(column.id)}>
        + Adicionar cartão
      </button>
    </div>
  );
}
