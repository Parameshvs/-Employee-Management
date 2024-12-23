import React, { useState, useEffect } from 'react';

interface Employee {
  id?: number;
  name: string;
  department: string;
  position: string;
}

interface EmployeeFormProps {
  onAddEmployee: (employee: Employee) => void;
  onEditEmployee: (employee: Employee) => void;
  editingEmployee: Employee | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onAddEmployee, onEditEmployee, editingEmployee }) => {
  const [employee, setEmployee] = useState<Employee>({
    name: '',
    department: '',
    position: '',
  });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee);
    }
  }, [editingEmployee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEmployee) {
      onEditEmployee(employee);
    } else {
      onAddEmployee({ ...employee, id: Date.now() });
    }
    setEmployee({ name: '', department: '', position: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={employee.name}
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        value={employee.department}
        placeholder="Department"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        value={employee.position}
        placeholder="Position"
        onChange={handleChange}
        required
      />
      <button type="submit">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
    </form>
  );
};

export default EmployeeForm;
