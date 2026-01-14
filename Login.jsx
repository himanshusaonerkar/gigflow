import { useState } from "react";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async () => {
    const res = await api.post("/api/auth/login", form);
    dispatch(setUser(res.data));
    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <input className="border p-2 w-full mb-2"
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full mb-2"
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className="bg-black text-white px-4 py-2 w-full"
        onClick={submit}>
        Login
      </button>
    </div>
  );
}
