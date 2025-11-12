import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserTable } from '@/components/UserTable';
import { UserDialog } from '@/components/UserDialog';
import { DeleteDialog } from '@/components/DeleteDialog';
import { LogOut, Plus, Users as UsersIcon, Search, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  website: string;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<keyof User>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter((u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery) ||
      u.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      const aVal = a[sortBy]?.toString().toLowerCase() || '';
      const bVal = b[sortBy]?.toString().toLowerCase() || '';
      return sortOrder === 'asc' 
        ? aVal.localeCompare(bVal) 
        : bVal.localeCompare(aVal);
    });

    return filtered;
  }, [users, searchQuery, sortBy, sortOrder]);

  const handleSort = (column: keyof User) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Fetch users from API or localStorage
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Try to get from localStorage first
      const cachedUsers = localStorage.getItem('cachedUsers');
      if (cachedUsers) {
        setUsers(JSON.parse(cachedUsers));
        setIsLoading(false);
        return;
      }

      // Fetch from API
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
      localStorage.setItem('cachedUsers', JSON.stringify(data));
    } catch (error) {
      toast.error('Failed to load users. Please try again.');
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (userData: Omit<User, 'id'>) => {
    try {
      // Simulate API call
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const newUser = await response.json();
      // Add with a unique local ID
      const userWithId = { ...newUser, id: Date.now() };
      const updatedUsers = [...users, userWithId];
      setUsers(updatedUsers);
      localStorage.setItem('cachedUsers', JSON.stringify(updatedUsers));
      toast.success('User created successfully!');
      setIsCreateDialogOpen(false);
    } catch (error) {
      toast.error('Failed to create user. Please try again.');
      console.error('Error creating user:', error);
    }
  };

  const handleUpdateUser = async (userData: User) => {
    try {
      // Simulate API call
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userData.id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUsers = users.map((u) => (u.id === userData.id ? userData : u));
      setUsers(updatedUsers);
      localStorage.setItem('cachedUsers', JSON.stringify(updatedUsers));
      toast.success('User updated successfully!');
      setEditingUser(null);
    } catch (error) {
      toast.error('Failed to update user. Please try again.');
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      // Simulate API call
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const updatedUsers = users.filter((u) => u.id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem('cachedUsers', JSON.stringify(updatedUsers));
      toast.success('User deleted successfully!');
      setDeletingUser(null);
    } catch (error) {
      toast.error('Failed to delete user. Please try again.');
      console.error('Error deleting user:', error);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UsersIcon className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">User Management</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, <span className="font-medium text-foreground">{user?.username}</span>
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Filtered Results</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredAndSortedUsers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Session</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Live</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <UserTable
          users={filteredAndSortedUsers}
          isLoading={isLoading}
          onEdit={setEditingUser}
          onDelete={setDeletingUser}
          onSort={handleSort}
          sortBy={sortBy}
          sortOrder={sortOrder}
        />
      </main>

      {/* Dialogs */}
      <UserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateUser}
        title="Create New User"
        description="Add a new user to the system"
      />

      <UserDialog
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
        onSubmit={handleUpdateUser}
        user={editingUser || undefined}
        title="Edit User"
        description="Update user information"
      />

      <DeleteDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={() => deletingUser && handleDeleteUser(deletingUser.id)}
        userName={deletingUser?.name || ''}
      />
    </div>
  );
};

export default Dashboard;
