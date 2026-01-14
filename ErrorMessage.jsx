// ErrorMessage.jsx
export default ({ message }) =>
  message ? <div className="bg-red-100 text-red-700 p-3">{message}</div> : null;
