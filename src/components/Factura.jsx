import Table from './Table'

const Factura = ({ facturas, handleSelect, showReference }) => {
    return (
        <div>
            <h1>Seleccione una factura</h1>
            <Table
                facturas={facturas}
                handleSelect={handleSelect}
                showReference={showReference}
            />
        </div>
    )
}

export default Factura