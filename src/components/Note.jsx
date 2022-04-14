import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import EditNote from "../modals/EditNote";

const Note = ({ taskObj, index, deleteTask, updateListArray }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const updateTask = (obj) => {
    updateListArray(obj, index);
  };

  const handleDelete = () => {
    deleteTask(index);
  };
  return (
    <div>
      <Card border="primary" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{taskObj.Name}</Card.Title>

          <Card.Text>{taskObj.Description}</Card.Text>
          <i
            class="fa fa-edit mx-1"
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => setModal(true)}
          ></i>
          <i
            class="fa fa-trash mx-1"
            style={{ color: "red", cursor: "pointer" }}
            onClick={handleDelete}
          ></i>
        </Card.Body>
      </Card>
      <EditNote
        modal={modal}
        toggle={toggle}
        updateTask={updateTask}
        taskObj={taskObj}
      />
    </div>
  );
};

export default Note;
