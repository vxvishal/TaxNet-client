import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import styles from './Purchase.module.css';

function Purchase() {
    const [months, setMonths] = useState([
        // { name: 'January', year: 2022 },
        // { name: 'February', year: 2022 },
        // { name: 'March', year: 2022 },
        // ...rest of the months
    ]);
    const [newMonth, setNewMonth] = useState('');
    const [newYear, setNewYear] = useState(new Date().getFullYear());

    useEffect(() => {
        async function getMonths() {
            await axios.get(`${process.env.REACT_APP_API}/get/purchase`)
                .then((response) => {
                    setMonths(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getMonths();
    }, []);

    const handleAddMonthClick = async (event) => {
        event.preventDefault();
        if (newMonth && newYear) {
            await axios.post(`${process.env.REACT_APP_API}/post/purchase/addMonth`, { month: newMonth, year: newYear })
                .then((response) => {
                    setMonths([{ month: newMonth, year: newYear }, ...months]);
                    setNewMonth('');
                    setNewYear(new Date().getFullYear());
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleNewMonthChange = (event) => {
        setNewMonth(event.target.value);
    };

    const handleNewYearChange = (event) => {
        setNewYear(event.target.value);
    };

    const location = useLocation();
    const isChildRouteActive = location.pathname !== "/purchase";

    return (
        <>
            {!isChildRouteActive && (
                <div className={styles.container}>
                    <h1>Purchase</h1>
                    <div className={styles.months}>
                        <form onSubmit={handleAddMonthClick} className={styles.newMonth}>
                            <div className={styles.inputContainer}>
                                <select value={newMonth} onChange={handleNewMonthChange} className={styles.selectMonth}>
                                    <option value="">Select Month</option>
                                    <option value="January">January</option>
                                    <option value="February">February</option>
                                    <option value="March">March</option>
                                    <option value="April">April</option>
                                    <option value="May">May</option>
                                    <option value="June">June</option>
                                    <option value="July">July</option>
                                    <option value="August">August</option>
                                    <option value="September">September</option>
                                    <option value="October">October</option>
                                    <option value="November">November</option>
                                    <option value="December">December</option>
                                </select>
                                <input
                                    type="number"
                                    placeholder="New Year"
                                    value={newYear}
                                    onChange={handleNewYearChange}
                                    className={styles.inputYear}
                                />
                                <button type="submit" className={styles.submitButton}>Add Month</button>
                            </div>
                        </form>
                        {months.map((aMonth) => (
                            <Link
                                key={`${aMonth.month}-${aMonth.year}`}
                                to={`/purchase/${aMonth.month.toLowerCase()}-${aMonth.year}`}
                                className={styles.month}
                            >
                                <p>{`${aMonth.month} ${aMonth.year}`}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <Outlet />
        </>
    );
}

export default Purchase;