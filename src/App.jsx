import './App.css';
import { useEffect, useState } from 'react';
import Factura from './components/Factura';
import Credit from './components/Credit'
import Modal from './components/Modal';
import axios from 'axios'

const App = () => {
    const [facturas, setFacturas] = useState([])
    const [selected, setSelected] = useState(null)
    const [selectedCreditNote, setSelectedCreditNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('https://recruiting.api.bemmbo.com/invoices/pending')
            .then(response => response.data)
            .then(initialFacturas => {
                setFacturas(initialFacturas)
            })
            .catch(error => {
                console.error(`Couldn't fetch facturas from endpoint. Error: ${error}`);
            })
    }, [])

    const recievedFacturas = facturas.filter(factura => factura.type === 'received')

    const creditNote = selected ? (
        facturas.filter(factura => selected.id === factura.reference)
    ) : []

    const handleSelectFactura = (id) => {
        const newSelected = facturas.find(factura => factura.id === id)
        setSelected(newSelected)
    }

    const handleSelectCredit = (id) => {
        const credit = facturas.find(factura => factura.id === id);
        setSelectedCreditNote(credit);
    };

    const handleAssign = () => {
        setIsModalOpen(true);  // Show the modal
    }

    const closeModal = () => {
        setSelected(null)
        setSelectedCreditNote(null)
        setIsModalOpen(false)
    }


    return (
        <>
            <Factura
                facturas={recievedFacturas}
                handleSelect={handleSelectFactura}
                showReference={false}
            />

            <Credit
                selected={selected}
                creditNote={creditNote}
                handleSelectCredit={handleSelectCredit}
                selectedCreditNote={selectedCreditNote}
                handleAssign={handleAssign}
            />
            <Modal
                isVisible={isModalOpen}
                onClose={closeModal}
            />
        </>
    );
}

export default App