import  { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs()
  const { user } = useSelector(store => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies")
    }
  }, [user, navigate])

  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <div className='mt-10'>
        <HeroSection />
      </div>
      <div className='px-4 mt-8 md:px-8'>
        <CategoryCarousel />
      </div>
      <div className='mt-8'>
        <LatestJobs />
      </div>
      <div className='mt-8'>
        <Footer />
      </div>
    </div>
  )
}

export default Home
