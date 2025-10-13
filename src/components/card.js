"use client";
import React from "react";
import Link from "next/link";

function Card({ id, img, name, subCategory, price }) {
  return (
    <div className="mb-8 w-full p-0 sm:w-1/2 sm:p-3 md:w-1/3 md:p-6">
      <Link href={`/products/${id}`} className="group block h-full">
        <img src={img} alt={name} className="mb-4 aspect-square w-full object-cover" />
        <h2 className="text-dark mb-2 text-2xl">{name}</h2>
        <p className="text-primary mb-2 text-sm">{subCategory}</p>
        <p className="text-dark text-lg font-bold">{price} €</p>
      </Link>
    </div>
  );
}

export default Card;
