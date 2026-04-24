"use client";

import { useState, useRef } from "react";
import { objectService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Upload } from "lucide-react";

export default function CreateObjectForm({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !image) {
      toast.error("Veuillez remplir tous les champs et choisir une image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      setLoading(true);
      await objectService.create(formData);
      toast.success("Objet créé avec succès !");
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      setOpen(false);
      onCreated();
    } catch (error) {
      toast.error("Erreur lors de la création.");
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-6 text-xl">
          <Plus className="w-4 h-4 mr-2" />
          Créer un objet
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Nouvel objet</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <Input
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <div
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="h-40 object-cover rounded" />
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Cliquez pour choisir une image
                </p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <Button onClick={handleSubmit} disabled={loading} className="mx-15 text-sm py-1 ">
            {loading ? "Création en cours..." : "Créer"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}