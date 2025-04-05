'use client'
import { getJobSeekerEditById, getUserInfo } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';
import React from 'react';
import SeekerInformation from './SeekerInformation';

const JobSeekerProfile = () => {
    const cookies = useCookies();
    const userId = cookies.get("user_pid");

    const {
        isLoading: isUserLoading,
        error: userError,
        data: userData,
    } = useQuery({
        queryKey: ["userInfo", userId],
        queryFn: () => getUserInfo(userId as string),
    });

    const {
        isLoading,
        data: jobSeekData,
        error,
        refetch,
    } = useQuery({
        queryKey: ["jobSeekerInfo", userId],
        queryFn: () => getJobSeekerEditById(userId as string)
    });

    return (
        <aside className="basis-full">
            <SeekerInformation
                firstName={userData?.fname}
                lastName={userData?.lname}
                emailAddress={userData?.email}
                mobileNumber={userData?.mobile_no}
                address={userData?.customer_address || "N/A"}
                city={userData?.customer_city_name}
                area={userData?.customer_area_name}
                zipCode={userData?.customer_zip_postal_code}
                educationInfo={jobSeekData?.education_info}
                experienceInfo={jobSeekData?.work_experience_info}
                achievementInfo={jobSeekData?.achievement_info}
            />
        </aside>
    );
};

export default JobSeekerProfile;