import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

export default function ProductDialog({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({
    _id: undefined,
    name: "",
    type: "",
    price: "",
    rating: "",
    warranty_years: "",
    available: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm({
        _id: initial?._id,
        name: initial?.name ?? "",
        type: initial?.type ?? "",
        price: initial?.price ?? "",
        rating: initial?.rating ?? "",
        warranty_years: initial?.warranty_years ?? "",
        available: initial?.available ?? true,
      });
      setErrors({}); // reset errors à l’ouverture
    }
  }, [open, initial]);

  const change = (k) => (e) => {
    const v = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [k]: v }));
    if (errors[k]) {
      // supprime l’erreur au fur et à mesure que l’utilisateur tape
      setErrors((prev) => ({ ...prev, [k]: "" }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.type.trim()) newErrors.type = "Type is required";
    if (form.price === "" || isNaN(Number(form.price)))
      newErrors.price = "Price is required and must be a number";
    if (form.rating === "" || isNaN(Number(form.rating)))
      newErrors.rating = "Rating is required and must be a number";
    if (form.warranty_years === "" || isNaN(Number(form.warranty_years)))
      newErrors.warranty_years = "Warranty is required and must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const save = () => {
    if (!validate()) return; // ❌ ne pas envoyer si formulaire invalide

    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      warranty_years: Number(form.warranty_years),
    };
    onSave?.(payload);
  };

  const allValid = () => {
    return (
      form.name.trim() &&
      form.type.trim() &&
      form.price !== "" &&
      !isNaN(Number(form.price)) &&
      form.rating !== "" &&
      !isNaN(Number(form.rating)) &&
      form.warranty_years !== "" &&
      !isNaN(Number(form.warranty_years))
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{form._id ? "Edit product" : "New product"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Name"
            value={form.name}
            onChange={change("name")}
            required
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Type"
            value={form.type}
            onChange={change("type")}
            required
            error={!!errors.type}
            helperText={errors.type}
          />
          <TextField
            label="Price"
            type="number"
            value={form.price}
            onChange={change("price")}
            required
            error={!!errors.price}
            helperText={errors.price}
          />
          <TextField
            label="Rating"
            type="number"
            value={form.rating}
            onChange={change("rating")}
            required
            error={!!errors.rating}
            helperText={errors.rating}
          />
          <TextField
            label="Warranty (years)"
            type="number"
            value={form.warranty_years}
            onChange={change("warranty_years")}
            required
            error={!!errors.warranty_years}
            helperText={errors.warranty_years}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.available}
                onChange={change("available")}
              />
            }
            label="Available"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={save}
          variant="contained"
          disabled={!allValid()} // 🔥 désactive le bouton si invalide
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
