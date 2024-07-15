import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';

export default function Employee() {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/contacts')
            .then(response => response.json())
            .then(data => setEmployee(data))
            .catch(error => console.error('Error fetching employee data:', error));
    }, []);

    const validationSchema = yup.object({
        fname: yup.string()
            .min(3, "Firstname must be of min of 3 characters")
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        lname: yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: yup.string().email('Invalid email address').required('Required'),
        phone: yup.string().required('Phone Number is required'),
        address: yup.string().required('Address is required'),
        city: yup.string().required('City is required')
    });

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            address: '',
            city: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            axios.post('http://localhost:3000/contacts', values)
                .then(response => {
                    setEmployee([...employee, response.data]);
                    resetForm();
                })
                .catch(error => console.error('Error adding employee:', error));
        }
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <div className='bg-dark text-light text-center rounded py-3'>
                        <h2>Employee Details</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mt-2'>
                            <input
                                type="text"
                                className="form-control form-control-md"
                                placeholder="First Name"
                                name="fname"
                                value={formik.values.fname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.fname && formik.errors.fname ? (
                                <div className="text-danger">{formik.errors.fname}</div>
                            ) : null}
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                className="form-control form-control-md"
                                placeholder="Last Name"
                                name="lname"
                                value={formik.values.lname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.lname && formik.errors.lname ? (
                                <div className="text-danger">{formik.errors.lname}</div>
                            ) : null}
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                className="form-control form-control-md"
                                placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-danger">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                className="form-control form-control-md"
                                placeholder="Phone Number"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                                <div className="text-danger">{formik.errors.phone}</div>
                            ) : null}
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                className="form-control form-control-md"
                                placeholder="Address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.address && formik.errors.address ? (
                                <div className="text-danger">{formik.errors.address}</div>
                            ) : null}
                        </div>
                        <div className='mt-2'>
                            <input
                                type="text"
                                className="form-control form-control-md"
                                placeholder="City"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.city && formik.errors.city ? (
                                <div className="text-danger">{formik.errors.city}</div>
                            ) : null}
                        </div>
                        <div className='mt-2'>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
            <br />
            <br />
            <hr />
            <hr />

            <div className="row mt-2">
                {employee.map(employee => (
                    <div className='col-md-4' key={employee.id}>
                        <div className='card mt-2'>
                            <div className='card-body'>
                                <h5 className='card-title'>{employee.fname}</h5>
                                <p className='card-text'>{employee.lname}</p>
                                <p className='card-text'>{employee.email}</p>
                                <p className='card-text'>{employee.phone}</p>
                                <p className='card-text'>{employee.address}</p>
                                <p className='card-text'>{employee.city}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
