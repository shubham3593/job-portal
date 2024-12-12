import React, { useState, useEffect } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('')
    const [isCollapsed, setIsCollapsed] = useState(true)  // State to track collapse/expand
    const dispatch = useDispatch()

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    const toggleFilter = () => {
        setIsCollapsed(prev => !prev)  // Toggle the collapsed state
    }

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            {/* Filter Title with Toggle Button */}
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleFilter}>
                <h1 className='font-bold text-lg'>{isCollapsed ? 'Show Filters' : 'Hide Filters'}</h1>
                <button className="text-blue-500">{isCollapsed ? '+' : '-'}</button>
            </div>
            <hr className='mt-3' />
            
            {/* Show Filter Options Only When Not Collapsed */}
            {!isCollapsed && (
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`
                                return (
                                    <div key={itemId} className='flex items-center space-x-2 my-2'>
                                        <RadioGroupItem value={item} id={itemId} />
                                        <Label htmlFor={itemId}>{item}</Label>
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </RadioGroup>
            )}
        </div>
    )
}

export default FilterCard
