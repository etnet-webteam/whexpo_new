import { useState } from 'react';
import { updatePassword } from 'aws-amplify/auth';
import {
  Button,
  Flex,
  TextField,
  Heading,
  View,
  Alert,
  Divider,
} from '@aws-amplify/ui-react';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await updatePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to change password';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <View className="password-modal-overlay">
      <View className="password-modal">
        <Flex direction="column" gap="1rem">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading level={4}>Change Password</Heading>
            <Button
              variation="link"
              onClick={handleClose}
              size="small"
            >
              ×
            </Button>
          </Flex>
          
          <Divider />

          {error && (
            <Alert variation="error" isDismissible onDismiss={() => setError('')}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert variation="success">
              Password changed successfully!
            </Alert>
          )}

          <form onSubmit={handlePasswordChange}>
            <Flex direction="column" gap="1rem">
              <TextField
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password"
              />
              
              <TextField
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
                descriptiveText="Minimum 8 characters"
              />
              
              <TextField
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
              />

              <Flex gap="0.5rem" justifyContent="flex-end">
                <Button
                  type="button"
                  variation="link"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variation="primary"
                  isLoading={isLoading}
                  loadingText="Changing..."
                >
                  Change Password
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </View>
    </View>
  );
};

export default PasswordChangeModal; 