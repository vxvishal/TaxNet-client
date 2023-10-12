import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Home.module.css';

function Home() {

    const [salesTax, setSalesTax] = useState(0);
    const [purchaseTax, setPurchaseTax] = useState(0);
    const [monthYear, setMonthYear] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/get/home`)
            .then(res => {
                setSalesTax(res.data.salesTax);
                setPurchaseTax(res.data.purchaseTax);
                setMonthYear(res.data.currentMonthAndYear);
            })
            .catch(err => console.log(err));
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    }

    return (
        <>
            <div className={styles.main}>
                <h1>{monthYear}</h1>
                <h1>Sales Tax: {formatCurrency(salesTax)}</h1>
                <h1>Purchase Tax: {formatCurrency(purchaseTax)}</h1>
            </div>
        </>
    )
}

export default Home