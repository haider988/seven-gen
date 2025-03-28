import React from "react";
import Link from "next/link";

interface PromoCardProps {
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<PromoCardProps> = ({ title, description, link }) => {
  return (
    <div className="relative flex flex-col items-start p-6 border rounded-lg bg-opacity-80 border-gray-600 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-[#010818] to-[#003366] h-80">
      <h3 className="text-lg font-semibold mb-2 text-white pt-10">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <Link href={link} className="text-blue-400 hover:underline">
        Learn more
      </Link>
    </div>
  );
};

export default Card;
