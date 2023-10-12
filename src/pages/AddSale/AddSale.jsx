import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './AddSale.module.css';

function AddSale() {
    const { monthYear } = useParams();
    const [month, year] = monthYear.split('-');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [date, setDate] = useState('');
    const [gstRate, setGstRate] = useState(18);
    const [totalAmount, setTotalAmount] = useState('');

    const handleInvoiceNumberChange = (event) => {
        setInvoiceNumber(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleGstRateChange = (event) => {
        setGstRate(Number(event.target.value));
    };

    const handleTotalAmountChange = (event) => {
        setTotalAmount(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`${process.env.REACT_APP_API}/post/addSale?monthYear=${monthYear}`, {
            invoiceNumber,
            date,
            gstRate,
            totalAmount,
        });
    };

    return (
        <>
            <div className={styles.main}>
                <h1>{`${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`}</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        Invoice Number:
                        <input type="number" value={invoiceNumber} onChange={handleInvoiceNumberChange} />
                    </label>
                    <br />
                    <label>
                        Date:
                        <input type="date" value={date} onChange={handleDateChange} />
                    </label>
                    <br />
                    <label>
                        GST Rate:
                        <select value={gstRate} onChange={handleGstRateChange}>
                            <option value={18}>18%</option>
                            <option value={28}>28%</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Total Amount:
                        <input type="number" value={totalAmount} onChange={handleTotalAmountChange} />
                    </label>
                    <br />
                    <button type="submit">Add</button>
                </form>

            </div>
        </>
    );
}

export default AddSale;