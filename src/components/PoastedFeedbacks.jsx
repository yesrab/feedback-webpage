import React from "react";

const PoastedFeedbacks = ({ data }) => {
  return (
    <div className='w-full flex flex-col items-center gap-4'>
      <h4 className='text-3xl text-center'>All feedbacks</h4>
      {data?.map((item) => {
        return (
          <div
            key={item.idx}
            className='border flex flex-col gap-4 p-2 rounded-md w-full md:w-[70%]'>
            <h3 className='text-2xl '>Title: {item.name}</h3>
            <p className=''>Idea: {item.description}</p>
            <div>
              Topic:
              {item?.topics?.map((item, key) => {
                return (
                  <span
                    className={`mx-3 p-1 rounded-md ${
                      item.trim() == "Product Features ⚙️"
                        ? "bg-blue-200"
                        : item.trim() == "Product Pricing 💰"
                        ? "bg-green-200"
                        : item.trim() == "Product Usablity 💁‍♂️"
                        ? "bg-red-200"
                        : ""
                    }`}
                    key={key}>
                    {item.trim()}
                  </span>
                );
              })}
            </div>
            <div>
              Author:
              <h3 className='font-semibold'>{item.association.name}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PoastedFeedbacks;
