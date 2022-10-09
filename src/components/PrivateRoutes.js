import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateValue } from '../DataStore.js'

export default function PrivateRoutes() {
	const [{ isAuthenticated },] = useStateValue();

	return (
		isAuthenticated? <Outlet />:<Navigate to="/login" />
	)
}