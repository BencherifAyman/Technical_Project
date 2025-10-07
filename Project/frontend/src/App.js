import React, { useEffect } from "react";
import "./App.scss";
import { socket } from "./lib/socket";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./store/slices/productsSlice";
import { logout } from "./store/slices/authSlice";

import { AppBar, Toolbar, Typography, Container, Box, Button, Stack, Alert } from "@mui/material";
import LoginForm from "./components/LoginForm";
import ProductTable from "./components/ProductTable";

export default function App() {
  const dispatch = useDispatch();
  const token = useSelector(s => s.auth.token);
  const products = useSelector(s => s.products.items);
  const status = useSelector(s => s.products.status);

  useEffect(() => {
    if (!token) return;
    dispatch(fetchProducts());

    const refresh = () => dispatch(fetchProducts());
    const onConnect = () => console.log("socket connected:", socket.id);

    socket.on("connect", onConnect);
    socket.on("product_created", refresh);
    socket.on("product_updated", refresh);
    socket.on("product_deleted", refresh);

    return () => {
      socket.off("connect", onConnect);
      socket.off("product_created", refresh);
      socket.off("product_updated", refresh);
      socket.off("product_deleted", refresh);
    };
  }, [token, dispatch]);

  if (!token) {
    return (
      <Container sx={{ mt: 6 }}>
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>Connexion requise</Typography>
        <Alert severity="info" sx={{ mb: 3, maxWidth: 420, mx: "auto" }}>
          Connecte-toi pour accéder à la gestion des produits.
        </Alert>
        <LoginForm />
      </Container>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1 }}>Products</Typography>
          <Button color="inherit" onClick={()=>dispatch(logout())}>Logout</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        {status === "error" && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Erreur lors du chargement des produits.
          </Alert>
        )}
        <Box sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <ProductTable items={products} />
          </Stack>
        </Box>
      </Container>
    </>
  );
}
