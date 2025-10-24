import { useTranslation } from "@/hooks/use-translation";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import * as React from "react";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}

// Estilo mejorado con esquinas ovaladas
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "24px",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

// Estilos para el grid - ahora solo 2 columnas
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "16px",
};

// Estilo para campos con bordes redondeados
const roundedFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    "& input": {
      padding: "8px 14px",
    },
    "& fieldset": {
      borderColor: "#ccc",
    },
    "&:hover fieldset": {
      borderColor: "#aaa",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
    "&.Mui-error fieldset": {
      borderColor: "#d32f2f",
    },
  },
  "& .MuiInputLabel-root": {
    transform: "translate(14px, 14px) scale(1)",
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
  },
  "& .MuiFormHelperText-root": {
    marginLeft: "14px",
    marginRight: "14px",
    marginTop: "4px",
  },
};

interface UserFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function CreateUserModal({
  open,
  onClose,
  onCreate,
}: CreateUserModalProps) {
  const { t } = useTranslation();

  const [form, setForm] = React.useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<UserFormData>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof UserFormData, boolean>>>({});

  // Resetear formulario cuando se abre el modal
  React.useEffect(() => {
    if (open) {
      setForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      });
      setErrors({});
      setTouched({});
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof UserFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // Validar campo individual cuando pierde el foco
    validateField(name as keyof UserFormData, form[name as keyof UserFormData]);
  };

  const validateField = (fieldName: keyof UserFormData, value: string) => {
    const newErrors = { ...errors };

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          newErrors.name = t("users.errors.name_required");
        } else {
          delete newErrors.name;
        }
        break;
      
      case "email":
        if (!value.trim()) {
          newErrors.email = t("users.errors.email_required");
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = t("users.errors.email_invalid");
        } else {
          delete newErrors.email;
        }
        break;
      
      case "password":
        if (!value) {
          newErrors.password = t("users.errors.password_required");
        } else if (value.length < 8) {
          newErrors.password = t("users.errors.password_min_length");
        } else {
          delete newErrors.password;
        }
        break;
      
      case "password_confirmation":
        if (!value) {
          newErrors.password_confirmation = t("users.errors.password_confirmation_required");
        } else if (form.password !== value) {
          newErrors.password_confirmation = t("users.errors.password_mismatch");
        } else {
          delete newErrors.password_confirmation;
        }
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};

    if (!form.name.trim()) {
      newErrors.name = t("users.errors.name_required");
    }

    if (!form.email.trim()) {
      newErrors.email = t("users.errors.email_required");
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = t("users.errors.email_invalid");
    }

    if (!form.password) {
      newErrors.password = t("users.errors.password_required");
    } else if (form.password.length < 8) {
      newErrors.password = t("users.errors.password_min_length");
    }

    if (!form.password_confirmation) {
      newErrors.password_confirmation = t("users.errors.password_confirmation_required");
    } else if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = t("users.errors.password_mismatch");
    }

    setErrors(newErrors);
    
    // Marcar todos los campos como tocados para mostrar todos los errores
    setTouched({
      name: true,
      email: true,
      password: true,
      password_confirmation: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log("Datos del formulario a enviar:", form);

    // ENVÍA TODOS LOS DATOS INCLUYENDO password_confirmation
    const userData = {
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.password_confirmation, // ¡IMPORTANTE!
    };

    // Resetear el estado del formulario
    setForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });

    // Llamar a onCreate con TODOS los datos
    onCreate(userData);
  };

  const handleCancel = () => {
    // Resetear el formulario al cancelar
    setForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Función para determinar si mostrar el error
  const shouldShowError = (fieldName: keyof UserFormData) => {
    return !!errors[fieldName] && !!touched[fieldName];
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Encabezado con icono y botón de cerrar */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            {/* Icono de agregar */}
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#1976d2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon sx={{ color: "white", fontSize: 20 }} />
            </Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", color: "#1976d2" }}
            >
              {t("users.add")}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
            aria-label={t("common.close")}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Campos en una sola columna */}
          <div style={gridStyle}>
            <TextField
              fullWidth
              label={t("users.name")}
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={shouldShowError("name")}
              helperText={shouldShowError("name") ? errors.name : ""}
              sx={roundedFieldStyle}
              required
            />

            <TextField
              fullWidth
              label={t("users.email")}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={shouldShowError("email")}
              helperText={shouldShowError("email") ? errors.email : ""}
              sx={roundedFieldStyle}
              required
            />

            <TextField
              fullWidth
              label={t("users.password")}
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={shouldShowError("password")}
              helperText={shouldShowError("password") ? errors.password : ""}
              sx={roundedFieldStyle}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label={t("users.confirm_password")}
              name="password_confirmation"
              type={showConfirmPassword ? "text" : "password"}
              value={form.password_confirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              error={shouldShowError("password_confirmation")}
              helperText={shouldShowError("password_confirmation") ? errors.password_confirmation : ""}
              sx={roundedFieldStyle}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>

          {/* Botones de acción con iconos */}
          <Box display="flex" gap={2} mt={3}>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleCancel}
              startIcon={<CloseIcon />}
              sx={{
                borderRadius: "25px",
                px: 5,
                py: 1.2,
                textTransform: "uppercase",
                borderColor: "#1976D2",
                color: "#1976D2",
                fontWeight: 600,
                fontSize: "0.875rem",
                letterSpacing: "0.5px",
                "&:hover": {
                  borderColor: "#1976D2",
                  backgroundColor: "rgba(25, 118, 210, 0.04)",
                },
              }}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                borderRadius: "20px",
                height: "40px",
                minHeight: "40px",
                fontSize: "1rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              startIcon={<SaveIcon />}
            >
              {t("common.save")}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}