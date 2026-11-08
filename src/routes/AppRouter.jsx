import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import PageLoader from '../components/common/PageLoader';

const HomePage = lazy(() => import('../pages/HomePage'));
const ShopPage = lazy(() => import('../pages/ShopPage'));
const CategoryPage = lazy(() => import('../pages/CategoryPage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const PolicyPage = lazy(() => import('../pages/PolicyPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const FaqPage = lazy(() => import('../pages/FaqPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

function Lazy({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={
            <Lazy>
              <HomePage />
            </Lazy>
          }
        />
        <Route
          path="shop"
          element={
            <Lazy>
              <ShopPage />
            </Lazy>
          }
        />
        <Route
          path="category/:slug"
          element={
            <Lazy>
              <CategoryPage />
            </Lazy>
          }
        />
        <Route
          path="product/:id"
          element={
            <Lazy>
              <ProductPage />
            </Lazy>
          }
        />
        <Route
          path="cart"
          element={
            <Lazy>
              <CartPage />
            </Lazy>
          }
        />
        <Route
          path="policies/:policySlug"
          element={
            <Lazy>
              <PolicyPage />
            </Lazy>
          }
        />
        <Route
          path="about"
          element={
            <Lazy>
              <AboutPage />
            </Lazy>
          }
        />
        <Route
          path="contact"
          element={
            <Lazy>
              <ContactPage />
            </Lazy>
          }
        />
        <Route
          path="faq"
          element={
            <Lazy>
              <FaqPage />
            </Lazy>
          }
        />
        <Route path="policies" element={<Navigate to="/policies/return-policy" replace />} />
        <Route
          path="*"
          element={
            <Lazy>
              <NotFoundPage />
            </Lazy>
          }
        />
      </Route>
    </Routes>
  );
}
