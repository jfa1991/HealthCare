import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { Contact, Landing, Register, ErrorPage, ProtectedRoute, Staff } from './pages'


import { SharedLayout, Booking, Profile } from './pages/dashboard'


function App() {
  return (
    <BrowserRouter>
      <Routes>



        <Route 
          path = '/'
          element = {
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>
          }
         >

        <Route index element = {<Booking />} />
         <Route path ='profile' element = {<Profile/>} />
        </Route>

        

        <Route path = '/landing' element = {<Landing />} />
        <Route path = '/contact' element = {<Contact />} />
        <Route path = '/register' element = {<Register/>} />
        <Route path = '/staff' element = {<Staff />} />
        <Route path ='*' element = {<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  )

}
export default App;

