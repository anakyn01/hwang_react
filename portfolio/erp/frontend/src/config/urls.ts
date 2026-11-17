"use client";

export const SERVER_URL =
typeof window !== "undefined" && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1'
? "https://erpbackend-augf.onrender.com"
: (process.env.NEXT_PUBLIC_SERVER_URL || "http://127.0.0.1:8080");

export const FRONTEND_URL = 
typeof window !=="undefined" && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' 
? window.location.origin
: "http://localhost:3000";