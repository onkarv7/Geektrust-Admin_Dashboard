
import React from "react";
import { Button } from "@mui/material";
import styles from "./pagination.module.css";


function NavButton({ content, onClick, isDisabled, isActive }) {
    return (
      <button 
        onClick={onClick}
        className={`${styles.navBtns} ${isActive ? styles.active : ""}`}
        disabled={isDisabled}
      >
        <span>{content}</span>
      </button>
    );
  }

export function Pagination({
    getPaginationGroups,
    changePage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
    currentPage,
    pages,
    anyUserSelected,
    handleDeleteSelected,
  }) {
    return (
      <div className={styles.pagination}>
        <Button 
        
          variant="contained"
  onClick={handleDeleteSelected}
  disabled={anyUserSelected()}
  color="error"

>
 Delete Selected
</Button>

        <div 
        className={styles.mypagination}
        style={{ width: "75%" }}>
        
          <NavButton
            content={"<<"}
            isDisabled={currentPage === 1 ? true : false}
            isActive={false}
            onClick={goToFirstPage}
        
          />
          <NavButton
            content={"<"}
            isDisabled={currentPage === 1 ? true : false}
            isActive={false}
            onClick={goToPreviousPage}
          />
          {getPaginationGroups().map((item, index) => (
            <NavButton
              key={index}
              content={item}
              onClick={changePage}
              isDisabled={false}
              isActive={currentPage === item ? true : false}
            />
          ))}
          <NavButton
            content={">"}
            onClick={goToNextPage}
            isDisabled={currentPage >= pages || pages === 0 ? true : false}
            isActive={false}
          />
          <NavButton
            content={">>"}
            onClick={goToLastPage}
            isDisabled={currentPage >= pages || pages === 0 ? true : false}
            isActive={false}
          />
        </div>
      </div>
    );
  }