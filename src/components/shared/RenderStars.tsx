import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface StarRatingProps {
	rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
	const fullStars = Math.floor(rating);
	const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
	const emptyStars = 5 - fullStars - halfStar;
	const stars = [];

	for (let i = 0; i < fullStars; i++) {
		stars.push(<FaStar key={`full-${i}`} />);
	}

	if (halfStar === 1) {
		stars.push(<FaStar key={`half-${fullStars}`} />);
	}

	for (let i = 0; i < emptyStars; i++) {
		stars.push(<FaRegStar key={`empty-${fullStars + halfStar + i}`} />);
	}

	return <div className="flex gap-1 text-warning">{stars}</div>;
};

export default StarRating;
