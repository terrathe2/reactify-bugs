import React from 'react'

function BugItem (props) {
  const deleteBug = () => {
    props.delete(props.id)
  }

  const setStatusClosed = () => {
    // console.log("ini .. ", props);
    props.close(props.id)
  }

  return (
    <div className="card" >
      <header className="card-header">
        <p className="card-header-title">
        BugId: {props.id}
        </p>
      </header>
      <div className="card-content">
        <div className="content">
          {props.description}
          <span className="tag is-info"> {props.severity}</span>
          <p>Assigned To: {props.assignedTo}</p>
        </div>
        <br />
        <small className="tag is-primary">{props.status}</small>
      </div>
      <footer className="card-footer">
        { props.status === 'Open' ? <a className="is-warning card-footer-item" onClick={setStatusClosed}>Close</a> :
          <a className="is-warning card-footer-item" disable>Closed</a>
        }
        <a className="card-footer-item" onClick={deleteBug}>Delete</a>
      </footer>
      <br />
    </div>
  )
}

export default BugItem
