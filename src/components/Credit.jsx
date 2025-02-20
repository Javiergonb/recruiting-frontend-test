import Table from './Table';

const CreditNoteSelector = ({selected, creditNote, handleSelectCredit, selectedCreditNote, handleAssign }) => {
    return (
        <div className='credit-container'>
            {selected ? (
                <>
                    <h1>Seleccione una nota de crédito</h1>
                    {creditNote.length > 0 ? (
                        <>
                            <Table
                                facturas={creditNote}
                                handleSelect={handleSelectCredit}
                                showReference={true}
                            />
                            {selectedCreditNote && (
                                <button onClick={handleAssign}>Assign</button>
                            )}
                        </>
                    ) : (
                        <p className='message'>No hay notas de crédito asociadas a esta factura.</p>
                    )}
                </>
            ) : null}
        </div>
    );
}

export default CreditNoteSelector;
