import { useState, FormEvent } from "react";
import { Modal, FormField, Input, Button } from "../ui";
import "./BoardModal.css";

interface BoardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export function BoardModal({ isOpen, onClose, onSubmit }: BoardModalProps) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Quadro">
      <form onSubmit={handleSubmit}>
        <FormField label="Nome do Quadro" htmlFor="board-name" required>
          <Input
            id="board-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do quadro"
            required
            autoFocus
          />
        </FormField>
        <div className="board-modal-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
