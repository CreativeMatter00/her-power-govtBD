import { CheckCircle, Star } from "lucide-react"
import Image from "next/image"
import { MdVerified } from "react-icons/md";

const CourseUploadHero = () => {
    return <div>
        <div className="flex items-center py-8 gap-10">
        {/* Profile Image */}
        <div className="w-[168px] h-[168px] rounded-full bg-white p-1 border-4 border-[#763B90]">
          <Image
            src="/logo.png"
            alt="10 Minute School"
            width={168}
            height={168}
            className="rounded-full"
          />
        </div>

        {/* Profile Info */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1">
            <h2 className="text-xl font-semibold text-black">10 Minute School</h2>
            <MdVerified className="text-[#2B3589] w-5 h-5" />
          </div>
          <p className="text-sm text-gray-700">E-Learning Providers</p>

          {/* Ratings Section */}
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" className="mr-0.5" />
              ))}
            </div>
            <span className="text-sm text-black font-medium">4.5/5.0</span>
            <span className="text-xs text-gray-700">(Total 107 Ratings)</span>
          </div>

          <div className="flex space-x-6 mt-1 text-sm text-gray-800">
            <span><b>455</b> Followers</span>
            <span><b>45%</b> Positive Ratings</span>
          </div>
        </div>

        <button className="ml-auto px-4 py-1.5 text-sm font-medium rounded-full transition bg-white text-black hover:bg-gray-100 border border-gray-300">
          Edit Profile
        </button>
      </div>
    </div>
}

export default CourseUploadHero