import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../store/slices/authSlice";
import { Box, Button, Stack, TextField, Typography, Alert } from "@mui/material";

export default function LoginForm({ onAuthed }) {
  const dispatch = useDispatch();
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const dispatchFn = mode === "login" ? login : register;
      // dispatch thunk and unwrap to throw on error
      await dispatch(dispatchFn({ username, password })).unwrap();
    } catch (err) {
      setError(err?.response?.data?.error || err.message);
    }
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ maxWidth: 360, mx: "auto", mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {mode === "login" ? "Login" : "Register"}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Stack spacing={2}>
        <TextField label="Username" value={username} onChange={(e)=>setUsername(e.target.value)} fullWidth />
        <TextField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} fullWidth />
        <Stack direction="row" spacing={1}>
          <Button type="submit" variant="contained">
            {mode === "login" ? "Login" : "Register"}
          </Button>
          <Button variant="text" onClick={()=>setMode(mode==="login"?"register":"login")}>
            {mode === "login" ? "Créer un compte" : "Déjà un compte ? Login"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
