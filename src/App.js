import { useState, useEffect } from "react";
import { generateFakeUsers } from "./utils/generateFakeData";
import DataTable from "./components/DataTable";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) {
      setUsers(JSON.parse(stored));
    } else {
      const generated = generateFakeUsers(500);
      localStorage.setItem("users", JSON.stringify(generated));
      setUsers(generated);
    }
  }, []);

  return <DataTable data={users} />;
}

export default App;
