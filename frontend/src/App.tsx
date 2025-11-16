import { useState, useEffect } from "react";
import type { Card } from "./types";
import { useBoards } from "./hooks/useBoards";
import { useCards } from "./hooks/useCards";
import { BoardList } from "./components/BoardList";
import { BoardView } from "./components/BoardView";
import { CardModal } from "./components/CardModal";
import { BoardModal } from "./components/BoardModal";
import { ColumnModal } from "./components/ColumnModal";
import { Loading, ErrorMessage } from "./components/ui";
import "./App.css";

function App() {
  const [selectedBoardId, setSelectedBoardId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<number | null>(null);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const {
    boards,
    selectedBoard,
    loading,
    error,
    loadBoards,
    loadBoard,
    createBoard,
    createColumn,
    setError,
  } = useBoards();

  const { createCard, updateCard, deleteCard, moveCard } = useCards({
    onSuccess: () => {
      if (selectedBoardId) {
        loadBoard(selectedBoardId);
      }
    },
    onError: (errorMessage) => {
      setError(errorMessage);
    },
  });

  useEffect(() => {
    loadBoards();
  }, [loadBoards]);

  useEffect(() => {
    if (selectedBoardId) {
      loadBoard(selectedBoardId);
    }
  }, [selectedBoardId, loadBoard]);

  const handleSelectBoard = (id: number) => {
    setSelectedBoardId(id);
  };

  const handleAddCard = (columnId: number) => {
    setSelectedColumnId(columnId);
    setIsModalOpen(true);
  };

  const handleCreateCard = async (title: string, description: string) => {
    if (!selectedColumnId) return;

    try {
      await createCard(selectedColumnId, { title, description });
      setIsModalOpen(false);
      setSelectedColumnId(null);
    } catch (err) {
      // Error handled by useCards hook
    }
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setIsModalOpen(true);
  };

  const handleUpdateCard = async (title: string, description: string) => {
    if (!editingCard) return;

    try {
      await updateCard(editingCard.id, { title, description });
      setIsModalOpen(false);
      setEditingCard(null);
    } catch (err) {
      // Error handled by useCards hook
    }
  };

  const handleDeleteCard = async (id: number) => {
    try {
      await deleteCard(id);
    } catch (err) {
      // Error handled by useCards hook
    }
  };

  const handleMoveCard = async (cardId: number, newColumnId: number) => {
    try {
      await moveCard(cardId, { newColumnId });
    } catch (err) {
      // Error handled by useCards hook
    }
  };

  const handleCreateBoard = async (name: string) => {
    try {
      const newBoard = await createBoard({ name });
      setSelectedBoardId(newBoard.id);
      setIsBoardModalOpen(false);
    } catch (err) {
      // Error handled by useBoards hook
    }
  };

  const handleCreateColumn = async (name: string) => {
    if (!selectedBoardId) return;

    try {
      await createColumn(selectedBoardId, { name });
      setIsColumnModalOpen(false);
    } catch (err) {
      // Error handled by useBoards hook
    }
  };

  const handleCloseCardModal = () => {
    setIsModalOpen(false);
    setSelectedColumnId(null);
    setEditingCard(null);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="app">
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}
      <BoardList
        boards={boards}
        selectedBoardId={selectedBoardId}
        onSelectBoard={handleSelectBoard}
        onCreateBoard={() => setIsBoardModalOpen(true)}
      />
      <BoardView
        board={selectedBoard}
        onMoveCard={handleMoveCard}
        onDeleteCard={handleDeleteCard}
        onAddCard={handleAddCard}
        onCreateColumn={() => setIsColumnModalOpen(true)}
        onEditCard={handleEditCard}
      />
      <CardModal
        isOpen={isModalOpen}
        onClose={handleCloseCardModal}
        onSubmit={editingCard ? handleUpdateCard : handleCreateCard}
        card={editingCard}
        mode={editingCard ? "edit" : "create"}
      />
      <BoardModal
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        onSubmit={handleCreateBoard}
      />
      <ColumnModal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        onSubmit={handleCreateColumn}
      />
    </div>
  );
}

export default App;
