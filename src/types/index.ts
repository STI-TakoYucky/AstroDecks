import type React from "react"

export interface DeckInterface {
  _id?: string
  title: string,
  author: string,
  authorID: string,
  imageUrl: string,
  cards: any[]
}

export interface AppDialogProps {
  handleSubmit: (...args: any[]) => void,
  dialogTitle: string,
  inputFields?: { label: string, value: string, mutator: React.Dispatch<React.SetStateAction<any>> }[],
  children?: React.ReactNode,
  open: boolean;
  onOpenChange: (open: boolean) => void;
  description?:string
}

export interface AppCustomAlert {
  type?: string,
  title: string,
  desc: string,
  open: boolean;
  handleSubmit: (...args: any[]) => void;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode,
}