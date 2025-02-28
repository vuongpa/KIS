import React, { useState, useEffect } from "react";
import { Typography, Paper, CircularProgress, Button, TextField, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import { callGetAPI, callPutAPI } from "../../api_utils";

export const UserProfile: React.FC = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [editing, setEditing] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [formData, setFormData] = useState<{ oldPassword: string; newPassword: string; confirmNewPassword: string }>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      try {
        const response = await callGetAPI(`/profile/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaveError("");
    setSuccessMessage("");

    if (!formData.oldPassword || !formData.newPassword || !formData.confirmNewPassword) {
      setSaveError("All password fields are required.");
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setSaveError("New passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await callPutAPI(`/profile/${userId}`, formData);
      setSuccessMessage("Password updated successfully!");
      setEditing(false);
    } catch (err) {
      setSaveError("Failed to update password. Please check your old password and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      {loading && <CircularProgress />}

      {error && (
        <Typography color="error" variant="body1">
          {error}
        </Typography>
      )}

      {!loading && !error && user && !editing && (
        <Paper style={{ padding: 20, textAlign: "center" }}>
          <Typography variant="h5">Username: {user.username}</Typography>
          <Typography variant="body1">Password: ********</Typography>
          
          {successMessage && (
            <Alert severity="success" style={{ marginTop: 10 }}>
              {successMessage}
            </Alert>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditing(true)}
            style={{ marginTop: 20 }}
          >
            Change Password
          </Button>
        </Paper>
      )}

      {editing && !loading && !error && user && (
        <Paper style={{ padding: 20, textAlign: "center" }}>
          <Typography variant="h5">Change Password</Typography>

          {saveError && (
            <Alert severity="error" style={{ marginBottom: 10 }}>
              {saveError}
            </Alert>
          )}

          <TextField
            label="Old Password"
            variant="outlined"
            fullWidth
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            style={{ marginBottom: 20 }}
          />

          <TextField
            label="New Password"
            variant="outlined"
            fullWidth
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            style={{ marginBottom: 20 }}
          />

          <TextField
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            name="confirmNewPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            style={{ marginBottom: 20 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: 20 }}
          >
            Save Changes
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setEditing(false)}
            style={{ marginTop: 20, marginLeft: 10 }}
          >
            Cancel
          </Button>
        </Paper>
      )}
    </div>
  );
};
