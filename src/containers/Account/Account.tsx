import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Navbar from "../../components/shared/Navbar/Navbar";
import { UserState } from "../../contexts/User/UserContext";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import CancelIcon from "@mui/icons-material/Cancel";

const Account = () => {
  //Declare all field related states
  const [oldPassword, setOldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] =
    React.useState<string>("");
  const [updateRoleEmail, setUpdateRoleEmail] = React.useState<string>("");

  //Declare all error/control states
  const [openDialogueBox, setOpenDialogueBox] = React.useState<boolean>(false);
  const [deleteAccountError, setDeleteAccountError] =
    React.useState<string>("");
  const [updatePasswordNotification, setUpdatePasswordNotification] =
    React.useState<{ type: string; description: string }>({
      type: "success",
      description: "",
    });
  const [updateRoleNotification, setUpdateRoleNotification] = React.useState<{
    type: string;
    description: string;
  }>({
    type: "success",
    description: "",
  });

  //Load userState from its associated context
  const userState = UserState();

  //Declare handler functions for button presses
  const handleUpdatePassword = () => {};
  const handleUpdateUserRole = (updateType: "standard" | "admin") => {};
  const handleOpenConfirm = () => {
    setOpenDialogueBox(true);
  };
  const handleCloseConfirm = () => {
    setOpenDialogueBox(false);
  };
  const handleDeletion = () => {};
  return (
    <>
      <Navbar pageName={"account"} backgroundColour={"#7F7F7F"} />
      {/* Top level grid container */}
      <Grid container sx={{ justifyContent: "center", width: "100%" }}>
        <Grid container xs={12} sm={6}>
          <Grid item xs={12} sx={{ padding: "5px" }}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {"Account Management For: " + userState?.userEmail ?? ""}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"Users Role: " + userState?.userStatus}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sx={{ padding: "5px" }}>
            <Card
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleUpdatePassword();
                }
              }}
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  justifyContent: "center",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {"Change Password"}
                </Typography>
                <TextField
                  label="Old Password"
                  variant="filled"
                  type="password"
                  InputLabelProps={{ shrink: true }}
                  focused={false}
                  value={oldPassword}
                  onChange={(e: any) => setOldPassword(e.target.value)}
                  margin="dense"
                  fullWidth={true}
                />
                <TextField
                  label="New Password"
                  variant="filled"
                  type="password"
                  InputLabelProps={{ shrink: true }}
                  focused={false}
                  value={newPassword}
                  onChange={(e: any) => setNewPassword(e.target.value)}
                  margin="dense"
                  fullWidth={true}
                />
                <TextField
                  label="Confirm New Password"
                  variant="filled"
                  type="password"
                  InputLabelProps={{ shrink: true }}
                  focused={false}
                  value={newPasswordConfirm}
                  onChange={(e: any) => setNewPasswordConfirm(e.target.value)}
                  margin="dense"
                  fullWidth={true}
                />
              </CardContent>

              {updatePasswordNotification.description !== "" && (
                <Typography
                  variant="body2"
                  color={
                    updatePasswordNotification.type === "error"
                      ? "red"
                      : "green"
                  }
                  sx={{ width: "100%", height: "100%", textAlign: "center" }}
                >
                  {updatePasswordNotification.description}
                </Typography>
              )}

              <CardActions
                sx={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={() => handleUpdatePassword()}
                  endIcon={<SyncLockIcon />}
                >
                  Update Password
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sx={{ padding: "5px" }}>
            <Card
              sx={{
                width: "100%",
                padding: "0px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {"Delete Account"}
                </Typography>
                {deleteAccountError !== "" && (
                  <Typography variant="body2" color={"red"}>
                    {deleteAccountError}
                  </Typography>
                )}
              </CardContent>

              <CardActions
                sx={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  onClick={handleOpenConfirm}
                  startIcon={<DeleteIcon />}
                >
                  DELETE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {userState.userStatus === "admin" && (
          <Grid container xs={12} sm={6}>
            <Grid item xs={12} sx={{ padding: "5px" }}>
              <Card sx={{ width: "100%" }}>
                <CardContent
                  sx={{
                    justifyContent: "center",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Admin Panel
                  </Typography>

                  <TextField
                    label="Account to update"
                    variant="filled"
                    color="primary"
                    value={updateRoleEmail}
                    onChange={(e: any) => setUpdateRoleEmail(e.target.value)}
                    fullWidth={true}
                  />

                  {updateRoleNotification.description !== "" && (
                    <Typography
                      variant="body2"
                      color={
                        updateRoleNotification.type === "error"
                          ? "red"
                          : "DarkSeaGreen"
                      }
                      sx={{
                        width: "100%",
                        height: "100%",
                        textAlign: "right",
                      }}
                    >
                      {updateRoleNotification.description}
                    </Typography>
                  )}
                </CardContent>

                <CardActions
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "right",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      width: "100%",
                      height: "100%",
                      textAlign: "right",
                      padding: "5px",
                    }}
                  >
                    Set Permissions For User To
                  </Typography>

                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => handleUpdateUserRole("standard")}
                    sx={{ textAlign: "center" }}
                  >
                    Standard
                  </Button>

                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => handleUpdateUserRole("admin")}
                    sx={{ textAlign: "center" }}
                  >
                    Admin
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Dialog
        open={openDialogueBox}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversible, do not confirm unless you are sure and
            understand the consequences.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            color="success"
            variant="contained"
            onClick={handleCloseConfirm}
            startIcon={<CancelIcon />}
            autoFocus
          >
            Cancel
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleDeletion}
            startIcon={<DeleteIcon />}
          >
            Yes I'm Sure
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Account;
