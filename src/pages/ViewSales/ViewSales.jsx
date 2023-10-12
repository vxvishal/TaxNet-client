import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import styles from './ViewSales.module.css';

function ViewSales() {
    const [sales, setSales] = useState([]);
    const { monthYear } = useParams();
    const [month, year] = monthYear.split('-');
    const [total, setSalesTotal] = useState(0);
    const [total18Percent, setTotal18Percent] = useState(0);
    const [total28Percent, setTotal28Percent] = useState(0);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/get/viewSales?monthYear=${monthYear}`)
            .then(res => {
                setSalesTotal(res.data.salesSummary.total);
                setTotal18Percent(res.data.salesSummary.total18Percent);
                setTotal28Percent(res.data.salesSummary.total28Percent);
                setSales(res.data.allSales);
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
                                <Th className={styles.th}>TotalAmount</Th>
                                <Th className={styles.th}>GST</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {sales.map((sale) => (
                                <Tr key={sale.invoiceNumber}>
                                    <Td className={styles.td}>{sale.invoiceNumber}</Td>
                                    <Td className={styles.td}>{sale.date}</Td>
                                    <Td className={styles.td}>{`${sale.gstRate}%`}</Td>
                                    <Td className={styles.td}>{`${formatCurrency(sale.totalAmount)}`}</Td>
                                    <Td className={styles.td}>{`${formatCurrency(sale.gstAmount)}`}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default ViewSales;