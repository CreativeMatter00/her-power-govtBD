'use client'
import { url } from '@/api/api';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Jobs from './Jobs';
import Tasks from './Tasks';

const CareerSearch = () => {
    const searchParams = useSearchParams();
    const queryParams = searchParams.toString();
    const searchName = searchParams.get('search')
    const [searchedJobData, serSearchedJobData] = useState([]);
    const [searchedTasksData, serSearchedTasksData] = useState([]);
    useEffect(() => {
        if (searchName) {
            const fetchSearchResults = async () => {
                try {
                    const response = await axios.post(`${url}/api/search-job-tasks`, {
                        search_term: searchName
                    });
                    // console.log('Search results:', response.data.data);
                    serSearchedJobData(response.data.data.jobs)
                    serSearchedTasksData(response.data.data.tasks)

                } catch (error) {
                    console.error('Error fetching search results:', error);
                }
            };
            fetchSearchResults();
        }
    }, [searchName]);

    return (
        <div className='pt-10 space-y-10'>

            <Jobs data={searchedJobData} searchName={searchName} />

            <Tasks data={searchedTasksData} searchName={searchName} />
        </div>
    );
};

export default CareerSearch;