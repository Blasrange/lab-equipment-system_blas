import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import { useTranslation } from "@/hooks/use-translation";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CreateUserModal from "./CreateUsersModal";
import EditUserModal from "./EditUsersModal";
import { Button as ShadcnButton } from '@/components/ui/button';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  active: boolean;
}

interface Props {
  users: {
    data: User[];
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
  };
  filters: {
    search?: string;
    status?: string;
    date_from?: string;
    date_to?: string;
    sort_field?: string;
    sort_direction?: string;
    per_page?: number;
  };
}

export default function UsersIndex({ users, filters = {} }: Props) {
  const { t } = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t("users.title"),
      href: "/users",
    },
  ];

  const [openModal, setOpenModal] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [localPage, setLocalPage] = React.useState(users.current_page || 1);
  const [localRowsPerPage, setLocalRowsPerPage] = React.useState(users.per_page || 10);
  const [loading, setLoading] = React.useState(false);

  // Sincronizar con props
  React.useEffect(() => {
    if (users.current_page !== localPage) {
      setLocalPage(users.current_page);
    }
    if (users.per_page !== localRowsPerPage) {
      setLocalRowsPerPage(users.per_page);
    }
  }, [users.current_page, users.per_page]);

  // Función para formatear fecha en formato colombiano
  function formatColombiaDate(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // Función para manejar la creación de usuarios
  const handleCreateUser = (userData: any) => {
    console.log("Datos a enviar:", userData);

    const formData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation,
      active: userData.active ?? true,
    };

    router.post("/users", formData, {
      onSuccess: () => {
        setOpenModal(false);
      },
      onError: (errors) => {
        console.error("Errores al crear usuario:", errors);
      },
    });
  };

  // Función para manejar la edición de usuarios
  const handleEditUser = (userData: any) => {
    if (!selectedUser) return;

    const formData: any = {
      name: userData.name,
      email: userData.email,
      active: userData.active,
      _method: "PUT",
    };

    if (userData.password) {
      formData.password = userData.password;
      formData.password_confirmation = userData.password_confirmation;
    }

    router.post(`/users/${selectedUser.id}`, formData, {
      onSuccess: () => {
        setEditModalOpen(false);
        setSelectedUser(null);
      },
      onError: (errors) => {
        console.error("Errores al actualizar usuario:", errors);
      },
    });
  };

  // Función para abrir el modal de edición
  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  // Funciones de paginación
  const handleChangePage = async (newPage: number) => {
    if (newPage < 1 || newPage > users.last_page || loading) return;
    
    setLoading(true);
    setLocalPage(newPage);
    
    await router.get('/users', 
      { 
        page: newPage, 
        per_page: localRowsPerPage,
        ...filters // Preservar todos los filtros
      },
      {
        preserveState: true,
        preserveUrl: true,
        replace: false,
        only: ['users', 'filters']
      }
    );
    
    setLoading(false);
  };

  const handleChangeRowsPerPage = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = Number(event.target.value);
    setLocalRowsPerPage(newRowsPerPage);
    setLocalPage(1);
    
    setLoading(true);
    
    await router.get('/users', 
      { 
        page: 1, 
        per_page: newRowsPerPage,
        ...filters
      },
      {
        preserveState: true,
        preserveUrl: true,
        replace: false,
        only: ['users', 'filters']
      }
    );
    
    setLoading(false);
  };

  const totalRows = users.total;
  const totalPages = users.last_page;
  const currentPage = users.current_page;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={t("users.title")} />
      <div className="flex w-full flex-col items-center px-2 py-4 md:px-8 md:py-8">
        <div className="mb-6 flex w-full items-center justify-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
              }}
            >
              <PeopleIcon
                sx={{
                  color: "white",
                  fontSize: 28,
                }}
              />
            </Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              {t("users.title")}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenModal(true)}
            sx={{
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
              boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
              px: 2.5,
              py: 1,
              height: 40,
              "&:hover": {
                background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
                boxShadow: "0 6px 25px rgba(59, 130, 246, 0.4)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {t("users.add")}
          </Button>
        </div>
        
        {/* Aquí puedes agregar componentes de filtro más adelante */}
        
        <Box sx={{ width: "100%", maxWidth: "100%" }}>
          <Paper
            elevation={6}
            sx={{
              borderRadius: 4,
              background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              px: 2,
              py: 1,
              mb: 2,
              border: "1px solid rgba(59, 130, 246, 0.1)",
            }}
          >
            <TableContainer className="w-full max-w-full overflow-x-auto">
              <Table aria-label="users table" className="min-w-[50px]">
                <TableHead
                  sx={{
                    backgroundColor: "#f5f5f5",
                    "& .MuiTableCell-root": {
                      "&:first-of-type": {
                        borderTopLeftRadius: "16px",
                      },
                      "&:last-of-type": {
                        borderTopRightRadius: "16px",
                      },
                    },
                  }}
                >
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    >
                      {t("users.name")}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    >
                      {t("users.email")}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    >
                      {t("users.created_at")}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    >
                      {t("users.status")}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#333",
                      }}
                    >
                      {t("users.actions")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.data.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(59, 130, 246, 0.05)",
                          transform: "scale(1.001)",
                          transition: "all 0.2s ease-in-out",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "medium" }}
                        >
                          {user.name}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">
                        {formatColombiaDate(user.created_at)}
                      </TableCell>                      
                      <TableCell align="center">
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: "12px",
                            backgroundColor: user.active ? "#4caf50" : "#f44336",
                            color: "white",
                            fontSize: "0.875rem",
                          }}
                        >
                          {user.active
                            ? t("status.active")
                            : t("status.inactive")}
                        </span>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => handleEditClick(user)}
                            sx={{
                              borderRadius: 2,
                              fontWeight: "bold",
                              textTransform: "none",
                            }}
                          >
                            {t("users.edit")}
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        {/* Paginación */}
        {totalRows > localRowsPerPage && (
          <div
            className="mt-6 flex w-full items-center justify-between px-2"
            style={{ minHeight: 40 }}
          >
            <div className="text-sm text-gray-600">
              {t('common.pagination.showing')}{' '}
              {users.from ?? 0} {t('common.pagination.to')}{' '}
              {users.to ?? 0} {t('common.pagination.of')}{' '}
              {totalRows} {t('common.pagination.entries')}
            </div>
            <div className="flex items-center gap-2">
              <ShadcnButton
                size="sm"
                variant="outline"
                onClick={() => handleChangePage(1)}
                disabled={currentPage === 1 || loading}
                className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
              >
                {loading && currentPage === 1 ? '...' : '<<'}
              </ShadcnButton>
              <ShadcnButton
                size="sm"
                variant="outline"
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1 || loading}
                className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
              >
                {loading && currentPage === currentPage - 1 ? '...' : '<'}
              </ShadcnButton>
              <span className="mx-2 min-w-[24px] text-center text-sm font-medium">
                {currentPage}
              </span>
              <ShadcnButton
                size="sm"
                variant="outline"
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0 || loading}
                className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
              >
                {loading && currentPage === currentPage + 1 ? '...' : '>'}
              </ShadcnButton>
              <ShadcnButton
                size="sm"
                variant="outline"
                onClick={() => handleChangePage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0 || loading}
                className="rounded-lg border-gray-300 px-3 py-1 text-xs hover:bg-gray-50"
              >
                {loading && currentPage === totalPages ? '...' : '>>'}
              </ShadcnButton>
              <select
                value={localRowsPerPage}
                onChange={handleChangeRowsPerPage}
                disabled={loading}
                className="ml-2 rounded-lg border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                {[5, 10, 25, 50].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Modal para crear usuario */}
        <CreateUserModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onCreate={handleCreateUser}
        />

        {/* Modal para editar usuario */}
        <EditUserModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setSelectedUser(null);
          }}
          onUpdate={handleEditUser}
          user={selectedUser}
        />
      </div>
    </AppLayout>
  );
}