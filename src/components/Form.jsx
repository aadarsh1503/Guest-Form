import React, { useState, useEffect } from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        attendingWithGuest: false,
        guestName: ''
    });

    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.age) newErrors.age = 'Age is required';
        else if (formData.age <= 0) newErrors.age = 'Age must be greater than 0';
        if (formData.attendingWithGuest && !formData.guestName) newErrors.guestName = 'Guest Name is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmittedData(formData);
        }
    };

    useEffect(() => {
        if (submittedData) {
            // You can perform any additional actions here after form submission
            console.log('Form submitted successfully', submittedData);
        }
    }, [submittedData]);

    return (
          
        <div className="h-100 p-7 gap-2 rounded-lg text-xl font-medium bg-white my-4 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">EVENT REGISTRATION FORM </h2>
            
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-red-100 p-6 rounded-lg">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block text-gray-700">Age</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    {errors.age && <span className="text-red-500">{errors.age}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="attendingWithGuest" className="flex items-center">
                        <input type="checkbox" id="attendingWithGuest" name="attendingWithGuest" checked={formData.attendingWithGuest} onChange={handleChange} className="mr-2" />
                        <span>Are you attending with a guest?</span>
                    </label>
                </div>
                {formData.attendingWithGuest && (
                    <div className="mb-4">
                        <label htmlFor="guestName" className="block text-gray-700">Guest Name</label>
                        <input type="text" id="guestName" name="guestName" value={formData.guestName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        {errors.guestName && <span className="text-red-500">{errors.guestName}</span>}
                    </div>
                )}
                <div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </div>
            </form>

            {submittedData && (
                <div className="mt-8 h-80 w-full max-w-md bg-green-100 p-6 rounded-lg">
                    <h1 className="text-2xl mb-4">Form Data</h1>
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Age:</strong> {submittedData.age}</p>
                    <p><strong>Attending with Guest:</strong> {submittedData.attendingWithGuest ? 'Yes' : 'No'}</p>
                    {submittedData.attendingWithGuest && <p><strong>Guest Name:</strong> {submittedData.guestName}</p>}
                </div>
            )}
        </div>
    );
};

export default Form;
