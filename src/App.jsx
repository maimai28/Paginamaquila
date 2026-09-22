import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Product from './pages/Product.jsx'
import Provider from './pages/Provider.jsx'
import Quote from './pages/Quote.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

function CategoriaRedirect() {
  const { id } = useParams()
  return <Navigate to={`/buscar?cat=${id}`} replace />
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="buscar" element={<Search />} />
        <Route path="categoria/:id" element={<CategoriaRedirect />} />
        <Route path="producto/:id" element={<Product />} />
        <Route path="proveedor/:id" element={<Provider />} />
        <Route path="cotizacion" element={<Quote />} />
        <Route path="terminos" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
