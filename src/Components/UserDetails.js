import React, { useState } from "react";

import ClearIcon from "@mui/icons-material/Clear";

import DoneIcon from "@mui/icons-material/Done";
import EditAttributesOutlinedIcon from '@mui/icons-material/EditAttributesOutlined';
import styles from "./userDetails.module.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
  
  function UsersData({ user, onDelete, onConfirmEdit, onSelect }) {
    const userRoleLowerCase = user.role;
    const userRole =
      userRoleLowerCase.charAt(0).toUpperCase() + userRoleLowerCase.slice(1);
  
    const [editable, setEditable] = useState(false);
  
    const [userEditState, setUserEditState] = useState(user);
  
    const handleEditedValues = (event) => {
      setUserEditState({
        ...userEditState,
        [event.target.name]: event.target.value,
      });
    };
  
    const onEdit = () => {
      setEditable(true);
      setUserEditState({ ...user });
    };
  
    const onConfirm = () => {
      onConfirmEdit(user, userEditState);
      setEditable(false);
    };
  
    if (user.available) {
      return (
        <>
          <tr className={`${user.selected ? styles.selected : ""}`}>
            <td style={{ paddingLeft: "15px" }}>
              <input
                className={styles.largerCheckbox}
                type="checkbox"
                name={user.name}
                onChange={(event) => onSelect(event, user)}
                checked={user.selected}
              />
            </td>
            {editable ? (
              <>
                {[
                  { name: "name", type: "text" },
                  { name: "email", type: "email" },
                  { name: "role", type: "text" },
                ].map((field) => (
                  <td key={field.name}>
                    <input
                      type={field.type}
                      name={field.name}
                      value={userEditState[field.name]}
                      style={{ borderRadius: "6px", height: "22px" }}
                      onChange={handleEditedValues}
                    ></input>
                  </td>
                ))}
              </>
            ) : (
              <>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{userRole}</td>
              </>
            )}
  
            {editable ? (
              <tr>
                <td>
                  <button className={`${user.selected ? styles.selected : ""}`}>
                    <DoneIcon onClick={() => onConfirm()} />
                  </button>
                  <button className={`${user.selected ? styles.selected : ""}`}>
                    <ClearIcon onClick={() => setEditable(false)} />
                  </button>
                </td>
              </tr>
            ) : (
             
                <td>
                  <button className={`${user.selected ? styles.selected : ""}`}>
                    <EditAttributesOutlinedIcon onClick={() => onEdit()} />
                  </button>
                  <button className={`${user.selected ? styles.selected : ""}`}>
                    <DeleteOutlineOutlinedIcon
                      style={{ color: "red" }}
                      onClick={() => onDelete(user.id)}
                    />
                  </button>
                </td>
             
            )}
          </tr>
        </>
      );
    }
  }
  
  
  export function UserDetails({
    onDelete,
    getPaginatedData,
    handleConfirmEdit,
    onSelect,
    handleSelectAll,
    getUsersInThatPage,
    getSelectedUsers,
  }) {
    return (
      <table className={styles.userDetails}>
        <thead>
          <tr>
            <th style={{ paddingLeft: "15px" }}>
              <input
                className={styles.largerCheckbox}
                type="checkbox"
                name="selectAll"
                onChange={(event) => {
                  handleSelectAll(event, getUsersInThatPage());
                }}
                checked={getSelectedUsers()}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((user, idx) => (
            <UsersData
              user={user}
              key={idx}
              onDelete={onDelete}
              onConfirmEdit={handleConfirmEdit}
              onSelect={onSelect}
            />
          ))}
        </tbody>
      </table>
    );
  }



