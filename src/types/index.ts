import type React from "react"

export interface CardInterface {
  _id: string;
  term: string;
  definition?: string;
}

export interface UserInterface {
    _id: string,
    username: string,
    imageUrl: string,
}

export interface DeckInterface {
  _id: string
  title: string,
  authorID: string,
  color?: string,
  public: boolean
  cards: CardInterface[]
}

export interface AppDialogProps {
  handleSubmit: (...args: any[]) => void,
  onOpenChange: (open: boolean) => void;
  open: boolean;
  dialogTitle: string,
  inputFields?: { label: string, value: string, mutator: React.Dispatch<React.SetStateAction<any>> }[],
  children?: React.ReactNode,
  description?:string
}

export interface AppCustomAlert {
  type?: string,
  title: string,
  desc: string,
  open?: boolean;
  handleSubmit?: any;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode,
}

export interface AppCreateCardDialogProps {
  children?: React.ReactNode
  handleSubmit: (...args: any[]) => void
  editCardData?: Partial<CardInterface>
}