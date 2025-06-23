"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@client/components/ui/alert-dialog";
import { Button } from "@client/components/ui/button";
import { useSeedLogic } from "./logic";

export function SeedAction({
  children = (
    <Button variant="secondary" size="sm">
      Seed
    </Button>
  ),
}) {
  const { startSeeding, isPending, isAlertDialogOpen, setIsAlertDialogOpen } =
    useSeedLogic();

  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Você tem absoluta certeza que deseja fazer isso?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente todos
            os dados existentes e os substituirá por dados de exemplo. Você está
            prestes a semear o banco de dados com dados fictícios.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={() => startSeeding()}
          >
            Semear Banco de Dados
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
