/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
export default function ObjectCard({ object, onDelete }: any) {
  const router = useRouter();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative w-full h-48">
        <Image
          src={object.imageUrl}
          alt={object.title}
          fill
          className="object-cover"
        />
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg truncate">{object.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {object.description}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {new Date(object.createdAt).toLocaleDateString("fr-FR")}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between gap-2 p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
            onClick={() => router.push(`/object/${object.id}`)}
        >
          <Eye className="w-4 h-4 mr-1" />
          Voir
        </Button>
      <AlertDialog>
            {/* Le Trigger remplace ton bouton ou entoure ton bouton */}
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="flex-1">
                <Trash2 className="w-4 h-4 mr-1" />
                Supprimer
              </Button>
            </AlertDialogTrigger>
            
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Cela supprimera définitivement l objet
                  <strong> {object.title}</strong> 
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(object.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
       </AlertDialog>
      </CardFooter>
    </Card>
  );
}