import { useState } from 'react'
import LandingPage    from './pages/LandingPage'
import LoginPage      from './pages/LoginPage'
import PatientDash    from './pages/PatientDashboard'
import DoctorDash     from './pages/DoctorDashboard'
import HospitalDash   from './pages/HospitalDashboard'
import GovernmentDash from './pages/GovernmentDashboard'
import './index.css'

export default function App() {
  const [page, setPage] = useState('landing')
  const go = (p) => { setPage(p); window.scrollTo(0, 0) }
  return (
    <>
      {page === 'landing'    && <LandingPage    go={go} />}
      {page === 'login'      && <LoginPage       go={go} />}
      {page === 'patient'    && <PatientDash     go={go} />}
      {page === 'doctor'     && <DoctorDash      go={go} />}
      {page === 'hospital'   && <HospitalDash    go={go} />}
      {page === 'government' && <GovernmentDash  go={go} />}
    </>
  )
}
