import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/Navbar";
import AddNotes from "./modals/AddNotes";
import { useState, useEffect } from "react";
import Note from "./components/Note";
import ReactPaginate from "react-paginate";

function App() {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const tasksPerPage = 6;
  const pagesVisited = pageNumber * tasksPerPage;

  useEffect(() => {
    let arr = localStorage.getItem("taskList");

    if (arr) {
      let obj = JSON.parse(arr);
      setTaskList(obj);
    }
  }, []);

  const deleteTask = (index) => {
    let tempList = taskList;
    tempList.splice(index, 1);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const updateListArray = (obj, index) => {
    let tempList = taskList;
    tempList[index] = obj;
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(tempList);
    window.location.reload();
  };

  const toggle = () => {
    setModal(!modal);
  };

  const saveTask = (taskObj) => {
    let tempList = taskList;
    tempList.push(taskObj);
    localStorage.setItem("taskList", JSON.stringify(tempList));
    setTaskList(taskList);
    setModal(false);
  };

  const displayTasks = taskList
    .slice(pagesVisited, pagesVisited + tasksPerPage)
    .map((obj, index) => (
      <>
        <Note
          taskObj={obj}
          index={index}
          deleteTask={deleteTask}
          updateListArray={updateListArray}
        />
      </>
    ));

  const pageCount = Math.ceil(taskList.length / tasksPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="App">
      <NavBar toggle={toggle} />
      <div className="task-container my-5 ">{displayTasks}</div>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={changePage}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
      <AddNotes toggle={toggle} modal={modal} save={saveTask} />
    </div>
  );
}

export default App;
