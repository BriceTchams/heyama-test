"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { objectService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Trash2, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ObjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [object, setObject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await objectService.getOne(id as string);
        setObject(data);
      } catch {
        toast.error("Objet introuvable.");
        router.push("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const handleDelete = async () => {
    try {
      await objectService.remove(id as string);
      toast.success("Objet supprimé.");
      router.push("/");
    } catch {
      toast.error("Erreur lors de la suppression.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!object) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => router.push("/")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          <Trash2 className="w-4 h-4 mr-2" />
          Supprimer
        </Button>
      </div>

      {/* Image */}
      <div className="relative w-full h-72 rounded-xl overflow-hidden mb-6">
        <Image
          src={object.imageUrl}
          alt={object.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Détails */}
      <h1 className="text-3xl font-bold mb-3">{object.title}</h1>
      <p className="text-muted-foreground text-base leading-relaxed mb-4">
        {object.description}
      </p>
      <p className="text-sm text-muted-foreground">
        Créé le{" "}
        {new Date(object.createdAt).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
}