import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  TextField,
  MenuItem,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import CloseIcon from "@mui/icons-material/Close";

const accessLevels = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "user", label: "User" },
];

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};
const LOCAL_STORAGE_KEY = "teamData";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currentUserAccess = "admin";

  // Load team data from localStorage or fallback to mockDataTeam
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : mockDataTeam;
  });

  const [nextId, setNextId] = useState(() => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  const teamData = saved ? JSON.parse(saved) : mockDataTeam;
  const maxId = teamData.reduce((max, member) => {
    const parsedId = parseInt(member.id, 10);
    return !isNaN(parsedId) ? Math.max(max, parsedId) : max;
  }, 0);
  return maxId + 1;
});


  // Whenever team state changes, update localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(team));
  }, [team]);

  const [open, setOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    access: "user",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = () => {
    if (nextId > 9999) {
      alert("Maximum ID limit reached (9999).");
      return;
    }

    const id = String(nextId).padStart(4, "0"); // Format: 0001, 0002, ...
    const memberToAdd = { id, ...newMember, age: Number(newMember.age) };
    setTeam((prev) => [...prev, memberToAdd]);
    setNextId((prev) => prev + 1);
    setNewMember({ name: "", age: "", phone: "", email: "", access: "user" });
    handleClose();
  };


  const handleDeleteMember = (id) => {
    setTeam((prev) => prev.filter((member) => member.id !== id));
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      handleDeleteMember(deleteId);
    }
    handleCloseDeleteDialog();
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 0.5,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "access",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            display="flex"
            alignItems="center"
            p="5px"
            borderRadius="4px"
            bgcolor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon fontSize="small" />}
            {access === "manager" && <SecurityOutlinedIcon fontSize="small" />}
            {access === "user" && <LockOpenOutlinedIcon fontSize="small" />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        </Box>
      ),
      },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 0.5,
      getActions: (params) => [
        currentUserAccess === "admin" && (
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleOpenDeleteDialog(params.id)}
            color="error"
          />
        ),
      ].filter(Boolean),
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          mb: 2,
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          "&:hover": {
            backgroundColor: colors.blueAccent[900],
          },
        }}
      >
        Add New Member
      </Button>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={team} columns={columns} checkboxSelection />
      </Box>

      {/* Add New Member Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: colors.primary[400],
            color: colors.grey[100],
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "relative",
          }}
        >
          <Typography variant="h6">Add New Team Member</Typography>

          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newMember.name}
            onChange={handleChange}
            variant="filled"
            InputProps={{
              style: { color: colors.grey[100] },
            }}
            InputLabelProps={{
              style: { color: colors.grey[300] },
            }}
          />
          <TextField
            fullWidth
            label="Age"
            name="age"
            type="number"
            value={newMember.age}
            onChange={handleChange}
            error={newMember.age !== "" && Number(newMember.age) < 0}
            helperText={
              newMember.age !== "" && Number(newMember.age) < 0
                ? "Age cannot be negative"
                : ""
            }
            variant="filled"
            InputProps={{
              style: { color: colors.grey[100] },
              inputProps: { min: 0 },
            }}
            InputLabelProps={{
              style: { color: colors.grey[300] },
            }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={newMember.phone}
            onChange={handleChange}
            variant="filled"
            InputProps={{
              style: { color: colors.grey[100] },
            }}
            InputLabelProps={{
              style: { color: colors.grey[300] },
            }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={newMember.email}
            onChange={handleChange}
            variant="filled"
            error={newMember.email !== "" && !validateEmail(newMember.email)}
            helperText={
              newMember.email !== "" && !validateEmail(newMember.email)
                ? "Please enter a valid email address"
                : ""
            }
            InputProps={{
              style: { color: colors.grey[100] },
            }}
            InputLabelProps={{
              style: { color: colors.grey[300] },
            }}
          />
          <TextField
            select
            fullWidth
            label="Access Level"
            name="access"
            value={newMember.access}
            onChange={handleChange}
            variant="filled"
            InputProps={{
              style: { color: colors.grey[100] },
            }}
            InputLabelProps={{
              style: { color: colors.grey[300] },
            }}
          >
            {accessLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: colors.grey[100],
            }}
            aria-label="close"
            size="small"
          >
            <CloseIcon />
          </IconButton>

          <Button
            variant="contained"
            onClick={handleAddMember}
            disabled={
              !newMember.name ||
              newMember.age === "" ||
              Number(newMember.age) < 0 ||
              !newMember.phone ||
              !newMember.email
            }
            sx={{
              mt: 2,
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              "&:hover": {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            Add Member
          </Button>
        </Box>
      </Modal>

      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
        PaperProps={{
          sx: {
            bgcolor: colors.primary[400],
            color: colors.grey[100],
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle
          id="delete-dialog-title"
          sx={{
            color: colors.greenAccent[400],
            fontWeight: "bold",
            fontSize: "1.8rem",
            textAlign: "center",
          }}
        >
          Confirm Delete?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="delete-dialog-description"
            sx={{ color: colors.grey[300], fontSize: "1.2rem" }}
          >
            Are you sure you want to delete this team member? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteDialog}
            sx={{
              color: colors.grey[100],
              "&:hover": { backgroundColor: colors.primary[700] },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            autoFocus
            sx={{
              backgroundColor: colors.redAccent?.[600] || "#d32f2f",
              color: colors.grey[100],
              "&:hover": {
                backgroundColor: colors.redAccent?.[700] || "#b71c1c",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
