import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import type { Board } from "../../types";
import { Column } from "../Column";
import { Button } from "../ui";
import "./BoardView.css";

interface BoardViewProps {
  board: Board | null;
  onMoveCard: (cardId: number, newColumnId: number) => void;
  onDeleteCard: (id: number) => void;
  onAddCard: (columnId: number) => void;
  onCreateColumn: () => void;
  onEditCard: (card: import("../../types").Card) => void;
}

export function BoardView({
  board,
  onMoveCard,
  onDeleteCard,
  onAddCard,
  onCreateColumn,
  onEditCard,
}: BoardViewProps) {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCardId(Number(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCardId(null);
    const { active, over } = event;

    if (!over) {
      return;
    }

    const cardId = Number(active.id);

    // Verifica se o over.data contém informações da coluna
    const overData = over.data.current;
    let newColumnId: number;

    if (overData?.type === "column") {
      // Soltou diretamente na coluna
      newColumnId = overData.column.id;
    } else if (overData?.type === "card") {
      // Soltou em outro card - pega a coluna do card
      newColumnId = overData.card.columnId;
    } else {
      // Fallback: tenta encontrar a coluna pelo ID
      const column = board?.columns?.find((col) => col.id === Number(over.id));
      if (column) {
        newColumnId = column.id;
      } else {
        return; // Não encontrou uma coluna válida
      }
    }

    // Não mover se já estiver na mesma coluna
    const sourceCard = board?.columns
      ?.flatMap((col) => col.cards || [])
      .find((card) => card.id === cardId);

    if (sourceCard && sourceCard.columnId === newColumnId) {
      return;
    }

    onMoveCard(cardId, newColumnId);
  };

  if (!board) {
    return (
      <div className="board-view-empty">
        <p>Selecione um quadro para visualizar</p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="board-view">
        <div className="board-view-header">
          <h1 className="board-view-title">{board.name}</h1>
          <Button onClick={onCreateColumn} variant="primary">
            + Nova Coluna
          </Button>
        </div>
        <div className="board-view-columns">
          {board.columns?.map((column) => (
            <Column
              key={column.id}
              column={column}
              onDeleteCard={onDeleteCard}
              onAddCard={onAddCard}
              onEditCard={onEditCard}
            />
          ))}
        </div>
      </div>
      <DragOverlay>
        {activeCardId
          ? (() => {
              const activeCard = board?.columns
                ?.flatMap((col) => col.cards || [])
                .find((card) => card.id === activeCardId);

              return activeCard ? (
                <div className="card-drag-overlay">
                  <div className="card-header">
                    <h3 className="card-title">{activeCard.title}</h3>
                  </div>
                  {activeCard.description && (
                    <p className="card-description">{activeCard.description}</p>
                  )}
                </div>
              ) : null;
            })()
          : null}
      </DragOverlay>
    </DndContext>
  );
}
