import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import styles from './ViewPurchases.module.css';

function ViewPurchases() {

    const [purchase, setPurchase] = useState([]);
    const { monthYear } = useParams();
    const [month, year] = monthYear.split('-');
    const [total, setPurchaseTotal] = useState(0);
    const [total18Percent, setTotal18Percent] = useState(0);
    const [total28Percent, setTotal28Percent] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/get/viewPurchase?monthYear=${monthYear}`)
            .then(res => {
                setPurchaseTotal(res.data.purchaseSummary.total);
                setTotal18Percent(res.data.purchaseSummary.total18Percent);
                setTotal28Percent(res.data.purchaseSummary.total28Percent);
                setPurchase(res.data.allPurchase);
            })
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
    }

    return (
        <>
            <div className={styles.main}>
                <h1>{`${month.charAt(0).toUpperCase() + month.slice(1)} ${year}`}</h1>
                <div className={styles.totals}>
                    <p>Total: {formatCurrency(total)}</p>
                    <p>18%: {formatCurrency(total18Percent)}</p>
                    <p>28%: {formatCurrency(total28Percent)}</p>
                </div>
                <div className={styles.container}>
                    <Table className={styles.table}>
                        <Thead>
                            <Tr>
                                <Th className={styles.th}>Invoice</Th>
                                <Th className={styles.th}>Date</Th>
                                <Th className={styles.th}>GST %</Th>
                                <Th className={styles.th}>Amount</Th>
                                <Th className={styles.th}>GST</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {purchase.map((purchase) => (
                                <Tr key={purchase.invoiceNumber}>
                                    <Td className={styles.td}>{purchase.invoiceNumber}</Td>
                                    <Td className={styles.td}>{purchase.date}</Td>
                                    <Td className={styles.td}>{`${purchase.gstRate}%`}</Td>
                                    <Td className={styles.td}>{`${formatCurrency(purchase.amount)}`}</Td>
                                    <Td className={styles.td}>{`${formatCurrency(purchase.gstAmount)}`}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default ViewPurchases;