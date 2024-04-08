import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastMessage = ({ show, setShow, message, variant }) => {
  return (
    <Toast show={show} onClose={() => setShow(false)} delay={4000} autohide style={{ position: 'fixed', top: '20px', right: '20px' }}>
      {/* <Toast.Header>
        <strong className="me-auto">Notification</strong>
      </Toast.Header> */}
      <Toast.Body className={`text-white rounded bg-${variant} `}>
        {message}
      </Toast.Body>
    </Toast>
  );
};

export default ToastMessage;
