import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Users from './pages/users/Users.jsx'
import Home from './pages/Home.jsx'
import UserDetail from './components/fetch_users/UserDetail.jsx'
import BuildingDetail from './components/fetch_buildings/BuildingDetail.jsx'
import AddUser from './components/fetch_users/AddUser.jsx'
import AddBuilding from './components/fetch_buildings/AddBuilding.jsx'
import EditUser from './components/fetch_users/EditUser.jsx'
import EditBuilding from './components/fetch_buildings/EditBuilding.jsx'
import Buildings from './pages/buildings/Buildings.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="usuarios" element={<Users />} />
        <Route path="usuario/:userId" element={<UserDetail />} />
        <Route path="agregar-usuario" element={<AddUser />} />
        <Route path="editar-usuario/:userId" element={<EditUser />} />
        
        <Route path="edificios/:buildingId" element={<BuildingDetail />} />
        <Route path="agregar-edificios" element={<AddBuilding />} />
        <Route path="editar-edificios/:buildingId" element={<EditBuilding />} />
        <Route path="edificios" element={<Buildings />} />
      </Route>
    </Routes>
  )
}

export default App