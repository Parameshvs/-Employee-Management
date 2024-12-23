import React, { useState } from 'react';

interface Employee {
  name: string;
  department: string;
  position: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  onUpdate: (index: number, updatedEmployee: Employee) => void;
  onDelete: (index: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onUpdate, onDelete }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedEmployee, setEditedEmployee] = useState<Employee | null>(null);

  const [filter, setFilter] = useState({ name: '', department: '', position: '' });
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: string } | null>(
    null
  );

  
  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedEmployee(employees[index]);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editedEmployee) {
      setEditedEmployee({ ...editedEmployee, [name]: value });
    }
  };

  
  const handleUpdate = () => {
    if (editedEmployee && editIndex !== null) {
      onUpdate(editIndex, editedEmployee);
      setEditIndex(null);
      setEditedEmployee(null);
    }
  };

  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(filter.name.toLowerCase()) &&
      employee.department.toLowerCase().includes(filter.department.toLowerCase()) &&
      employee.position.toLowerCase().includes(filter.position.toLowerCase())
    );
  });

  const handleSort = (key: keyof Employee) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = React.useMemo(() => {
    if (!sortConfig) return filteredEmployees;
    const { key, direction } = sortConfig;
    return [...filteredEmployees].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [filteredEmployees, sortConfig]);

  return (
    <>
      
      <div>
        <label>
          Filter by Name:
          <input
            type="text"
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
            placeholder="Enter name"
          />
        </label>
        <label>
          Filter by Department:
          <input
            type="text"
            name="department"
            value={filter.department}
            onChange={handleFilterChange}
            placeholder="Enter department"
          />
        </label>
        <label>
          Filter by Position:
          <input
            type="text"
            name="position"
            value={filter.position}
            onChange={handleFilterChange}
            placeholder="Enter position"
          />
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Name {sortConfig?.key === 'name' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}</th>
            <th onClick={() => handleSort('department')}>Department {sortConfig?.key === 'department' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}</th>
            <th onClick={() => handleSort('position')}>Position {sortConfig?.key === 'position' ? (sortConfig.direction === 'ascending' ? '🔼' : '🔽') : ''}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee, index) => (
            <tr key={index}>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="name"
                    value={editedEmployee?.name || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="department"
                    value={editedEmployee?.department || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  employee.department
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="position"
                    value={editedEmployee?.position || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  employee.position
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => setEditIndex(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => onDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeTable;
