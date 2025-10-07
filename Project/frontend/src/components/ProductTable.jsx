import { useMemo, useState } from "react";
import { api } from "../api";
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton, Stack, Button } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import ProductDialog from "./ProductDialog";

export default function ProductTable({ items, onChanged }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const rows = useMemo(() => items ?? [], [items]);

  const create = async (payload) => {
    await api.post("/products", payload);
    setOpen(false);
    onChanged?.();
  };

  const update = async (payload) => {
    await api.put(`/products/${payload._id}`, payload);
    setEdit(null);
    onChanged?.();
  };

  const remove = async (id) => {
    await api.delete(`/products/${id}`);
    onChanged?.();
  };

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setOpen(true); }}>
          New product
        </Button>
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Warranty</TableCell>
            <TableCell>Available</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((p) => (
            <TableRow key={String(p._id)}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.type}</TableCell>
              <TableCell>{p.price}</TableCell>
              <TableCell>{p.rating}</TableCell>
              <TableCell>{p.warranty_years}</TableCell>
              <TableCell>{p.available ? "Yes" : "No"}</TableCell>
              <TableCell align="right">
                <IconButton onClick={()=>setEdit(p)}><EditIcon /></IconButton>
                <IconButton onClick={()=>remove(p._id)} color="error"><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow><TableCell colSpan={8} align="center">No products.</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
      
      {/* Dialogs */}
      <ProductDialog open={open} onClose={()=>setOpen(false)} onSave={create} />
      <ProductDialog open={!!edit} onClose={()=>setEdit(null)} onSave={update} initial={edit||undefined} />
    </>
  );
}
