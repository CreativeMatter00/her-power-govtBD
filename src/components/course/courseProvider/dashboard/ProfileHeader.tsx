import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEdit } from 'react-icons/fa';

const ProfileHeader = () => {
    const locale = useLocale();
    return (
        <div className='w-full bg-brandLsPrimary flex justify-center items-center p-10 shadow-xl'>
            <div className="w-1/2 flex items-center gap-5 pb-3 mb-2">
                <h1 className="text-base font-bold  border-b border-brandLsPrimary ">
                    Course Provider Information
                </h1>
                <Link href={`/${locale}/course/course-provider/edit-course`}>
                    <FaEdit />
                </Link>
            </div>
            
        </div>
    );
};

export default ProfileHeader;