import { useDraggable } from "@dnd-kit/core";
import type { Card as CardType } from "../../types";
import "./Card.css";

interface CardProps {
  card: CardType;
  onDelete: (id: number) => void;
  onEdit: (card: CardType) => void;
}

export function Card({ card, onDelete, onEdit }: CardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
      data: {
        type: "card",
        card,
      },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`card ${isDragging ? "card-dragging" : ""}`}
    >
      <div className="card-content" {...listeners}>
        <div className="card-header">
          <h3 className="card-title">{card.title}</h3>
          <div className="card-actions">
            <button
              className="card-edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(card);
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              aria-label="Editar cartão"
              title="Editar cartão"
            >
              ✎
            </button>
            <button
              className="card-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card.id);
              }}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              aria-label="Excluir cartão"
              title="Excluir cartão"
            >
              ×
            </button>
          </div>
        </div>
        {card.description && (
          <p className="card-description">{card.description}</p>
        )}
      </div>
    </div>
  );
}
