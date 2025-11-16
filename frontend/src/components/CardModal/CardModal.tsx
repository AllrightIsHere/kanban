import { useState, FormEvent, useEffect } from "react";
import type { Card } from "../../types";
import { Modal, FormField, Input, Textarea, Button } from "../ui";
import "./CardModal.css";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  card?: Card | null;
  mode?: "create" | "edit";
}

export function CardModal({
  isOpen,
  onClose,
  onSubmit,
  card,
  mode = "create",
}: CardModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && card) {
        setTitle(card.title || "");
        setDescription(card.description || "");
      } else {
        setTitle("");
        setDescription("");
      }
    }
  }, [isOpen, card, mode]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), description.trim());
      if (mode === "create") {
        setTitle("");
        setDescription("");
      }
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "Editar Cartão" : "Novo Cartão"}
    >
      <form onSubmit={handleSubmit}>
        <FormField label="Título" htmlFor="title" required>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Digite o título do cartão"
            required
            autoFocus
          />
        </FormField>
        <FormField label="Descrição" htmlFor="description">
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição do cartão (opcional)"
            rows={4}
          />
        </FormField>
        <div className="card-modal-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {mode === "edit" ? "Salvar" : "Criar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
