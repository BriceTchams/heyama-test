"use client";

import { useEffect, useState } from "react";
import { objectService } from "@/lib/api";
import ObjectCard from "./ObjectCard";
import CreateObjectForm from "./CreateObjectForm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ObjectList() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [objects, setObjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchObjects = async () => {
    try {
      const data = await objectService.getAll();
      console.log("Fetched objects:", data);
      setObjects(data);
    } catch {
      toast.error("Erreur lors du chargement des objects.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await objectService.remove(id);
      setObjects((prev) => prev.filter((obj) => obj._id !== id));
      fetchObjects();
      toast.success("Objet supprimé.");
    } catch {
      toast.error("Erreur lors de la suppression.");
    }
  };

useEffect(() => {
  const load = async () => {
    await fetchObjects();
  };
  load();
}, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Liste des  objets</h1>
        <CreateObjectForm onCreated={fetchObjects} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : objects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
          <p>Aucun objet pour le moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {objects.map((obj) => (
            <ObjectCard key={obj.id} object={obj} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}