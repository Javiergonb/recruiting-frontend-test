import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'


const FacturaTable = (props) => {
    return (
        <table className='tabla'>
            <tbody>
                {props.facturas.map(factura => {
                    return (
                        <tr key={factura.id}>
                            <td><button onClick={() => props.handleSelect(factura.id)}>select</button></td>
                            <td>{factura.id}</td>
                            <td>{factura.amount} ({factura.currency})</td>
                            <td>{factura.type}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const Modal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirm Assignment</h2>
                <p>Are you sure you want to assign this credit note?</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};


const App = () => {
    const [facturas, setFacturas] = useState([])
    const [selected, setSelected] = useState(null)
    const [selectedCreditNote, setSelectedCreditNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);




    useEffect(() =>{
        axios.get('https://recruiting.api.bemmbo.com/invoices/pending')
        .then(response => response.data)
        .then( initialFacturas => {
            setFacturas(initialFacturas)
        })
        .catch(error => {
            console.error(`Couldn't fetch facturas from endpoint. Error: ${error}`);
        })
    },[])

    const recievedFacturas = facturas.filter( factura => factura.type === 'received')

    const creditNote = selected? (
        facturas.filter( factura => selected.id === factura.reference)
    ): []

    const handleSelectFactura = (id) => {
        const newSelected = facturas.find(factura => factura.id === id)
        setSelected(newSelected)
    }

    const handleSelectCredit = (id) => {
        const credit = facturas.find(factura => factura.id === id);
        setSelectedCreditNote(credit);
    };
    
    const handleAssign = () => {
        setIsModalOpen(true);
    };
    


    return (
        <>
            <div>
                <h1>Seleccione una factura</h1>
                <FacturaTable 
                    facturas = {recievedFacturas}
                    handleSelect = {handleSelectFactura} 
                    />
            </div>
            
            <div>
                {selected && creditNote.length > 0 ? 
                    (<>
                        <h1>Seleccione una nota de crédito</h1>
                        <FacturaTable facturas = {creditNote} handleSelect={handleSelectCredit}></FacturaTable>
                        {selectedCreditNote ? <button onClick={handleAssign}>Assign</button> : null}
                    </>)

                : null}
            </div>
            <Modal 
                show={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={() => {
                    console.log(`Credit Note ${selectedCreditNote.id} assigned to Factura ${selected.id}`);
                    setIsModalOpen(false); 
                }} 
            />
        </>
    );
}

export default App