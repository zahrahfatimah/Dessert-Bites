import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCafesAsync } from "../features/cafeSlice";

export default function Location() {
  const dispatch = useDispatch();
  const { cafe, error } = useSelector((state) => state.cafe);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchCafesAsync());
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch cafes", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>ini halaman buat gemini ai masuk nda??</h1>
      {/* Render data cafe di sini */}
    </>
  );
}
