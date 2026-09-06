import React from "react";


// 
const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            {/* form for handling update and create category */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new category"
                        // binding with updated name/ name depnds on input 
                        value={value}
                        // setting updatedname/name
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;