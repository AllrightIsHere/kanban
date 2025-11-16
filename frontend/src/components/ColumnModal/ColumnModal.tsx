import { useState, FormEvent } from "react";
import { Modal, FormField, Input, Button } from "../ui";
import "./ColumnModal.css";

interface ColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export function ColumnModal({ isOpen, onClose, onSubmit }: ColumnModalProps) {
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
    <Modal isOpen={isOpen} onClose={onClose} title="Nova Coluna">
      <form onSubmit={handleSubmit}>
        <FormField label="Nome da Coluna" htmlFor="column-name" required>
          <Input
            id="column-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome da coluna"
            required
            autoFocus
          />
        </FormField>
        <div className="column-modal-actions">
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
