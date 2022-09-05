import React, { useEffect, useState } from "react";


import { StatusCodes } from "http-status-codes";
import axios from "axios";
import { api } from "./api";
import styles from "./App.css";
import Users from "./Components/Users";

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState({});
  const pageLimit = 10 ;
  const dataLimit = 10 ;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(api);
      if (response.status !== StatusCodes.OK) {
        throw new Error("Something wrong while making API call");
      }
      let usersData = response.data.map((user) => ({
        ...user,
        available: true,
        selected: false,
      }));
      setUsers(usersData);
    } catch (error) {
      const statusCode = error.response.status
        ? error.response.status
        : StatusCodes.BAD_REQUEST;
      setError({ statusCode, message: error.message });
    }
  };

  const handleDelete = (id) => {
    const data = [...users];
    const afterDeletionData = data.filter((d) => d.id !== id);
    setUsers(afterDeletionData);
  };

  const handleSearch = (event) => {
    const toBeSearched = event.target.value.toLowerCase();
    const data = [...users];
    const afterSearchData = data.map((d) => {
      if (
        d.name.toLowerCase().includes(toBeSearched) ||
        d.email.toLowerCase().includes(toBeSearched) ||
        d.role.toLowerCase().includes(toBeSearched)
      ) {
        return { ...d, available: true };
      } else {
        return { ...d, available: false };
      }
    });
    setUsers(afterSearchData);
  };

  const handleConfirmEdit = (user, editedValues) => {
    const data = [...users];
    const userId = data.indexOf(user);
    const newData = { ...data[userId], ...editedValues };
    data[userId] = newData;
    setUsers(data);
  };

  const handleSelect = (event, user) => {
    const current = event.target;
    const data = [...users];
    const userId = data.indexOf(user);
    if (current.checked) {
      data[userId].selected = true;
    } else {
      data[userId].selected = false;
    }
    setUsers(data);
  };

  const handleSelectAll = (event, usersInThatPage) => {
    const current = event.target;
    const data = [...users];
    if (current.checked) {
      data.forEach((d) => {
        usersInThatPage.forEach((user) => {
          if (d.id === user.id) {
            d.selected = true;
          }
        });
      });
    } else {
      data.forEach((d) => {
        usersInThatPage.forEach((user) => {
          if (d.id === user.id) {
            d.selected = false;
          }
        });
      });
    }
    setUsers(data);
  };

  const handleDeleteSelected = (selectedUsers) => {
    const data = [...users];
    const selectedUserIds = selectedUsers.map((d) => d.id);
    const filterdData = data.filter(
      (user) => !(selectedUserIds.includes(user.id) && user.selected)
    );
    setUsers(filterdData);
  };

  return (
    <div className={styles.AppDiv}>
      {users.length > 0 ? (
        <Users
          users={users}
          pagesLimit={pageLimit}
          dataLimit={dataLimit}
          onDelete={handleDelete}
          onSearch={handleSearch}
          handleConfirmEdit={handleConfirmEdit}
          onSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleDeleteSelected={handleDeleteSelected}
        />
      ) : (
        <h1>No Users to Display! {error.message}</h1>
      )}
    </div>
  );
}

export default App;