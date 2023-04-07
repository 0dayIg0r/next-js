import { BrowserRouter, Routes, Route, } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Error from './components/Error'
import Products from './pages/Products'
import Header from './components/Header'


const RoutesR = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} /> 
                <Route path='/product/:id' element={<Products />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesR