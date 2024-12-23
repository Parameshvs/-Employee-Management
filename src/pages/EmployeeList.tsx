import React, { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';

interface Employee {
  name: string;
  department: string;
  position: string;
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const addEmployee = (employee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
  };

  const deleteEmployee = (index: number) => {
    setEmployees((prevEmployees) => prevEmployees.filter((_, i) => i !== index));
  };

  const updateEmployee = (index: number, updatedEmployee: Employee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee, i) => (i === index ? updatedEmployee : employee))
    );
  };

  return (
    <div>
      <h2>Employee Management</h2>
      <EmployeeForm onAddEmployee={addEmployee} />
      <EmployeeTable
        employees={employees}
        onUpdate={updateEmployee}
        onDelete={deleteEmployee}
      />
    </div>
  );
};

export default EmployeeList;
