import React, { useEffect, useState } from "react";

import {Pagination} from "./Pagination";
import {UserDetails} from "./UserDetails";

import { TextField } from "@mui/material";

function Users({
  users,
  pagesLimit,
  dataLimit,
  onDelete,
  onSearch,
  handleConfirmEdit,
  onSelect,
  handleSelectAll,
  handleDeleteSelected,
}) {
  const [pages, setPages] = useState(1);
  const [pageLimit, setPageLimit] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let userData = users.filter((user) => user.available);
    let calculatedPages = Math.ceil(userData.length / dataLimit);
    setPages(calculatedPages);

    if (calculatedPages < pagesLimit) {
      if (calculatedPages === 0) {
        calculatedPages = 1;
      }
      setPageLimit(calculatedPages);
      return;
    }
    setPageLimit(pagesLimit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(pages);
  };

  const changePage = (event) => {
    event.preventDefault();
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginatedData = () => {
    const userData = users.filter((user) => user.available);
    const start = currentPage * dataLimit - dataLimit;
    const end = start + dataLimit;
    return userData.slice(start, end);
  };

  const getPaginationGroups = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    const paginationGroup = [];
    for (let i = 0; i < pageLimit; i++) {
      let value = start + i + 1;
      paginationGroup.push(value);
    }

    if (paginationGroup.at(0) > pages) {
      setCurrentPage(start);
    }
    return paginationGroup;
  };

  const anyUserSelected = () => {
    const selectedUsers = getPaginatedData();
    const isAnyUserSelected = selectedUsers.every((user) => !user.selected);
    return isAnyUserSelected;
  };

  const getSelectedUsers = () => {
    const selectedUsers = getPaginatedData();
    const isSelected = selectedUsers.every((user) => user.selected);
    return isSelected;
  };
  console.log(currentPage);
  return (
    <div >
     
      <TextField fullWidth  id="fullWidth" margin="none"
      placeholder="Search by name, email or role"
      onChange={onSearch}
       />


      <UserDetails
        onDelete={onDelete}
        getPaginatedData={getPaginatedData}
        handleConfirmEdit={handleConfirmEdit}
        onSelect={onSelect}
        handleSelectAll={handleSelectAll}
        getUsersInThatPage={getPaginatedData}
        getSelectedUsers={getSelectedUsers}
      />
      <Pagination
        getPaginationGroups={getPaginationGroups}
        changePage={changePage}
        goToFirstPage={goToFirstPage}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        goToLastPage={goToLastPage}
        currentPage={currentPage}
        pages={pages}
        anyUserSelected={anyUserSelected}
        handleDeleteSelected={handleDeleteSelected.bind(
          null,
          getPaginatedData()
        )}
      />
    </div>
  );
}

export default Users;