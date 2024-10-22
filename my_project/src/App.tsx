import './App.css';
import { Task } from './data/Task';
import { User } from './data/User';
import useFetch from './hooks/useFetch';
import TaskBoard from './pages/TaskBoard';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment'

interface ApiResult {
  tickets: Task[];
  users: User[];
}

function App() {
  const { data, loading, error } = useFetch<ApiResult>(API_URL);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="App">
      {(data !== null) ?
        <TaskBoard tasks={data.tickets} users={data.users} /> :
        <h1> No data found</h1>}
    </div>
  );
}

export default App;
