import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false
    const [isApplied, setIsApplied] = useState(isIntiallyApplied)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
            
            if (res.data.success) {
                setIsApplied(true) // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)) // Real-time UI update
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Sync state with fetched data
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    return (
        <div className='max-w-7xl mx-auto my-10 px-4'>
            <div className='flex flex-col md:flex-row items-start justify-between gap-6'>
                <div className='flex-1'>
                    <h1 className='font-bold text-xl md:text-2xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.postion} Positions</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <div className='flex-shrink-0'>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg w-full md:w-auto ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>

            <div className='border-b-2 border-b-gray-300 font-medium py-4'>
                <h1 className='text-xl font-semibold'>Job Description</h1>
            </div>

            <div className='space-y-4 mt-4'>
                <div className='text-sm md:text-base'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
                </div>
            </div>
        </div>
    )
}

export default JobDescription
